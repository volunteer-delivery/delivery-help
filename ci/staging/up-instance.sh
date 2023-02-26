#!/usr/bin/env bash

export $(cat .env | xargs) > /dev/null;

instance_status() {
    aws ec2 describe-instances \
        --instance-ids "$INSTANCE_ID" \
        --query "Reservations[0].Instances[0].State.Name" \
        --output text
}

state=$(instance_status);

if [[ "$state" != "stopped" ]]; then
    echo "Instance is not stopped";
    echo "Current state $state"
    exit 1;
fi;

echo "Instance starting";

aws ec2 start-instances --instance-ids "$INSTANCE_ID" > /dev/null;

while [[ "$(instance_status)" != "running" ]]; do
    echo "Instance starting"
    sleep 1;
done

echo "Instance started";

instance_ip=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query "Reservations[0].Instances[0].PublicIpAddress" \
    --output text
);

aws ssm put-parameter --overwrite --name /staging/NGINX_IP --value "$instance_ip" > /dev/null;
aws ssm label-parameter-version --name /staging/NGINX_IP --labels instance-main > /dev/null;

echo "AWS Parameter updated"

last_success_deploy_id=$(aws deploy list-deployments \
    --application-name staging \
    --deployment-group-name instance_main \
    --include-only-statuses succeeded \
    --query 'deployments[0]' \
    --output text
);

deploy_s3_location_format=$(cat << EOF
join(',', [
  join('=', ['bucket', deploymentInfo.revision.s3Location.bucket]),
  join('=', ['bundleType', deploymentInfo.revision.s3Location.bundleType]),
  join('=', ['key',  deploymentInfo.revision.s3Location.key])
])
EOF
);

deploy_s3_location=$(aws deploy get-deployment \
    --deployment-id "$last_success_deploy_id" \
    --query "$deploy_s3_location_format" \
    --output text
);

redeploy_id=$(aws deploy create-deployment \
  --application-name staging \
  --deployment-group-name instance_main \
  --deployment-config-name CodeDeployDefault.OneAtATime \
  --s3-location "$deploy_s3_location" \
  --query 'deploymentId' \
  --output text
);

echo 'Redeploy started';

redeploy_status() {
    aws deploy get-deployment \
        --deployment-id "$redeploy_id" \
        --query 'deploymentInfo.status' \
        --output text
}

while [[ "$(redeploy_status)" != "Succeeded" ]]; do
    echo "Redeploying"
    sleep 1;
done

echo 'Redeploy success';

dns_update_payload=$(cat << EOF
{
    "id": "$CLOUDFLARE_DNS_ID",
    "content": "$instance_ip",
    "name": "$CLOUDFLARE_DNS_NAME.$CLOUDFLARE_ZONE_NAME",
    "proxiable": true,
    "proxied": true,
    "ttl": 1,
    "type": "A",
    "zone_id": "$CLOUDFLARE_ZONE_ID",
    "zone_name": "$CLOUDFLARE_ZONE_NAME"
}
EOF
);

curl -X PUT "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records/$CLOUDFLARE_DNS_ID" \
     -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
     -H "X-Auth-Key: $CLOUDFLARE_AUTH" \
     -H "Content-Type: application/json" \
     -d "$dns_update_payload" \
     --silent \
     >> /dev/null;

echo "DNS updated"

echo "Instance IP $instance_ip";

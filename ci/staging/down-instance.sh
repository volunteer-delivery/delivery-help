#!/usr/bin/env bash

export $(cat .env | xargs) > /dev/null;

instance_status() {
    aws ec2 describe-instances \
        --instance-ids "$INSTANCE_ID" \
        --query "Reservations[0].Instances[0].State.Name" \
        --output text
}

state=$(instance_status);

if [[ "$state" != "running" ]]; then
    echo "Instance is not running";
    echo "Current state $state"
    exit 1;
fi;

echo "Instance stopping";

aws ec2 stop-instances --instance-ids "$INSTANCE_ID" > /dev/null;

while [[ "$(instance_status)" != "stopped" ]]; do
    echo "Instance stopping"
    sleep 1;
done

echo "Instance stopped";

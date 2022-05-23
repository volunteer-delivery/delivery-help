project_repository='git@github.com:TArch64/delivery-help.git';
project_branch='__DEPLOYMENT_BRANCH__';
project_dir="$HOME/projects/delivery-help";
docker_compose_file="$project_dir/deployment/staging/docker-compose-up.yaml";

function exec_docker() {
  docker compose --file "$docker_compose_file"  --project-directory "$project_dir" $1
}

function pull_sources() {
  rm -rf "$project_dir" && git clone --branch "$project_branch" "$project_repository" "$project_dir"
}

function docker_login() {
  echo "$CR_PASSWORD" | docker login ghcr.io -u "$CR_USERNAME" --password-stdin
}

export $(cat "$HOME/projects/.env" | xargs) && \
pull_sources && \
docker_login && \
exec_docker "pull" && \
exec_docker "down --remove-orphans" && \
exec_docker "up --detach"

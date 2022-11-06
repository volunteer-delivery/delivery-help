#!/usr/bin/env bash

install_codedeploy() {
    sudo yum install -y ruby wget && \
    wget https://aws-codedeploy-eu-central-1.s3.eu-central-1.amazonaws.com/latest/install -o $HOME/install && \
    chmod +x $HOME/install && \
    sudo /tmp/install_codedeploy auto && \
    sudo service codedeploy-agent start && \
    sudo service codedeploy-agent status
}

install_docker() {
    DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}

    sudo yum install -y docker && \
    sudo systemctl start docker.service && \
    sudo systemctl enable docker.service && \
    sudo usermod -a -G docker ec2-user && \
    docker -v && \
    mkdir -p $DOCKER_CONFIG/cli-plugins && \
    curl -SL https://github.com/docker/compose/releases/download/v2.7.0/docker-compose-linux-aarch64 -o $DOCKER_CONFIG/cli-plugins/docker-compose && \
    chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose && \
    docker compose version
}

sudo yum update -y && \
install_codedeploy && \
install_docker

#!/usr/bin/env bash

export $(cat .env | xargs) && \
ansible-playbook -i ./hosts ./ansible/playbook.yaml

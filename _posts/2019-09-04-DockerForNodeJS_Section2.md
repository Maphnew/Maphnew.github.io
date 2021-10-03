---
title: "DockerCompose Basics"
date: 2019-09-04 20:11:00
categories: Docker
---
## Why Compose?

CLI and YAML files

Designed around develop workflows

But, It's not really designed for production

docker-compose CLI substitute for docker CLI

Recommend you use Docker Compose CLI by default locally

CLI not designed for production

## Compose File Format

### YAML

Common configuration file format

Used by Docker, Kubernetes, Amazon, and others

: used for key/value pairs

Only spaces, no tabs

' - ' used for lists

### Compose YAML v2 vs v3

Myth busting : v3 does not replace v2

v2 focus : single-node dev

v3 focus : multi-node orchestration

If not using Swarm/Kubernetes, stick to v2

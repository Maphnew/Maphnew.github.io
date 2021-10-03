## Docker install on Ubuntu

### [1] 사전 준비
```bash
$ sudo apt-get update
$ sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo apt-key fingerprint 0EBFCD88
$  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
$ sudo apt-get update
```
### [2] Docker 설치

$ sudo apt-get install docker-ce

- Docker에서 Hello world
```
$ docker container run ubuntu:latest /bin/echo 'Hello World!'
```
permission denied 오류가 뜨면
```
$ sudo chmod 666 /var/run/docker.sock
```

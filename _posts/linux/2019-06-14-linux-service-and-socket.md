---
title: "[Linux] 서비스와 소켓"
date: 2019-06-14 20:37:00

categories:
  - Linux
tags:
  - [Linux, Service, Socket]

toc: true
toc_sticky: true
---

## 4.8 서비스와 소켓

서비스는 평상시에도 늘 가동하는 서버 프로세스며, 소켓은 필요할 때만 작동하는 서버 프로세스를 말한다. 서비스와 소켓은 'systemd'라고 부르는
서비스 매니저 프로그램으로 작동시키거나 관리한다.

### 4.8.1 서비스

- 시스템과 독자적으로 구동되어 제공하는 프로세스를 말한다. 예를 들어 웹 서버(httpd), DB 서버(mysqld), FTP 서버(vsftpd)등이 있다.

- 실행 및 종료는 대개 'systemctl start/stop/restart 서비스 이름'으로 사용된다. 예를 들어 웹 서버는 'systemctl start httpd'로 구동한다.

- 서비스의 실행 스크립트 파일은 /usr/lib/systemd/system/ 디렉터리에 '서비스이름.service'라는 이름으로 확인할 수 있다.
  예를 들어 웹 서비스는 httpd.service라는 이름의 파일로 존재한다.

- 부팅과 동시에 서비스의 자동 실행 여부를 지정할 수 있는데, 터미널에서 'systemctl list-unit-files'을 실행하면 현재 사용enabled과
  사용 안 함disabled을 확인 할 수 있다. 또 X 윈도 환경에서는 'system-config-service'명령어로 설정할 수 있다.

> 상태(state)가 'static'으로 설정된 것은 사용/사용 안 함으로 설정할 수 없으며, 다른 서비스나 소켓에 의존해서 실행된다.

### 4.8.2 소켓

- 소켓은 외부에서 특정 서비스를 요청할 경우에 systemd가 구동 시킨다. 그리고 요청이 끝나면 소켓도 종료된다.

- 그래서 소켓으로 설정된 서비스를 요청할 때는 처음 연결되는 시간이 앞에서 설명한 서비스에 비교했을 때 약간 더 걸릴 수 있다.
  왜냐하면 systemd가 서비스를 새로 구동하는 데 시간이 소요되기 때문이다.

- 소켓과 관련된 스크립트 파일은 /usr/lib/systemd/system/ 디렉터리에 '소켓이름.socket'이라는 이름으로 존재한다.

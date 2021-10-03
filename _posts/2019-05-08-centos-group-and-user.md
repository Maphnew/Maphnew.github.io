### 그룹 생성과 사용자 관리 - centos7

- centosGroup 그룹을 만든다.
```bash
[root@localhost ~]# groupadd centosGroup
[root@localhost ~]# tail -5 /etc/group
stapdev:x:158:
tcpdump:x:72:
oprofile:x:16:
centos:x:1000:centos
centosGroup:x:1001:
```
- 새로운 사용자를 만들면서 그룹을 지정한다.
```bash
[root@localhost ~]# useradd -g centosGroup user1
[root@localhost ~]# useradd -g centosGroup user2
[root@localhost ~]# tail -5 /etc/passwd
tcpdump:x:72:72::/:/sbin/nologin
oprofile:x:16:16:Special user account to be used by OProfile:/var/lib/oprofile:/sbin/nologin
centos:x:1000:1000:centos:/home/centos:/bin/bash
user1:x:1001:1001::/home/user1:/bin/bash
user2:x:1002:1001::/home/user2:/bin/bash

[root@localhost ~]# tail -5 /etc/group
stapdev:x:158:
tcpdump:x:72:
oprofile:x:16:
centos:x:1000:centos
centosGroup:x:1001:

[root@localhost ~]# tail -5 /etc/shadow
tcpdump:!!:18017::::::
oprofile:!!:18017::::::
centos:$6$/pgVDtVwA.HqDcQE$8RXKVVoFoJeEXd5yoIs0flDQrsQHjHPwGwV8CE35RscKnA/m6/WCTC0qpGQNt42bEgmTjS9YqxEFfMi0nI1F01::0:99999:7:::
user1:!!:18024:0:99999:7:::
user2:!!:18024:0:99999:7:::

```
/etc/passwd에서 그룹 ID가 모두 1001로 되어있다.
/etc/group에 1001이 centosGroup으로 확인된다.
/etc/shadow 제일 아래에 user1, user2가 추가됐음을 알 수 있다. 하지만 암호 부분에 !!라는 표시만 되어있다. 아직 암호가 지정되어 있지 않다는 의미다.

- 암호를 지정한다.
```bash
[root@localhost ~]# passwd user1
user1 사용자의 비밀 번호 변경 중
새  암호:
잘못된 암호: 암호는 8 개의 문자 보다 짧습니다
새  암호 재입력:
passwd: 모든 인증 토큰이 성공적으로 업데이트 되었습니다.
[root@localhost ~]# passwd user2
user2 사용자의 비밀 번호 변경 중
새  암호:
잘못된 암호: 암호는 8 개의 문자 보다 짧습니다
새  암호 재입력:
passwd: 모든 인증 토큰이 성공적으로 업데이트 되었습니다.

[root@localhost ~]# tail -5 /etc/shadow
tcpdump:!!:18017::::::
oprofile:!!:18017::::::
centos:$6$/pgVDtVwA.HqDcQE$8RXKVVoFoJeEXd5yoIs0flDQrsQHjHPwGwV8CE35RscKnA/m6/WCTC0qpGQNt42bEgmTjS9YqxEFfMi0nI1F01::0:99999:7:::
user1:$6$fFqTUAiH$ZbXyZxfHs2971P6fzty.4mkDxNhA4B5tAp6xCLkNKFLWOgIPGYVOwFrur8EutSjE3JM5jQa64OdQQn8qyX0O8/:18024:0:99999:7:::
user2:$6$dHEMwpLl$U8/ttrUy.i/xsiCZCdvVMk0ovXlQYtMvOzjVVcCKRmX0hrmp0nlJ/fTkJZe5YH/PAGFIQxeTI5pqW98Pksl0g/:18024:0:99999:7:::
```
암호가 지정된 것을 알 수 있다. 같은 암호를 입력했지만 코드화된 암호라 서로 다르다.

- 사용자의 홈 디렉터리인 /home/user1 과 /etc/skel 디렉터리를 비교해보자
새로운 사용자를 생성하면 해당 사용자의 홈디렉터리 기본 설정은 /etc/skel 디렉터리의 모든내용으로부터 복사된다.
그러므로 앞으로 생성하는 사용자에게 특정한 파일 등을 배포하고 싶다면 /etc/skel 디렉터리에 넣어두면 된다.
```bash
[root@localhost ~]# ls -a /home/user1
.  ..  .bash_logout  .bash_profile  .bashrc  .mozilla
[root@localhost ~]# ls -a /etc/skel
.  ..  .bash_logout  .bash_profile  .bashrc  .mozilla
```
- X윈도 환경에서 사용자 관리를 편하게 도와주는 'system-config-users'명령어도 있다. 터미널에서 입력한다.
yum -y install system-config-users 로 프로그램 설치가 필요하다.
```bash
[root@localhost ~]# yum -y install system-config-users
[root@localhost ~]# system-config-users
```


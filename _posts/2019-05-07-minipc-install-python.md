2. Python3 설치

```
# yum update -y
# yum groupinstall "Development Tools"
```
- http://snowdeer.github.io/python/2018/02/20/install-python3-on-centos/ 참고 (아래 내용)

- Repository를 yum에 추가
```
# yum install -y https://centos7.iuscommunity.org/ius-release.rpm
```
```
Loaded plugins: fastestmirror
ius-release.rpm                                                                                  | 8.1 kB  00:00:00
Examining /var/tmp/yum-root-PXjl9y/ius-release.rpm: ius-release-1.0-15.ius.centos7.noarch
Marking /var/tmp/yum-root-PXjl9y/ius-release.rpm to be installed
Resolving Dependencies
--> Running transaction check
---> Package ius-release.noarch 0:1.0-15.ius.centos7 will be installed
--> Processing Dependency: epel-release = 7 for package: ius-release-1.0-15.ius.centos7.noarch
Loading mirror speeds from cached hostfile
 * base: ftp.kaist.ac.kr
 * extras: ftp.jaist.ac.jp
 * updates: ftp.jaist.ac.jp
timescale_timescaledb/x86_64/signature                                                           |  833 B  00:00:00
timescale_timescaledb/x86_64/signature                                                           | 1.0 kB  00:00:00 !!!
--> Running transaction check
---> Package epel-release.noarch 0:7-11 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

========================================================================================================================
 Package                     Arch                  Version                            Repository                   Size
========================================================================================================================
Installing:
 ius-release                 noarch                1.0-15.ius.centos7                 /ius-release                8.5 k
Installing for dependencies:
 epel-release                noarch                7-11                               extras                       15 k

Transaction Summary
========================================================================================================================
Install  1 Package (+1 Dependent package)

Total size: 23 k
Total download size: 15 k
Installed size: 33 k
Downloading packages:
epel-release-7-11.noarch.rpm                                                                     |  15 kB  00:00:05
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : epel-release-7-11.noarch                                                                             1/2
  Installing : ius-release-1.0-15.ius.centos7.noarch                                                                2/2
  Verifying  : ius-release-1.0-15.ius.centos7.noarch                                                                1/2
  Verifying  : epel-release-7-11.noarch                                                                             2/2

Installed:
  ius-release.noarch 0:1.0-15.ius.centos7

Dependency Installed:
  epel-release.noarch 0:7-11

Complete!
```
- yum search로 python 3.x 버전 확인
아래 명령어를 수행하면 python3으로 시작하는 라이브러리들을 확인할 수 있습니다.
```
# yum search python3
```
```
...
python36u-psycopg2.x86_64 : A PostgreSQL database adapter for Python
python36u-redis.noarch : Python interface to the Redis key-value store
python36u-setproctitle.x86_64 : Python module to customize a process title
python36u-setuptools.noarch : Easily build and distribute Python packages
python36u-tkinter.x86_64 : A GUI toolkit for Python
python36u-tools.x86_64 : A collection of tools included with Python including 2to3 and idle
shiboken-python36-devel.x86_64 : Development files for shiboken
shiboken-python36-libs.x86_64 : CPython bindings generator for C++ libraries - shared library
uwsgi-plugin-python34.x86_64 : uWSGI - Plugin for Python 3.4 support
uwsgi-plugin-python34-gevent.x86_64 : uWSGI - Plugin for Python 3.4 GEvent support
uwsgi-plugin-python34u.x86_64 : uWSGI - Plugin for Python support
uwsgi-plugin-python35u.x86_64 : uWSGI - Plugin for Python support
uwsgi-plugin-python36.x86_64 : uWSGI - Plugin for Python 3.6 support
uwsgi-plugin-python36-gevent.x86_64 : uWSGI - Plugin for Python 3.6 GEvent support
uwsgi-plugin-python36-tornado.x86_64 : uWSGI - Plugin for Tornado (Python 3.6) support
uwsgi-plugin-python36u.x86_64 : uWSGI - Plugin for Python support
znc-modpython.x86_64 : Python3 module for ZNC

  Name and summary matches only, use "search all" for everything.

```

- 필요 라이브러리들 설치
```
# yum install -y python36u python36u-libs python36u-devel python36u-pip
```
```
...
Installed:
  python36u.x86_64 0:3.6.7-1.ius.centos7                     python36u-devel.x86_64 0:3.6.7-1.ius.centos7
  python36u-libs.x86_64 0:3.6.7-1.ius.centos7                python36u-pip.noarch 0:9.0.1-1.ius.centos7

Dependency Installed:
  python36u-setuptools.noarch 0:39.0.1-1.ius.centos7

Complete!
```

- Python 설치 및 버전 확인
```
# python3.6 -V
```
```
Python 3.6.7
```

- Alias 수정 금지 - yum 사용에 에러가 뜸



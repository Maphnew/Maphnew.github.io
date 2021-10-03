### postgre 설치

#### 출처: https://orashelter.tistory.com/56 [둥지]

1. 설치 가능한 postgresql의 버전을 확인합니다.
```
# yum list | grep ^postgresql
```
```
postgresql.i686                             9.2.24-1.el7_5             base
postgresql.x86_64                           9.2.24-1.el7_5             base
postgresql-contrib.x86_64                   9.2.24-1.el7_5             base
postgresql-devel.i686                       9.2.24-1.el7_5             base
postgresql-devel.x86_64                     9.2.24-1.el7_5             base
postgresql-docs.x86_64                      9.2.24-1.el7_5             base
postgresql-jdbc.noarch                      9.2.1002-6.el7_5           base
postgresql-jdbc-javadoc.noarch              9.2.1002-6.el7_5           base
postgresql-libs.i686                        9.2.24-1.el7_5             base
postgresql-libs.x86_64                      9.2.24-1.el7_5             base
postgresql-odbc.x86_64                      09.03.0100-2.el7           base
postgresql-plperl.x86_64                    9.2.24-1.el7_5             base
postgresql-plpython.x86_64                  9.2.24-1.el7_5             base
postgresql-pltcl.x86_64                     9.2.24-1.el7_5             base
postgresql-server.x86_64                    9.2.24-1.el7_5             base
postgresql-static.i686                      9.2.24-1.el7_5             base
postgresql-static.x86_64                    9.2.24-1.el7_5             base
postgresql-test.x86_64                      9.2.24-1.el7_5             base
postgresql-upgrade.x86_64                   9.2.24-1.el7_5             base
```
2. 저장소를 업데이트 합니다. ( postgresql 11 버전 설치 할것 )
```
# yum install -y https://download.postgresql.org/pub/repos/yum/11/redhat/rhel-7-x86_64/pgdg-centos11-11-2.noarch.rpm

```
```
Loaded plugins: fastestmirror
pgdg-centos11-11-2.noarch.rpm                                                                    | 5.6 kB  00:00:00
Examining /var/tmp/yum-root-PXjl9y/pgdg-centos11-11-2.noarch.rpm: pgdg-redhat-repo-42.0-4.noarch
Marking /var/tmp/yum-root-PXjl9y/pgdg-centos11-11-2.noarch.rpm to be installed
Resolving Dependencies
--> Running transaction check
---> Package pgdg-redhat-repo.noarch 0:42.0-4 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

======================================================================================================================== Package                       Arch                Version                Repository                               Size
========================================================================================================================Installing:
 pgdg-redhat-repo              noarch              42.0-4                 /pgdg-centos11-11-2.noarch              6.8 k

Transaction Summary
========================================================================================================================Install  1 Package

Total size: 6.8 k
Installed size: 6.8 k
Downloading packages:
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : pgdg-redhat-repo-42.0-4.noarch                                                                       1/1
  Verifying  : pgdg-redhat-repo-42.0-4.noarch                                                                       1/1

Installed:
  pgdg-redhat-repo.noarch 0:42.0-4

Complete!
```

3. postgresql 설치 합니다.
```
# yum install -y postgresql11-server postgresql11
```
```
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: ftp.kaist.ac.kr
 * extras: ftp.jaist.ac.jp
 * updates: ftp.iij.ad.jp
base                                                                                             | 3.6 kB  00:00:00
http://ftp.jaist.ac.jp/pub/Linux/CentOS/7.6.1810/extras/x86_64/repodata/repomd.xml: [Errno 14] curl#6 - "Could not resolve host: ftp.jaist.ac.jp; 알 수 없는 오류"
Trying other mirror.
extras                                                                                           | 3.4 kB  00:00:00
https://download.postgresql.org/pub/repos/yum/10/redhat/rhel-7-x86_64/repodata/repomd.xml: [Errno 14] curl#6 - "Could not resolve host: download.postgresql.org; 알 수 없는 오류"
Trying other mirror.


 One of the configured repositories failed (PostgreSQL 10 7 - x86_64),
 and yum doesn't have enough cached data to continue. At this point the only
 safe thing yum can do is fail. There are a few ways to work "fix" this:

     1. Contact the upstream for the repository and get them to fix the problem.

     2. Reconfigure the baseurl/etc. for the repository, to point to a working
        upstream. This is most often useful if you are using a newer
        distribution release than is supported by the repository (and the
        packages for the previous distribution release still work).

     3. Run the command with the repository temporarily disabled
            yum --disablerepo=pgdg10 ...

     4. Disable the repository permanently, so yum won't use it by default. Yum
        will then just ignore the repository until you permanently enable it
        again or use --enablerepo for temporary usage:

            yum-config-manager --disable pgdg10
        or
            subscription-manager repos --disable=pgdg10

     5. Configure the failing repository to be skipped, if it is unavailable.
        Note that yum will try to contact the repo. when it runs most commands,
        so will have to try and fail each time (and thus. yum will be be much
        slower). If it is a very temporary problem though, this is often a nice
        compromise:

            yum-config-manager --save --setopt=pgdg10.skip_if_unavailable=true

failure: repodata/repomd.xml from pgdg10: [Errno 256] No more mirrors to try.
https://download.postgresql.org/pub/repos/yum/10/redhat/rhel-7-x86_64/repodata/repomd.xml: [Errno 14] curl#6 - "Could not resolve host: download.postgresql.org; 알 수 없는 오류"
```
- /etc/sysconfig/network-scripts/ifcfg-enp3s0 의 network 정보 수정(staic ip, DNS, NETMASK ..) 
```
# yum update

# yum install -y postgresql11-server postgresql11
```


4. 패키지가 제대로 설치되었는지 확인합니다.
```
# rpm -qa|grep postgresql
```
```
postgresql11-libs-11.2-2PGDG.rhel7.x86_64
postgresql11-server-11.2-2PGDG.rhel7.x86_64
postgresql11-11.2-2PGDG.rhel7.x86_64
```

5. postgres 계정이 있는지 확인합니다.
```
cat /etc/passwd | grep postgres
```
```
postgres:x:26:26:PostgreSQL Server:/var/lib/pgsql:/bin/bash
```

6. postgresql 초기화 합니다.
```
/usr/pgsql-11/bin/postgresql-11-setup initdb
```
```
Initializing database ...
OK
```

7. 서비스 활성화 및 재시작 합니다.
```
# systemctl enable postgresql-11

# systemctl start postgresql-11
```


8. postgresql 패스워드를 변경합니다.
```
# sudo passwd postgres
```
```
postgres 사용자의 비밀 번호 변경 중
새  암호:
잘못된 암호: 암호는 8 개의 문자 보다 짧습니다
새  암호 재입력:
passwd: 모든 인증 토큰이 성공적으로 업데이트 되었습니다.
```

9. postgresql 접속 및 설치된 버전 확인 합니다.
```
# su - postgres
```
```
-bash-4.2$
```
```
# psql
```
```
psql (11.2)
도움말을 보려면 "help"를 입력하십시오.

postgres=#
```
```
# select version();
```
```
                                                 version
---------------------------------------------------------------------------------------------------------
 PostgreSQL 11.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-36), 64-bit
(1개 행)
```

10. postgresql 설정 변경 합니다.
```
# vi /var/lib/pgsql/11/data/postgresql.conf
```

```
#listen_addresses = 'localhost'  ->  listen_addresses = '*'

#password_encryption = md5  ->  password_encryption = md5
```


11. Centos7용 PGDG를 다운로드 합니다.
```
# yum install -y https://download.postgresql.org/pub/repos/yum/11/redhat/rhel-7-x86_64/pgdg-centos11-11-2.noarch.rpm
```

```
Loaded plugins: fastestmirror
pgdg-centos11-11-2.noarch.rpm                                                                    | 5.6 kB  00:00:00
Examining /var/tmp/yum-root-PXjl9y/pgdg-centos11-11-2.noarch.rpm: pgdg-redhat-repo-42.0-4.noarch
/var/tmp/yum-root-PXjl9y/pgdg-centos11-11-2.noarch.rpm: does not update installed package.
Error: Nothing to do
```
12. timescaledb를 다운로드 합니다.

```

# sudo cat > /etc/yum.repos.d/timescale_timescaledb.repo <<EOL

[timescale_timescaledb]

name=timescale_timescaledb

baseurl=https://packagecloud.io/timescale/timescaledb/el/7/\$basearch

repo_gpgcheck=1

gpgcheck=0

enabled=1

gpgkey=https://packagecloud.io/timescale/timescaledb/gpgkey

sslverify=1

sslcacert=/etc/pki/tls/certs/ca-bundle.crt

metadata_expire=300

EOL
```
```
# sudo yum update -y
```
```
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: ftp.kaist.ac.kr
 * extras: ftp.jaist.ac.jp
 * updates: ftp.jaist.ac.jp
timescale_timescaledb/x86_64/signature                                                           |  833 B  00:00:00
Retrieving key from https://packagecloud.io/timescale/timescaledb/gpgkey
Importing GPG key 0x47F24417:
 Userid     : "https://packagecloud.io/timescale/timescaledb (https://packagecloud.io/docs#gpg_signing) <support@packagecloud.io>"
 Fingerprint: 1005 fb68 604c e9b8 f687 9cf7 59f1 8edf 47f2 4417
 From       : https://packagecloud.io/timescale/timescaledb/gpgkey
timescale_timescaledb/x86_64/signature                                                           | 1.0 kB  00:00:01 !!!
timescale_timescaledb/x86_64/primary                                                             | 4.2 kB  00:00:12
timescale_timescaledb                                                                                             32/32
No packages marked for update
```

```
#yum install -y timescaledb-postgresql-11
```
```
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: ftp.kaist.ac.kr
 * extras: ftp.jaist.ac.jp
 * updates: ftp.jaist.ac.jp
Resolving Dependencies
--> Running transaction check
---> Package timescaledb-postgresql-11.x86_64 0:1.3.0-0.el7 will be installed
--> Processing Dependency: timescaledb-tools >= 0.3 for package: timescaledb-postgresql-11-1.3.0-0.el7.x86_64
--> Processing Dependency: postgresql11-devel for package: timescaledb-postgresql-11-1.3.0-0.el7.x86_64
--> Running transaction check
---> Package postgresql11-devel.x86_64 0:11.2-2PGDG.rhel7 will be installed
--> Processing Dependency: libicu-devel for package: postgresql11-devel-11.2-2PGDG.rhel7.x86_64
---> Package timescaledb-tools.x86_64 0:0.6.0-0.el7 will be installed
--> Running transaction check
---> Package libicu-devel.x86_64 0:50.1.2-17.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

========================================================================================================================
 Package                             Arch             Version                     Repository                       Size
========================================================================================================================
Installing:
 timescaledb-postgresql-11           x86_64           1.3.0-0.el7                 timescale_timescaledb           214 k
Installing for dependencies:
 libicu-devel                        x86_64           50.1.2-17.el7               base                            702 k
 postgresql11-devel                  x86_64           11.2-2PGDG.rhel7            pgdg11                          2.0 M
 timescaledb-tools                   x86_64           0.6.0-0.el7                 timescale_timescaledb           2.4 M

Transaction Summary
========================================================================================================================
Install  1 Package (+3 Dependent packages)

Total download size: 5.3 M
Installed size: 24 M
Downloading packages:
(1/4): libicu-devel-50.1.2-17.el7.x86_64.rpm                                                     | 702 kB  00:00:06
(2/4): postgresql11-devel-11.2-2PGDG.rhel7.x86_64.rpm                                            | 2.0 MB  00:00:10
(3/4): timescaledb-tools-0.6.0-0.el7.x86_64.rpm                                                  | 2.4 MB  00:00:12
(4/4): timescaledb-postgresql-11-1.3.0-0.el7.x86_64.rpm                                          | 214 kB  00:00:13
------------------------------------------------------------------------------------------------------------------------
Total                                                                                   399 kB/s | 5.3 MB  00:00:13
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : libicu-devel-50.1.2-17.el7.x86_64                                                                    1/4
  Installing : postgresql11-devel-11.2-2PGDG.rhel7.x86_64                                                           2/4
  Installing : timescaledb-tools-0.6.0-0.el7.x86_64                                                                 3/4
  Installing : timescaledb-postgresql-11-1.3.0-0.el7.x86_64                                                         4/4
Using pg_config located at /usr/pgsql-11/bin/pg_config to finish installation...

TimescaleDB has been installed. You need to update your postgresql.conf file
to load the library by adding 'timescaledb' to your shared_preload_libraries.
The easiest way to do this (and more configuration) is to use timescaledb-tune:

timescaledb-tune --pg-config=/usr/pgsql-11/bin/pg_config

  Verifying  : timescaledb-postgresql-11-1.3.0-0.el7.x86_64                                                         1/4
  Verifying  : timescaledb-tools-0.6.0-0.el7.x86_64                                                                 2/4
  Verifying  : libicu-devel-50.1.2-17.el7.x86_64                                                                    3/4
  Verifying  : postgresql11-devel-11.2-2PGDG.rhel7.x86_64                                                           4/4

Installed:
  timescaledb-postgresql-11.x86_64 0:1.3.0-0.el7

Dependency Installed:
  libicu-devel.x86_64 0:50.1.2-17.el7                     postgresql11-devel.x86_64 0:11.2-2PGDG.rhel7
  timescaledb-tools.x86_64 0:0.6.0-0.el7

Complete!
```

13. 데이터베이스를 설정합니다. ( timescaledb-tune으로 손쉽게 설정 가능, 모두 yes )
```
# timescaledb-tune
or
# timescaledb-tune --pg-config=/usr/pgsql-11/bin/pg_config
```
```
Using postgresql.conf at this path:
/var/lib/pgsql/11/data/postgresql.conf

Is this correct? [(y)es/(n)o]: y
Writing backup to:
/tmp/timescaledb_tune.backup201905071351

shared_preload_libraries needs to be updated
Current:
#shared_preload_libraries = ''
Recommended:
shared_preload_libraries = 'timescaledb'
Is this okay? [(y)es/(n)o]: y
success: shared_preload_libraries will be updated

Tune memory/parallelism/WAL and other settings? [(y)es/(n)o]: yy^H
Tune memory/parallelism/WAL and other settings? [(y)es/(n)o]: y
Recommendations based on 3.63 GB of available memory and 2 CPUs for PostgreSQL 11

Memory settings recommendations
Current:
shared_buffers = 128MB
#effective_cache_size = 4GB
#maintenance_work_mem = 64MB
#work_mem = 4MB
Recommended:
shared_buffers = 950577kB
effective_cache_size = 2784MB
maintenance_work_mem = 475288kB
work_mem = 4752kB
Is this okay? [(y)es/(s)kip/(q)uit]: y
success: memory settings will be updated

Parallelism settings recommendations
Current:
missing: timescaledb.max_background_workers
#max_worker_processes = 8
#max_parallel_workers_per_gather = 2
#max_parallel_workers = 8
Recommended:
timescaledb.max_background_workers = 8
max_worker_processes = 13
max_parallel_workers_per_gather = 1
max_parallel_workers = 2
Is this okay? [(y)es/(s)kip/(q)uit]: y
success: parallelism settings will be updated

WAL settings recommendations
Current:
#wal_buffers = -1
min_wal_size = 80MB
max_wal_size = 1GB
Recommended:
wal_buffers = 16MB
min_wal_size = 4GB
max_wal_size = 8GB
Is this okay? [(y)es/(s)kip/(q)uit]: y
success: WAL settings will be updated

Miscellaneous settings recommendations
Current:
#default_statistics_target = 100
#random_page_cost = 4.0
#checkpoint_completion_target = 0.5
#max_locks_per_transaction = 64
#effective_io_concurrency = 1
Recommended:
default_statistics_target = 500
random_page_cost = 1.1
checkpoint_completion_target = 0.9
max_locks_per_transaction = 64
effective_io_concurrency = 200
Is this okay? [(y)es/(s)kip/(q)uit]: y
success: miscellaneous settings will be updated
Saving changes to: /var/lib/pgsql/11/data/postgresql.conf
```

14. 만약 위의 timescaledb-tune이 아래와 같은 에러 발생시 직접 설정해야 합니다. ( 해결법을 찾지 못했음.. ) -> 13번의 두번째 명령어로 
```
exit: could not execute `pg_config --version`: exec: "pg_config": executable file not found in $PATH
```


아래와 같이 치면 postgresql.conf의 위치를 찾을 수 있음. 
```
find / -name postgresql.conf
```


아래의 모습은 timescaledb-tune으로 설정시 나오는 화면인데 직접 찾아서 하나하나 수정하면 됨. ( 수정 전 미리 기존 설정 파일을 복사 두는것을 추천 )
```
Using postgresql.conf at this path:

/usr/local/var/postgres/postgresql.conf



Is this correct? [(y)es/(n)o]: y

Writing backup to:

/var/folders/cr/zpgdkv194vz1g5smxl_5tggm0000gn/T/timescaledb_tune.backup201901071520



shared_preload_libraries needs to be updated

Current:

#shared_preload_libraries = 'timescaledb'

Recommended:

shared_preload_libraries = 'timescaledb'

Is this okay? [(y)es/(n)o]: y

success: shared_preload_libraries will be updated



Tune memory/parallelism/WAL and other settings? [(y)es/(n)o]: y

Recommendations based on 8.00 GB of available memory and 4 CPUs for PostgreSQL 11



Memory settings recommendations

Current:

shared_buffers = 128MB

#effective_cache_size = 4GB

#maintenance_work_mem = 64MB

#work_mem = 4MB

Recommended:

shared_buffers = 2GB

effective_cache_size = 6GB

maintenance_work_mem = 1GB

work_mem = 26214kB

Is this okay? [(y)es/(s)kip/(q)uit]:
```

15. 외부에서도 접속 가능하게 셋팅합니다. ( postgresql.conf 수정 )
```
#listen_addresses = 'localhost'  ->  listen_addresses = '*'
```

16. 마찬가지로 외부에서 접속 가능하도록 셋팅합니다. ( pg_hba.conf 수정 )
```
# find / -name pg_hba.conf로 위치를 찾아서 수정합니다.

host all all 0.0.0.0/0 trust
```


16. postgresql을 재시작합니다.
```
systemctl restart postgresql-11
```

17. postgresql 외부 접속.

postgresql이 외부에서 접속이 가능한지를 확인하기 위해서는 pgadmin4와 같은 툴을 이용해서 접속하여 테스트 해볼 수 있습니다.

만약 접속이 안될경우 방화벽을 해제 해보시길 바랍니다.




참고

http://pseg.or.kr/pseg/infoinstall/7917

https://docs.timescale.com/v1.2/getting-started/installation/rhel-centos/installation-yum



출처: https://orashelter.tistory.com/56 [둥지]

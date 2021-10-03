---
title: "MariaDB Setting"
date: 2019-02-16 09:01:30
categories: database
---

### 성능향상을 위한 Setting

+ MSSQL과는 달리 MariaDB는 오픈소스라 스스로 최적화를 시키지 못해 개발자가 설정을 해줘야한다. 회사에서 쓰던 MSSQL을 대신해 MariaDB를 테스트하면서
그 설정에 대한 내용을 적어본다.

1. 설정파일 my.conf
/etc/my.cnf 에 다음과 같이 추가한다.

```
[mysqld]
innodb_buffer_pool_size=8589934592
innodb_flush_log_at_trx_commit=2

```

- innodb_flush_log_at_trx_commit의 기본옵션 1은 log를 생성하여 db의 속도를 잡아먹는 원인이다. 2로 수정하여 log를 생략할 수 있다.
- innodb_buffer_pool_size는 버퍼 풀 크기를 설정하여 사용할 메모리 버퍼를 설정한다.
- 이외에 여러가지 설정값들이 있었으나 기억나지 않아 일단 여기까지 작성하겠다.


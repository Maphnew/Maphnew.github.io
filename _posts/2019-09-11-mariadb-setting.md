# Mariadb Setting

https://mariadb.com/kb/en/library/innodb-system-variables/#innodb_log_file_size

[mysqld]
port=16033
innodb_buffer_pool_size=8058993459
innodb_log_file_size = 1104857600
innodb_log_buffer_size = 8388608
innodb_thread_concurrency = 16
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT
innodb_write_io_threads = 4
innodb_read_io_threads = 4
transaction_isolation = READ-COMMITTED
general_log=1
general_log_file=Cloud.log
skip-name-resolve
max_allowed_packet=512M

1. innodb_buffer_pool_size
설명 : InnoDB 버퍼 풀 크기 (바이트)입니다. 전체 / 주로 XtraDB / InnoDB 테이블이있는 데이터베이스 서버에서 조정하는 기본 값은 이러한 환경에서 총 메모리의 80 %까지 설정할 수 있습니다. 2GB 이상으로 설정하면 innodb_buffer_pool_instances도 조정해야합니다. 이 변수 설정 및 동적으로 Innodb 버퍼 풀 크기 설정에 대한 자세한 내용은 XtraDB / InnoDB 버퍼 풀을 참조하십시오.
Commandline: --innodb-buffer-pool-size=#
Scope: Global
Dynamic: Yes (>= MariaDB 10.2.2), No (<= MariaDB 10.2.1)
Data Type: numeric
Default Value: 134217728 (128MB)
Range: 5242880 (5MB) to 9223372036854775807 (8192PB)

2. innodb_buffer_pool_instances
설명 : innodb_buffer_pool_size가 1GB 이상으로 설정된 경우 innodb_buffer_pool_instances는 InnoDB 버퍼 풀을이 여러 인스턴스로 나눕니다. MariaDB 5.5에서는 기본값이 1이지만 버퍼 풀이 기가 바이트 인 대규모 시스템의 경우 많은 인스턴스가 경합 동시성을 줄이는 데 도움이됩니다. 기본값은 MariaDB 10에서 8입니다 (Windows 32 비트는 innodb_buffer_pool_size에 따라 다르거 나 MariaDB 10.2.2에서는 innodb_buffer_pool_size <1GB 인 경우 1로 설정 됨). 각 인스턴스는 자체 데이터 구조를 관리하고 총 버퍼 풀 크기의 동일한 부분을 차지하므로 예를 들어 innodb_buffer_pool_size가 4GB이고 innodb_buffer_pool_instances가 4로 설정되면 각 인스턴스는 1GB가됩니다. 각 인스턴스의 크기는 1GB 이상이어야합니다.
Commandline: --innodb-buffer-pool-instances=#
Scope: Global
Dynamic: No
Data Type: numeric
Default Value: <= MariaDB 10.0.3: 1
Default Value: >= MariaDB 10.0.4: 8, 1 (>= MariaDB 10.2.2 if innodb_buffer_pool_size < 1GB), or dependent on innodb_buffer_pool_size (Windows 32-bit)
Introduced: MariaDB 5.5.20

3. innodb_log_file_size
설명 : 로그 그룹에있는 각 InnoDB 리두 로그 파일의 크기 (바이트)입니다. 결합 된 크기는 MariaDB 10.0 이전에는 4GB를 초과 할 수 없으며 MariaDB 10.0 이상에서는 512GB를 초과 할 수 없습니다. 값이 클수록 플러시 검사 점 활동으로 인한 디스크 I / O가 줄어들지 만 충돌로 인한 복구 속도가 느려집니다.
Commandline: --innodb-log-file-size=#
Scope: Global
Dynamic: No
Data Type: numeric
Default Value: 50331648 (48MB) (from MariaDB 10.0), 5242880 (5MB) (before MariaDB 10.0)
Range: 1048576 to 512GB (1MB to 512GB) (>= MariaDB 10.0), 1048576 to 4294967295 (1MB to 4096MB) (<= MariaDB 5.5),

4. innodb_log_buffer_size
설명 : InnoDB 리두 로그 파일을 디스크에 기록하기위한 버퍼 크기 (바이트)입니다. 이를 늘리면 커밋하기 전에 디스크 I / O를 수행 할 필요없이 더 큰 트랜잭션을 실행할 수 있습니다.
Commandline: --innodb-log-buffer-size=#
Scope: Global
Dynamic: No
Data Type: numeric
Default Value: 16777216 (16MB) >= MariaDB 10.1.9, 8388608 (8MB) <= MariaDB 10.1.8
Range: 262144 to 4294967295 (256KB to 4096MB)

5. innodb_thread_concurrency
설명 :이 스레드 수에 도달하면 (잠금 대기중인 스레드 제외) XtraDB / InnoDB는 실행중인 스레드 수를 제한하기 위해 새 스레드를 실행을위한 선입 선출 큐에 대기 상태로 둡니다. 동시에. 기본값 인 0을 설정하면 필요한만큼 많은 스레드가 허용됩니다. 권장 설정은 CPU 수에 2를 더한 디스크 수입니다.
Commandline: --innodb-thread-concurrency=#
Scope: Global
Dynamic: Yes
Data Type: numeric
Default Value: 0
Range: 0 to 1000

6. innodb_flush_log_at_trx_commit
설명 : 가장 높은 수준의 내결함성을 위해 sync_binlog = 1과 함께 1로 설정하십시오. innodb_use_global_flush_log_at_trx_commit의 값은이 변수를 SET 문으로 재설정 할 수 있는지 여부를 결정합니다.
1 기본적으로 로그 버퍼는 InnoDB 리두 로그 파일에 기록되고 각 트랜잭션 후에 디스크로 플러시됩니다. 이것은 완전한 ACID 준수를 위해 필요합니다.
0 커밋시 수행되는 작업이 없습니다. 오히려 로그 버퍼는 1 초에 한 번씩 InnoDB 리두 로그에 기록되고 플러시됩니다. 이를 통해 성능은 향상되지만 서버 충돌로 인해 마지막 트랜잭션이 지워질 수 있습니다.
2 각 커밋 후에 로그 버퍼가 InnoDB 리두 로그에 기록되지만 플러싱은 1 초에 한 번 발생합니다. 성능은 약간 나아지지만 OS 또는 정전으로 인해 마지막 초의 트랜잭션이 손실 될 수 있습니다.
3 (MariaDB 10.0에서) MariaDB 5.5 그룹 커밋 (그룹 커밋 당 3 개의 동기화)을 에뮬레이트합니다. Binlog 그룹 커밋 및 innodb_flush_log_at_trx_commit을 참조하십시오.
Commandline: --innodb-flush-log-at-trx-commit[=#]
Scope: Global
Dynamic: Yes
Data Type: enumeration
Default Value: 1
Valid Values: 0, 1, 2 or 3 (from MariaDB 10.0)

7. innodb_flush_method
설명 : XtraDB / InnoDB 플러싱 방법. Windows는 항상 async_unbuffered를 사용하므로이 변수는 적용되지 않습니다. 유닉스에서는 기본적으로 fsync ()가 데이터와 로그를 플러시하는 데 사용됩니다. 이 변수를 조정하면 성능이 향상 될 수 있지만 파일 시스템마다 동작이 크게 다르며 일부 상황에서는 기본값을 변경하면 문제가 발생하므로 조정하기 전에 테스트하고 벤치마킹하십시오. MariaDB에서 Windows는 Unix 메소드를 인식하고 올바르게 처리하지만, 아무것도 지정하지 않으면 모든 파일에 대해 자체 기본 버퍼링되지 않은 쓰기 (O_DIRECT의 아날로그) + 동기화 (예 : FileFlushBuffers ())를 사용합니다.
O_DSYNC-O_DSYNC는 로그를 열고 플러시하고 fsync ()는 데이터 파일을 플러시하는 데 사용됩니다.
O_DIRECT-O_DIRECT 또는 directio ()는 데이터 파일을 여는 데 사용되고 fsync ()는 데이터와 로그를 플러시하는 데 사용됩니다.
fsync-유닉스 기본값. 직접 지정할 수 있지만 Unix에서 변수를 설정하지 않으면 기본적으로 fsync ()가 사용됩니다.
O_DIRECT_NO_FSYNC-MariaDB 10.0에서 도입되었습니다. I / O를 비우는 동안 O_DIRECT를 사용하지만 나중에 fsync ()를 건너 뜁니다. XFS 파일 시스템에는 적합하지 않습니다.
ALL_O_DIRECT-MariaDB 5.5에 도입되었으며 XtraDB에서만 사용 가능합니다. 데이터와 로그를 모두 여는 데 O_DIRECT를 사용하고 데이터는 플러시하지만 fsync ()는 로그를 플러시하지 않습니다. 큰 InnoDB 파일 만 사용하면 성능이 저하 될 수 있습니다. ext4 파일 시스템에서 innodb_log_block_size를 4096으로 설정하십시오. 이것은 ext4의 기본 로그 블록 크기이며 정렬되지 않은 AIO / DIO 경고를 피합니다.
버퍼링되지 않음-Windows 전용 기본값
async_unbuffered-Windows 전용, 버퍼링되지 않은 별명
normal-Windows 전용, fsync의 별명
Commandline: --innodb-flush-method=name
Scope: Global
Dynamic: No
Data Type: enumeration (>= MariaDB 10.3.7), string (<= MariaDB 10.3.6)
Default Value:
fsync (>= MariaDB 10.3.7)
Not set (<= MariaDB 10.3.6)
Valid Values:
Unix: fsync, O_DSYNC, O_DIRECT, O_DIRECT_NO_FSYNC (>=MariaDB 10.0), ALL_O_DIRECT (>= MariaDB 5.5 to <= MariaDB 10.1, XtraDB only)
Windows: unbuffered, async_unbuffered, normal

8. innodb_write_io_threads
설명 : XtraDB / InnoDB 쓰기를위한 I / O 스레드 수. 드물지만 시스템 한계를 초과하지 않도록 여러 MariaDB 서버를 실행하는 Linux 시스템에서이 기본값을 줄여야 할 수도 있습니다.
Commandline: --innodb-write-io-threads=#
Scope: Global
Dynamic: No
Data Type: numeric
Default Value: 4
Range: 1 to 64


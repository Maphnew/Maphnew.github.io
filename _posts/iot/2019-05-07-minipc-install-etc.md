3. 필수 라이브러리 설치
- pip3 install -r requirements.txt

4. postgresql 데이터베이스 생성
```
# su - postgres
```
```
# psql
```

- 데이터베이스 생성

```sql
CREATE DATABASE uyeg
WITH OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```

5. postgresql 테이블 생성

```sql
-- uyeg 데이터베이스 연결
\c uyeg

CREATE TABLE public.devicedata (
    id integer NOT NULL,
    datasavedtime timestamp without time zone NOT NULL,
    max_current numeric(10,2) NOT NULL,
    current_r numeric(10,2) NOT NULL,
    current_s numeric(10,2) NOT NULL,
    current_t numeric(10,2) NOT NULL,
    avg_voltage numeric(10,2) NOT NULL,
    voltage_r numeric(10,2) NOT NULL,
    voltage_s numeric(10,2) NOT NULL,
    voltage_t numeric(10,2) NOT NULL,
    temperature numeric(10,2) NOT NULL,
    humidity numeric(10,2) NOT NULL,
    active_power numeric(10,2) NOT NULL,
    active_power_consumption numeric(10,2) NOT NULL,
    reactive_power_consumption numeric(10,2) NOT NULL,
    power_factor numeric(10,2) NOT NULL,
    total_running_hour numeric(10,2) NOT NULL,
    mc_count_display numeric(10,2) NOT NULL,
    ground_current numeric(10,2) NOT NULL,
    pt100_temperature numeric(10,2) NOT NULL,
    vibration numeric(10,2) NOT NULL,
    success boolean NOT NULL,
    PRIMARY KEY (id, datasavedtime)
) WITH (OIDS=False);

CREATE TABLE public.log (
    id SERIAL NOT NULL,
    fk_id integer NOT NULL,
    log text NOT NULL,
    create_at timestamp without time zone NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.devicelist (
    id SERIAL NOT NULL,
    device_id varchar(30) NOT NULL,
    create_at timestamp without time zone NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.remapversion (
    id SERIAL NOT NULL,
    version varchar(30) NOT NULL
);

INSERT INTO public.remapversion(id, version) VALUES (1, 'remap_v1');

```

6. timescaledb 적용
```sql
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

SELECT create_hypertable('devicedata', 'datasavedtime', create_default_indexes=>FALSE);

CREATE UNIQUE INDEX ON devicedata (id, datasavedtime desc);

CREATE UNIQUE INDEX ON devicedata (datasavedtime desc, id);

SELECT set_chunk_time_interval('devicedata', interval '24 hours');

```

7. redis 설치
```
centos => yum install redis

ubuntu => apt-get install redis
```


8. db migration
```
python3 manage.py makemigrations
python3 manage.py migrate
```
- super user 생성
```
# python3 manage.py createsuperuser
```
- django run
```
# python3 manage.py runserver 0:8000
```

- smart eocr(uyeg-ze) 등록

9. redis server / scada 시작
```
# redis-server

- producer 시작 
# python3 manage.py producer start

- consumer 시작 
# python3 manage.py consumer start

- producer 종료 
# python3 manage.py producer stop

- consumer 종료 
# python3 manage.py consumer stop
```
10. 서비스 등록
```
mv /var/www/uyeg_scada/ubuntu_service_file/* /etc/systemd/system/
systemctl enable gunicorn
systemctl enable producer
systemctl enable consumer

systemctl start gunicorn
systemctl start producer
systemctl start consumer
```

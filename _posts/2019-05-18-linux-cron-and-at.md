### 4.4.6 CRON 과 AT

(233page)

#### cron

주기적으로 반복되는 일을 자동으로 실행할 수 있도록 시스템 작업을 예약해 놓는 것을 cron이라 부른다.
cron과 관련된 데몬(서비스)은 crond이고, 관련 파일은 /etc/crontab 이다.

/etc/crontab의 형식
> 분 시 일 월 요일 사용자 실행명령
```
00 05 1 * * root cp -r /home /backup
```
매월 1일 5시에 실행

cron은 주기적을 실행할 내용을 디렉터리에 넣어 놓고 작동한다.
- /etc/cron.hourly/
- /etc/cron.daily/
- /etc/cron.weekly/
- /etc/cron.monthly/

#### at

'at'명령어는 일회성 작업을 예약하는 것이다. 즉, 예약해 놓으면 한 번만 실행되고 소멸된다.

- 예약:at 시간
예) 
at 3:00am tomorrow : 내일 새벽3시
at 11:00pm January 30 : 1/30 오후 11시
at now + 1hours : 1시간 후
- at> 프롬프트에 예약 명령어 입력 후 enter 누름
- 완료되면 Ctrl+D 누름
- 확인: at -l
- 취소: atrm 작업번호


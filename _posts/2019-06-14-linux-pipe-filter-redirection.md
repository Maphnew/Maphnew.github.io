## 4.6 파이프, 필터, 리다이렉션

- 파이프
파이프는 2개의 프로그램을 연결해주는 연결 통로를 의미한다.
'|'를 사용함

(예)
```bash
# ls -l /etc | more
```
1페이지씩 나눠서 보겠다는 의미

- 필터
필요한 것만 걸러주는 명령어
'grep', 'tail', 'wc', 'sort', 'awk', 'sed' 명령어 등이 있다.
주로 파이프와 같이 사용된다.

(예)
```bash
# ps -ef | grep bash
```
'ps -ef'를 입력하면 모든 프로세스 번호를 출력하므로, bash라는 글자가 들어간 프로세스만 출력하게 한다.
```bash
# rpm -qa | grep yum
```
설치된 패키지 중에서 'yum'이라는 글자가 들어간 패키지를 출력한다. 그냥 'rpm -qa yum'을 실행하면 'yum-utils'는 출력되지 않는다.

- 리다이렉션
표준 입출력의 방향을 바꿔준다.
표준 입력은 키보드, 표준 출력은 모니터이지만 이를 파일로 처리하고 싶을 때 주로 사용한다.

(예)
```bash
# ls -l > list.tx
```
ls -l 의 결과를 화면에 출력하지 말고, list.txt 파일에 저장한다. 만약, list.txt 파일이 기존에 있으면 덮어 쓴다.(overwrite)
```bash
# ls -l >> list.txt
```
위와 같다. 단, list.txt 파일이 기존에 있으면 기존의 내용에 이어서append 쓴다.
```bash
# sort < list.txt
```
list.txt 파일을 정렬해서 화면에 출력한다.
```bash
# sort < list.txt > out.txt
```
list.txt 파일을 정렬해서 out.txt 파일에 쓴다.

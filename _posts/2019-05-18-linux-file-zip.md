### 4.4.3 파일 압축과 묶기

#### 파일 압축
(227page)
- xz : 비교적 최신의 압축 명령으로 압축률이 뛰어남
- bzip2
- bunzip2
- gzip
- gunzip
- zip : windows 호환
- unzip : zip파일을 풀어줌

#### 파일 묶기
> '파일 압축'이란 것은 원래 파일 묶기 + 파일 압축이다.

- tar

- tar 동작
+ c 새로운 묶음을 만든다
+ x 묶인 파일을 푼다
+ t 묶음을 풀기 전에 묶인 경로를 보여준다
+ C 묶음을 풀 때 지정된 디렉터리에 압축을 푼다. 지정하지 않으면 묶을 때와 동일한 디렉터리에 묶음이 풀린다
- tar 옵션
+ f(필수) 묶음 파일 이름 지정. 원래 tat는 테이프tape 장치 백업이 기본이다(생략하면 테이프로 보내짐)
+ v visual의 의미로 파일이 묶이거나 풀리는 과정을 보여준다(생략가능)
+ J tar + xz
+ z tar + gzip
+ j tar + bzip2

```bash
# 묶기 + xz 압축
tar cvfJ my.tar.xz /etc/sysconfig/ 
# tar 풀기
tar xvf my.tar
```

## 6.1 하드디스크 한 개 추가하기

### 6.1.1 IDE장치와 SCSI장치 구성

메인보드의 IDE0, IDE1 슬롯에는 각각 2개의 IDE장치를 장착할 수 있다.
이 4개의 장치를 표기할 때는 주로 IDE 0:0, 0:1, 1:0, 1:1로 표기한다.

> 일반적으로 PC에서 사용되는 하드디스크나 CD/DVD장치가 IDE장치(또는 EIDE장치)라고 생각하면 된다. 그리고 서버용으로는 주로 SCSI 하드디스크를 사용한다. 물론 IDE든 SCSI든 VMware에서는 어차피 가상으로 생성하기 때문에 진짜 컴퓨터의 하드디스크 종류와는 전혀 무관하다.
참고로 요즘에는 PC용 하드디스크로 IDE 대신에 SATA(Serial ATA)를, 서버용으로 SCSI 대신에 SA-SCSI(Serial Attached SCSI, 줄여서 SAS)를 주로 사용한다. SCSI가 최대 16개 장치를 연결할 수 있었다면 SA-SCSI는 최대 65,535개까지 연결할 수 있다.

...


### 6.1.2 하드디스크 추가하기
- SCSI 0:1 에 추가

```
# fdisk /dev/sdb
Command: n
Select: p
Partition number: 1
First sector: Enter
Last sector: Enter
Command : p
Command : w
```

파일 시스템 ext4 형식으로 생성
```
# mkfs.ext4 /dev/sdb1
```
디렉터리에 마운트
```
# mkdir /mydata
# cp anaconda-ks.cfg /mydata/test1
# ls -l /mydata/
# mount /dev/sdb1 /mydata
# ls -l /mydata/
# cp anaconda-ks.cfg /mydata/test2
# ls -l /mydata/

```
마운트 해제
```
# umount /dev/sdb1
# ls -l /mydata/
```



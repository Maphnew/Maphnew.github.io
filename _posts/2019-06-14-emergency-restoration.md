## 4.9 응급 복구

root 사용자 비밀번호 변경

1. GRUB의 메뉴화면에서 'E'(edit)를 누름
2. 아래 쪽 'linux16 /boot/~ '행에 커서를 가져다 놓는다.
3. 키보드 'End'를 눌러 행의 끝으로 이동
4. 'rhgb quiet LANG=ko_KR.UTF-8'을 삭제
5. 몇 칸 띄우고 'init=/bin/sh'를 입력
6. ctrl + x를 눌러 부팅
7. 프롬프트에서 whoami 명령어로 root 확인
8. mount 명령어를 입력해 제일 아래를 확인하면 / 파티션이 ro(Read-Only)로 마운트된 것 확인
9. mount -o remount,rw / 을 입력해 rw모드로 마운트
10. mount 로 다시 확인
11. passwd 명령어로 root 비밀번호 변경
12. 시스템 재시작



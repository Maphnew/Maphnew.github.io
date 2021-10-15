---
title: "프론트엔드 개발환경의 이해와 실습 Section 1: NPM"
date: 2021-10-06 22:16:00
categories:
  - Frontend
tags:
  - [Frontend, NPM]
toc: true
toc_sticky: true
---

# Section 1. 프론트엔드 개발환경의 이해: NPM

<small>REF: [김정환님의 블로그](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)</small>

## 1. 프론트엔드 개발에 Node.js가 필요한 이유

### 최신 스펙으로 개발 할 수 있다.

자바스크립트 스펙 발전 속도 > 브라우저의 지원 속도  
최신 스펙의 자바스크립트, 타입스크립트, SASS 등을 브라우저에서 구현하기 위해 Node.js 기술로 만들어진 webpack, babel, npm과 같은 tool을 이용한다.

### 빌드 자동화

최신 개발 방식은 파일 압축, 코드 난독화, 폴리필 추가하는 등의 작업 후 배포한다.  
Node.js는 일련의 빌드 과정을 이해하고 의존성을 해결하고, 각종 테스트를 자동화하는데도 사용된다.

### 개발 환경 커스터마이징

React, Vue와 같은 프레임워크에서 제공하는 CRA, vue-cli를 사용하면 손쉽게 개발환경을 갖출 수 있다. 그러나 현실의 프로젝트는 커스터마이징을 할 수 밖에 없고 Node.js 지식을 이용해 직접 환경을 구축할 수 있어야 한다.

## 2. Node.js 설치

```
node --version
npm --version
```

## 3. 프로젝트 초기화

```
npm init
```

## 4. 프로젝트 명령어

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "echo \"BUILD SCRIPT!\""
  }
}
```

## 5. 패키지 설치

### 5.1 CDN을 이용한 방법

CDN(Content Delivery Network, 컨텐츠 전송 네트워크)으로 제공하는 라이브러리 직접 가져오기

```html
<script src-"https://unpkg.com/react@16/umd/react.development.js"></script>
```

CDN서버가 문제가 있을 경우 이 방법은 사용할 수 없다.ais-body

### 5.2 직접 다운로드하는 방법

라이브러리 코드를 프로젝트 폴더에 다운받아 놓는법.  
지속적인 업데이트가 되는 라이브러리의 경우 관리하기 어렵고 호환성 여부 확인하기도 어렵다.

### 5.3 NPM을 이용하는 방법

node package manager는 패키지를 관리한다. 외부 패키지를 편하게 관리할 수 있다.

```
npm install react
```

```json
{
  "dependencies": {
    "react": "^17.0.2"
  }
}
```

### 5.4 유의적 버전 Semantic Version

- 주 버전(Major Version): 기존 버전과 호환되지 않게 변경한 경우
- 부 버전(Minor Version): 기존 버전과 호환되면서 기능이 추가된 경우
- 수 버전(Patch Version): 기존 버전과 호환되면서 버그를 수정한 경우

### 5.5 버전의 범위

특정 버전 명시

```
1.2.3
```

특정 버전보다 높거나 낮을 경우

```
>1.2.3
>=1.2.3
<1.2.3
<=1.2.3
```

틸트(~)와 캐럿(^)을 이용

```
~1.2.3
^1.2.3
```

틸트(~)

- 마이너 버전 명시되어 있으면 패치 버전을 변경한다. 예: `~1.2.3` -> `1.2.3` 부터 `1.3.0` 미만 포함
- 마이너 버전이 없으면 마이너 버전을 갱신한다.
- `~0`는 `0.0.0`부터 `1.0.0`미만 포함

캐럿(^)

- 정식버전(Major가 0이 아닌경우)에서 마이너와 패치 버전을 변경함. 예: `^1.2.3` -> `1.2.3` ~ `2.0.0` 미만 까지 포함.
- 정식버전 미만인 `0.x`버전은 패치만 갱신한다.
- `^0`표기는 `0.0.0`부터 `0.1.0`미만 까지를 포함한다.

정식 릴리즈 전에는 패키지 버전이 수시로 변한다. 부버전이 변하더라도 하위 호환성을 지키지 않고 배포한다. 그래서 틸트는 사용하기 위험하고 캐럿은 하위 호환성 유지하기 유리하다.

NPM 패키지 관리는 캐럿 방식을 이용한다.

```
npm view react versions
```

틸트방식으로 변경한 뒤 재설치 해보자

```json
// package.json
{
  "dependencies": {
    "react": "~0"
  }
}
```

```
npm install
```

설치된 react의 버전을 확인 해보자

```
cat npm_modules/react/package.json
```

```json
// npm_modules/react/package.json
{
  "version": "0.14.10"
}
```

마이너 버전까지 업데이트가 되었다.

캐럿 방식으로 변경해보자

```json
// package.json
{
  "dependencies": {
    "react": "^0.0"
  }
}
```

설치된 react의 버전을 확인 해보자

```
cat npm_modules/react/package.json
```

```json
// npm_modules/react/package.json
"version": "0.0.3",
```

## 6. 정리

Node.js 설치  
프로젝트 초기화 방법  
scripts 사용법  
외부 패키지 다운로드와 버전 관리

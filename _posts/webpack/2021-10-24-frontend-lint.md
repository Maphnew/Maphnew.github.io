---
title: "프론트엔드 개발환경의 이해와 실습 Section 4: Lint"
date: 2021-10-24 16:22:00
categories:
  - Frontend
tags:
  - [Frontend, Lint]
toc: true
toc_sticky: true
---

# 프론트엔드 개발환경의 이해: 린트

## 1. 배경

오래된 스웨터의 보푸라기를 린트(Lint)라고 한다.  
코드에서 보푸라기를 제거하듯 오류나 버그, 스타일 따위를 점검하는 것을 린트 혹은 린터라고 부른다.

### 1.1 린트가 필요한 상황

```js
console.log()(
  // 줄바꿈
  function () {}
)();
```

자동으로 세미콜론을 붙여줘서 문제 없을 것 같지만 TypeError가 발생한다. 아래의 코드처럼 인식한다.

```js
console.log()(function () {})();
```

## 2. ESLint

### 2.1 기본 개념

- 포맷팅
- 코드 품질

### 2.2 설치 및 사용법

```
npm i -D eslint
```

```js
// app.js
console.log()(function () {})();
```

```js
// .eslintrc.js
module.exports = {};
```

```
npx eslint app.js
```

### 2.3 규칙(Rules)

```js
// .eslintrc.js
module.exports = {
  rules: {
    "no-unexpected-multiline": "error",
  },
};
```

```
$ npx eslint app.js

C:\workspaces\lectures\frontend\sample\app.js
  2:1  error  Unexpected newline between function and ( of function call  no-unexpected-multiline

✖ 1 problem (1 error, 0 warnings)
```

```js
// app.js
console.log();
(function () {})();
```

```
$ npx eslint app.js
```

### 2.4 자동으로 수정할 수 있는 규칙

```js
// app.js
console.log(); // ;;;;;; 자동으로 제거되어서 주석으로 작성함
(function () {})();
```

```js
// .eslintrc.js
module.exports = {
  rules: {
    "no-unexpected-multiline": "error",
    "no-extra-semi": "error",
  },
};
```

```
$ npx eslint app.js

C:\workspaces\lectures\frontend\sample\app.js
  1:15  error  Unnecessary semicolon  no-extra-semi
  1:16  error  Unnecessary semicolon  no-extra-semi
  1:17  error  Unnecessary semicolon  no-extra-semi
  1:18  error  Unnecessary semicolon  no-extra-semi
  1:19  error  Unnecessary semicolon  no-extra-semi

✖ 5 problems (5 errors, 0 warnings)
  5 errors and 0 warnings potentially fixable with the `--fix` option.
```

fix옵션으로 제거하자.

```
$ npx eslint app.js --fix
```

```js
// app.js
console.log(); // 제거됨
(function () {})();
```

공식 문서에서 렌치모양으로 된 것들은 수정 가능하다.

### 2.5 Extensible Config

규칙을 여러개 미리 정해 놓은 것이 eslint:recommended 설정이다.

```js
// .eslintrc.js
module.exports = {
  extends: ["eslint:recommended"],
  // rules: {
  //     "no-unexpected-multiline": "error",
  //     "no-extra-semi": "error"
  // }
};
```

### 2.6 초기화

--init 옵션을 추가하면 손쉽게 구성할 수 있다.

```
$ npx eslint --init
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ What format do you want your config file to be in? · JavaScript
```

```js
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {},
};
```

## 3. Prettier

ESLint 보다 코드를 더 예쁘게 만든다.

### 3.1 설치 및 사용법

```
npm i prettier
```

```js
// app.js
console.log(); // 세미콜론 없이 작성
```

```
$ npx prettier app.js
console.log();
```

```js
// app.js
console.log(); // 세미콜론 여러개 -> 하나로 변경
```

```
$ npx prettier app.js --write
app.js 17ms
```

### 3.2 포매팅(더 예쁘게)

규칙을 이용해 포매팅 품질을 좋게 만든다.

### 3.3 통합방법

```
npm i eslint-config-prettier
```

```js
// .eslintrc.js
{
    extends: [
        "eslint:recommended",
        "eslint-config-prettier"
    ]
}
```

```js
// app.js

var foo = "";

console.log(); // 세미콜론 여러개
```

```
$ npx eslint app.js --fix

C:\workspaces\lectures\frontend\sample\app.js
  1:5  error  'foo' is assigned a value but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

```
$ npx prettier app.js --write
app.js 30ms
```

한편, eslint-plugin-prettier는 프리티어 규칙을 ESLint 규칙으로 추가하는 플러그인이다. 프리티어의 모든 규칙이 ESLint로 들어오기 때문에 ESLint만 실행하면 된다.

```
npm i -D eslint-plugin-prettier
```

```js
// .eslintrc.js
{
  plugins: [
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error"
  },
}
```

```
npx eslint app.js --fix
```

프리티어는 이 두 패키지를 함께 사용하는 단순한 설정을 아래 설정과 같이 제공한다.

```js
// .eslintrc.js
{
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ]
}
```

결론은 아래와 같이 설치해주고 위와 같이 설정하면 된다.

```
npm i eslint prettier eslint-config-prettier eslint-plugin-prettier
```

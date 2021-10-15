---
title: "프론트엔드 개발환경의 이해와 실습 Section 2: Webpack(basic)"
date: 2021-10-06 22:16:00
categories:
  - Frontend
tags:
  - [Frontend, webpack]
toc: true
toc_sticky: true
---

# Section 2. 프론트엔드 개발환경의 이해: Webpack

<small>REF: [김정환님의 블로그](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)</small>

## 1. 배경

문법 수준에서 모듈을 지원하기 시작한 것은 ES2015부터다.  
import/export 구문이 없었던 모듈 이전의 개발 방식은 index.html에 필요한 js파일을 script 태그로 모두 추가했다.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="src/math.js"></script>
    <script src="src/app.js"></script>
  </body>
</html>
```

```js
// src/math.js
function sum(a, b) {
  return a + b;
}
```

```js
// src/app.js
console.log(sum(1, 2)); // 3
```

문제는 전역 스코프가 오염된다는 것

### 1.1 IIFE 방식의 모듈

[IIFE( Immediately Invoked Function Expression )](https://developer.mozilla.org/ko/docs/Glossary/IIFE)은 정의되자마자 즉시 실행되는 Javascript Function을 말한다.

```js
(function () {
  statement;
})();
```

IIFE로 변경해보자. 전역 스코프가 오염되지 않는다.

```js
// src/math.js
var math = math || {};

(function () {
  function sum(a, b) {
    return a + b;
  }
  math.sum = sum;
})();
```

```js
// src/app.js
console.log(math.sum(1, 2)); // 3
```

### 1.2 다양한 모듈 스펙

AMD와 CommonJS가 모듈을 구현하는 대표적인 명세이다.

CommonJS 대표적으로 Node.js에서 사용한다. exports 키워드로 모듈을 만들고 require() 함수로 불러들이는 방식이다.

```js
// src/math.js
exports function sum(a,b){return a+b}
```

```js
// src/app.js
const sum = require("./math.js");
console.log(sum(1, 2)); // 3
```

AMD(Asynchronous Module Definition)는 비동기로 로딩되는 환경에서 모듈을 사용하는 것이 목표이며 주로 브라우저 환경이다.

UMD(Universial Module Definition)는 AMD기반으로 CommonJS 방식까지 지원하는 통합 형태이다.

ES2015에서 표준 모듈 시스템을 내 놓았다. 지금은 바벨과 웹팩을 이용해 사용하는 것이 일반적이다.

```js
// src/math.js
export function sum(a, b) {
  return a + b;
}
```

```js
// src/app.js
import * as math from "./math.js";
console.log(math.sum(1, 2)); // 3
```

### 1.3 브라우저의 모듈 지원

크롬 브라우저에서 모듈을 사용하는 법

```html
<script type="module" src="src/app.js"></script>
```

CORS 오류가 난다면 lite-server 패키지를 설치해 실행해보자

크롬에서는 작동하지만 모든 브라우저에서 모듈 시스템을 지원하지 않는다. 웹팩이 필요하다.

## 2. 엔트리/아웃풋

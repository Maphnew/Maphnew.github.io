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
console.log(sum(1, 2));
```

문제는 전역 스코프가 오염된다는 것

### 1.1 IIFE 방식의 모듈

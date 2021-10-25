---
title: "프론트엔드 개발환경의 이해와 실습 Section 5: Webpack(Advanced)"
date: 2021-10-06 22:16:00
categories:
  - Frontend
tags:
  - [Frontend, Webpack]
toc: true
toc_sticky: true
---

# Section 5. 프론트엔드 개발환경의 이해: Webpack 심화

<small>REF: [김정환님의 블로그](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)</small>

## 1. 웹팩 개발 서버

### 1.1 배경

운영환경과 유사하게 개발하기 위해 개발용 서버를 제공해 주는 webpack-dev-server를 사용해보자.  
ajax 방식의 api 연동은 cors 정책 때문에 반드시 서버가 필요하다.

### 1.2 설치 및 사용

```
npm i -D webpack-dev-server
```

```json
// package.json
"scripts": {
    "build": "webpack",
    "lint": "eslint src --fix",
    "start": "webpack-dev-server"
  },
```

```
npm start
```

### 1.3 기본 설정

```js
// webpack.config.js:
module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    host: "dev.domain.com",
    overlay: true,
    port: 8081,
    stats: "errors-only",
    historyApiFallback: true,
  },
};
```

- contentBase: 정적파일을 제공할 경로. 기본값은 웹팩 아웃풋이다.
- publicPath: 브라우저를 통해 접근하는 경로. 기본값은 '/'이다.
- host: 개발환경에서 도메인을 맞춰야 할 때 사용한다. 예를들어 쿠키 기반의 인증은 인증 서버와 동일한 도메인으로 개발환경을 맞추어야 한다. 운영체제의 호스트 파일에 해당 도메인과 127.0.0.1을 연결해 추가한 뒤 host 속성에 도메인을 설정해서 사용한다.
- overlay: 웹팩 빌드시 에러나 경고를 브라우저 화면에 표시한다.
- port: 개발 서버 포트 번호를 설정한다. 기본값은 8080.
- stats: 메시지 수준을 정할 수 있다. 'none', 'errors-only', 'minimal', 'normal', 'verbose'로 메세지 수준을 조절한다.
- historyApiFallBack: 히스토리 API를 사용하는 SPA 개발시 설정한다. 404가 발생하면 index.html로 리다이렉트한다.
- 이 외에도 개발 서버를 실행할 때 명령어 인자로 --progress를 추가하면 빌드 진행율을 보여준다. 빌드 시간이 길어질 경우 사용하면 좋다.

## 2. API 연동

mock up 데이터를 이용하여 api를 대체하면서 개발한다.

### 2.1 목업 API 1: devServer.before

웹팩 개발 설정 중 before 속성은 개발 서버에 기능을 추가할 수 있게 한다.
Express.js로 만들어져 있고 미들웨어 형태로 서버 기능 확장이 가능하다. 

```js
// webpack.config.js
module.exports = {
  devServer: {
    before: (app, server, compiler) => {
      app.get("/api/keywords", (req, res) => {
        res.json([
          { keyword: "이탈리아" },
          { keyword: "세프의요리" },
          { keyword: "제철" },
          { keyword: "홈파티" },
        ])
      })
    },
  },
}
```

```js
// src/app.js
import axios from 'axios';

document.addEventListener('DOMContentLoaded', async () => {
    const res = await axios.get('/api/users');
    console.log(res)
    document.body.innerHTML = `
    `
})
```

### 2.2 목업 API 2: connect-api-mocker

목업 api 작업이 많을 때는 connect-api-mocker 패키지의 도움을 받자.  

```
npm i -D connect-api-mocker
```

```json
// mocks/api/keywords/GET.json
[
  { keyword: "이탈리아" },
  { keyword: "세프의요리" },
  { keyword: "제철" },
  { keyword: "홈파티" },
]
```

```js
// webpack.config.js
const apiMocker = require("connect-api-mocker")

before: app => {
      app.use(apiMocker('/api', 'mocks/api'))
    }
```

### 2.3 실제 API 연동: devServer.proxy 

8081 포트로 서버가 구성되어 있다고 가정하고 설정해보자.

```js
// src/model.js
const model = {
  async get() {
    // const result = await axios.get('/api/keywords');

    // 직접 api 서버로 요청한다.
    const { data } = await axios.get("http://localhost:8081/api/keywords")
    return data
  },
}
```

CORS 정책 때문에 오류가 발생한다.  
서버에서 Access-Control-Allow-Origin 설정을 하거나 프론트에서 아래와 같이 설정한다.  

```js
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      "/api": "http://localhost:8081", // 프록시
    },
  },
}
```

http 요청 중 /api로 시작되는 것은 http://localhost:8081로 요청하는 설정이다.

```js
// src/model.js
const model = {
  async get() {
    // const { data } = await axios.get('http://localhost:8081/api/keywords');

    const { data } = await axios.get("/api/keywords")
    return data
  },
}
```

## 3. 핫 모듈 리플레이스먼트

### 3.1 배경

전체 화면을 새로고침하지 않고 변경된 부분만 새로고침 된다.  

### 3.2 설정

```js
// webpack.config.js:
module.exports = {
  devServer = {
    hot: true,
  },
}
```

아래와 같이 디테일하게 컨트롤 할 수 있다.   

```js
// src/app.js

if (module.hot) {
  console.log("핫모듈 켜짐")

  module.hot.accept("./result", () => {
    console.log("result 모듈 변경됨")
  })

  module.hot.accept("./view", async () => {
    view.render(await model.get(), controller.el) // 변경된 모듈로 교체
  })
}
```


### 3.3 핫로딩을 지원하는 로더

HMR 인터페이스를 구현한 로더만이 핫 로딩을 지원하는데 style-loader가 그렇다.  
react-hot-loader, file-loader 또한 핫 모듈 리플레이스먼트를 지원한다.  

## 4. 최적화 
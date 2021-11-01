---
title: "프론트엔드 개발환경의 이해와 실습 Section 5: Webpack(Advanced)"
date: 2021-10-26 22:16:00
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
        ]);
      });
    },
  },
};
```

```js
// src/app.js
import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get("/api/users");
  console.log(res);
  document.body.innerHTML = `
    `;
});
```

### 2.2 목업 API 2: connect-api-mocker

목업 api 작업이 많을 때는 connect-api-mocker 패키지의 도움을 받자.

```
npm i -D connect-api-mocker
```

```json
// mocks/api/keywords/GET.json
[
  { "keyword": "이탈리아" },
  { "keyword": "세프의요리" },
  { "keyword": "제철" },
  { "keyword": "홈파티" }
]
```

```js
// webpack.config.js
const apiMocker = require("connect-api-mocker");

before: (app) => {
  app.use(apiMocker("/api", "mocks/api"));
};
```

### 2.3 실제 API 연동: devServer.proxy

8081 포트로 서버가 구성되어 있다고 가정하고 설정해보자.

```js
// src/model.js
const model = {
  async get() {
    // const result = await axios.get('/api/keywords');

    // 직접 api 서버로 요청한다.
    const { data } = await axios.get("http://localhost:8081/api/keywords");
    return data;
  },
};
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
};
```

http 요청 중 /api로 시작되는 것은 http://localhost:8081로 요청하는 설정이다.

```js
// src/model.js
const model = {
  async get() {
    // const { data } = await axios.get('http://localhost:8081/api/keywords');

    const { data } = await axios.get("/api/keywords");
    return data;
  },
};
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

아래와 같이 동작한다.

```js
// src/app.js

if (module.hot) {
  console.log("핫모듈 켜짐");

  module.hot.accept("./result", () => {
    console.log("result 모듈 변경됨");
  });

  module.hot.accept("./view", async () => {
    view.render(await model.get(), controller.el); // 변경된 모듈로 교체
  });
}
```

### 3.3 핫로딩을 지원하는 로더

HMR 인터페이스를 구현한 로더만이 핫 로딩을 지원하는데 style-loader가 그렇다.  
react-hot-loader, file-loader 또한 핫 모듈 리플레이스먼트를 지원한다.

## 4. 최적화

메가바이트 단위로 커질 수 있는 번들 결과물을 최적화 해보자.

### 4.1 production 모드

development mode 일 때 아래 두 개 플러그인을 사용한다.

- NamedChunksPlugin
- NamedModulesPlugin

production mode 일때 아래의 플러그인을 사용한다.

- FlagDependencyUsagePlugin
- FlagIncludedChunksPlugin
- ModuleConcatenationPlugin
- NoEmitOnErrorsPlugin
- OccurrenceOrderPlugin
- SideEffectsFlagPlugin
- TerserWebpackPlugin

DefinePlugin을 사용해 process.env.NODE_ENV 값을 mode 변경에 활용할 수 있다.

```js
// webpack.config.js:
const mode = process.env.NODE_ENV || "development"; // 기본값을 development로 설정

module.exports = {
  mode,
};
```

```json
// package.json
{
  "scripts": {
    "start": "webpack-dev-server --progress",
    "build": "NODE_ENV=production webpack --progress"
  }
}
```

### 4.2 optimization 속성으로 최적화

빌드 과정을 커스터마이징 할 수 있는데 optimization 속성으로 가능하다.  
css파일도 빈칸없이 압축하려면 optimize-css-assets-webpack-plugin을 사용한다.

```
npm i -D optimize-css-assets-webpack-plugin
```

```js
// webpack.config.js:
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: mode === "production" ? [new OptimizeCSSAssetsPlugin()] : [],
  },
};
```

TerserWebpackPlugin은 자바스크립트 코드를 난독화하고 debugger 구문을 제거한다.  
기본 설정 외에도 console.log를 제거하는 옵션도 있다.

```
npm i -D terser-webpack-plugin
```

```js
// webpack.config.js:
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimizer:
      mode === "production"
        ? [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
  },
};
```

### 4.3 코드 스플리팅

압축하는 것 외에도 결과물을 여러개로 쪼개면 브라우저 속도를 높일 수 있다.

가장 단순한 것은 엔트리를 여러개로 분리하는 것이다.

```js
// webpack.config.js
module.exports = {
  entry: {
    main: "./src/app.js",
    controller: "./src/controller.js",
  },
};
```

두 파일에 중복코드가 있다.  
SplitChunksPlugin은 코드를 분리할 때 중복을 예방하는 플러그인이다.  
optimization.splitChunks 속성을 사용한다.

```js
// webpack.config.js:
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

엔트리 포인트를 직접 분리하지 않고 자동으로 변경해 주는 "다이나믹 임포트"를 사용할 수 있다.

기존 코드

```js
import controller from "./controller";

document.addEventListener("DOMContentLoaded", () => {
  controller.init(document.querySelector("#app"));
});
```

동적 임포트

```js
function getController() {
  return import(/* webpackChunkName: "controller" */ "./controller").then(
    (m) => {
      return m.default;
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  getController().then((controller) => {
    controller.init(document.querySelector("#app"));
  });
});
```

webpackChunkName을 주석으로 전달하여 웹팩이 이 파일을 처리할 때 청크로 분리한다.

### 4.4 externals

axios같은 써드파티 라이브러리는 패키지로 제공될 때 이미 빌드 과정을 거쳤기 때문에 빌드 프로세스에서 제외하는 것이 좋다. externals가 바로 이러한 기능을 제공한다.

```js
// webpack.config.js:
module.exports = {
  externals: {
    axios: "axios",
  },
};
```

번들에 포함하지 않고 빌드한다. 대신 이를 전역 변수로 접근하도록 하는데 키로 설정한 axios가 그 이름이다.

aixos는 이미 node_modules에 위치해 있기 때문에 이를 웹팩 아웃풋 폴더에 옮기고 index.html에서 로딩해야 한다. 파일을 복사하는 CopyWebpackPlugin을 사용해보자.

```
npm i -D copy-webpack-plugin
```

```js
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/axios/dist/axios.min.js",
          to: "./axios.min.js", // 목적지 파일에 들어간다
        },
      ],
    }),
  ],
};
```

```html
<!-- src/index.html -->
  <script type="text/javascript" src="axios.min.js"></script>
</body>
</html>
```

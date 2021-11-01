---
title: "프론트엔드 개발환경의 이해와 실습 Section 3: Babel"
date: 2021-10-18 22:16:00
categories:
  - Frontend
tags:
  - [Frontend, Babel]
toc: true
toc_sticky: true
---

# Section 3. 프론트엔드 개발환경의 이해: Babel

<small>REF: [김정환님의 블로그](https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html)</small>

## 1. 배경

### 1.1 크로스 브라우징

히브리 신화 바벨탑이 실패한 이유는 다른 언어였다. 브라우저마다 사용하는 언어가 달라서 프론트엔드 코드는 일관적이지 못할 때가 많다. 크로스 브라우징 이슈는 코드의 일관성을 해치고 바벨이 히브리어로 '혼돈'이라는 뜻 인것 처럼 초심자에게 혼란스럽게 만든다.

크로스 브라우징을 해결해 주는 것이 바벨이다. ECMAScript2015+로 작성한 코드를 모든 브라우저에서 동작하도록 호환성을 지켜준다. 타입스크립트, JSX처럼 다른 언어로 분류되는 것도 포함한다.

### 1.2 트랜스파일과 빌드

변환 전후의 추상화 수준이 다른 빌드와는 달리 트랜스파일은 추상화 수준을 유지한 상태로 코드를 변환한다. 타입스크립트 -> 자바스크립트, JSX -> 자바스크립트처럼 트랜스파일 이후에도 여전히 코드를 읽을 수 있다.

요즘은 이 둘을 구분하지 않고 사용하는 것 같다.

## 2. 바벨의 기본 동작

바벨과 커맨드라인 도구를 설치해서 실행해보자

```
npm install -D @babel/core @babel/cli
```

```js
// app.js
const alert = (msg) => window.alert(msg);
```

```
npx babel app.js
const alert = msg => window.alert(msg);
```

변환되지 않았다.  
바벨은 세 단계로 빌드를 진행한다.

1. 파싱(Parsing)
2. 변환(Transforming)
3. 출력(Printing)

여기서 변환 단계가 이루어지지 않았는데, 변환 단계를 수행하는 것이 플러그인이다.

## 3. 플러그인

### 3.1 커스텀 플러그인

```js
// my-babel-plugin.js
module.exports = function mypBabellugin() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;

        // 바벨이 만든 AST 노드를 출력한다
        console.log("Identifier() name:", name);

        // 변환작업: 코드 문자열을 역순으로 변환한다
        // path.node.name = name.split("").reverse().join("")
      },
    },
  };
};
```

변환 작업없이 콘솔로그만 찍는 플러그인이다.

바벨 헬프문서를 보고 어떻게 사용하는지 보자. --plugins 옵션을 사용하는 것 같다.

```
$ npx babel --help
Usage: babel [options] <files ...>

Options:
  -f, --filename [filename]                   The filename to use when reading from stdin. This will be used in source-maps, errors etc.
  --presets [list]                            A comma-separated list of preset names.
  --plugins [list]                            A comma-separated list of plugin names.
  --config-file [path]                        Path to a .babelrc file to use.
  --env-name [name]                           The name of the 'env' to use when loading configs and plugins. Defaults to the value of BABEL_ENV,
                                              or else NODE_ENV, or else 'development'.
  --root-mode [mode]                          The project-root resolution mode. One of 'root' (the default), 'upward', or 'upward-optional'.
  ...
  ...
```

```
$ npx babel app.js --plugins './my-babel-plugin.js'
Identifier() name: alert
Identifier() name: msg
Identifier() name: window
Identifier() name: alert
Identifier() name: msg
const alert = msg => window.alert(msg);
```

콘솔로그가 하나씩 찍히고 변환되지 않은채로 출력됐다.  
변환작업을 추가해보자.

```js
// my-babel-plugin.js
module.exports = function mypBabellugin() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;

        // 바벨이 만든 AST 노드를 출력한다
        console.log("Identifier() name:", name);

        // 변환작업: 코드 문자열을 역순으로 변환한다
        path.node.name = name.split("").reverse().join("");
      },
    },
  };
};
```

```
$ npx babel app.js --plugins './my-babel-plugin.js'
Identifier() name: alert
Identifier() name: msg
Identifier() name: window
Identifier() name: alert
Identifier() name: msg
const trela = gsm => wodniw.trela(gsm);
```

토큰들의 문자 순서가 뒤집혀졌다.  
const 토큰을 var로 변환하는 메소드를 실행해보자.

```js
// my-babel-plugin.js
module.exports = function mypBabellugin() {
  return {
    visitor: {
      VariableDeclaration(path) {
        console.log("VariableDeclaration() kind:", path.node.kind); // const
        if (path.node.kind === "const") {
          path.node.kind = "var";
        }
      },
    },
  };
};
```

```
$ npx babel app.js --plugins './my-babel-plugin.js'
VariableDeclaration() kind: const
var alert = msg => window.alert(msg);
```

const가 var로 변환되었다.

### 3.2 플러그인 사용하기

위와 같은 결과를 만드는 것이 block-scoping 플러그인이다. const, let 처럼 블록 스코핑을 따르는 예약어를 함수 스코핑을 사용하는 var로 변경한다.

```
npm install -D @babel/plugin-transform-block-scoping
```

```
$ npx babel app.js --plugins @babel/plugin-transform-block-scoping
var alert = msg => window.alert(msg);
```

화살표 함수 플러그인을 사용해보자.

```
npm install -D @babel/plugin-transform-arrow-functions
```

```
$ npx babel app.js --plugins @babel/plugin-transform-arrow-functions
const alert = function (msg) {
  return window.alert(msg);
};
```

두가지를 동시해 적용해보자.

```
$ npx babel app.js --plugins @babel/plugin-transform-block-scoping --plugins @babel/plugin-transform-arrow-functions
var alert = function (msg) {
  return window.alert(msg);
};
```

"use strict" 구문을 추가해주는 플러그인을 추가해보자.

```
$ npx babel app.js --plugins @babel/plugin-transform-block-scoping --plugins @babel/plugin-transform-arrow-functions --plugins @babel/plugin-tran
sform-strict-mode
"use strict";

var alert = function (msg) {
  return window.alert(msg);
};
```

바벨 설정파일을 생성하여 길어지는 명령어를 정리해보자.

```js
// babel.config.js
module.exports = {
  plugins: [
    "@babel/plugin-transform-block-scoping",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-strict-mode",
  ],
};
```

```
$ npx babel app.js
"use strict";

var alert = function (msg) {
  return window.alert(msg);
};
```

## 4. 프리셋

필요한 플러그인을 일일이 설정하지 않고 미리 여러가지 플러그인을 세트롤 모아놓은 것을 "프리셋"이라고 한다.

### 4.1 커스텀 프리셋

프리셋을 만들어 사용해보자.

```js
// my-babel-preset.js
module.exports = function myBabelPreset() {
  return {
    plugins: [
      "@babel/plugin-transform-block-scoping",
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-strict-mode",
    ],
  };
};
```

```js
// babel.config.js
module.exports = {
  presets: ["./my-babel-preset.js"],
};
```

```
$ npx babel app.js
"use strict";

var alert = function (msg) {
  return window.alert(msg);
};
```

### 4.2 프리셋 사용하기

대표적인 프리셋은 다음과 같다.

- preset-env
- preset-flow
- preset-react
- preset-typescript

설치해서 사용해보자.

```
npm i @babel/preset-env
```

```js
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env"],
};
```

```
$ npx babel app.js
"use strict";

var alert = function alert(msg) {
  return window.alert(msg);
};
```

## 5. env 프리셋 설정과 폴리필

### 5.1 타겟 브라우저

타겟 옵션에 특정 브라우저를 지원해야된다고 설정해준다.

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: 79,
        },
      },
    ],
  ],
};
```

```
$ npx babel app.js
"use strict";

const alert = msg => window.alert(msg);
```

can i use에서 확인해보자.  
const 키워드는 chrome 79버전 이상에서 사용할 수 있기 때문에 변환되지 않았다.  
arrow 함수도 지원되기 때문에 변환되지 않았다.  
IE는 arrow 함수를 지원하지 않고 const 키워드도 지원하지 않는다.  
IE를 테스트 해보자.

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79",
          ie: "11",
        },
      },
    ],
  ],
};
```

```
$ npx babel app.js
"use strict";

var alert = function alert(msg) {
  return window.alert(msg);
};
```

var 키워드로 변환되었고 함수도 변환되었다.

### 5.2 폴리필

promise를 변환해보자.

```js
// app.js

new Promise();
```

```
$ npx babel app.js
"use strict";

new Promise();
```

can i use에 확인하면 ie에서 오류가 난다.  
플러그인이 프라미스를 ECMAScript5 버전으로 변환할 것으로 기대했지만 아니다.  
바벨은 ECMAScript2015+를 ECMAScript5 버전으로 변환할 수 있는 것만 빌드한다. 그렇지 못한 것들은 "폴리필"이라고 부르는 코드조각을 추가해서 해결한다.

화살표 함수, 블록 스코핑은 각각 일반 함수, 함수 스코핑으로 대체할 수 있지만 프라미스는 ECMAScript5 버전으로 대체할 수 없다. 다만 ECMAScript5 버전으로 구현할 수는 있다. core-js promose

env 프리셋은 폴리필을 지정할 수 있는 옵션을 제공한다.

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79",
          ie: "11",
        },
        useBuiltIns: "usage", // 'entry', false
        corejs: {
          version: 2, // 3
        },
      },
    ],
  ],
};
```

```
$ npx babel app.js
"use strict";

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.promise.js");

new Promise();
```

core-js 패키지로부터 프라미스 모듈을 가져오는 임포트 구문이 추가되었다.  
core-js가 설치되어있는 가정하에 변환된 소스가 제대로 기능할 것이다.

## 6. 웹팩으로 통합

실무 환경에서 웹팩으로 통합해서 사용하는 것이 일반적이다.  
로더의 형태로 사용한다.

```
npm i -D babel-loader
```

엔트리 구성과 js파일을 바벨 로더를 이용해 변환하도록 설정해 주었고, node_modules에 있는 것들은 제외 했다.

```js
// webpack.config.js
    entry: {
        main: './app.js'
    },

    // ...
    rules: [
      // ...
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_module/'
            }
        ]
```

```
npm run build
```

빌드하면 core-js 모듈을 찾을 수 없다는 에러가 뜨는데 모듈을 설치해야 한다.

```
$ npm i core-js@2
```

다시 빌드 한다.

```
npm run build
```

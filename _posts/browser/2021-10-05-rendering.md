---
title: "[Browser] 성능 보장 렌더링 순서 Critical rendering path"

date: 2021-10-05 13:37:00

categories:
  - Browser
tags:
  - [Browser, Web, Rendering]

toc: true
toc_sticky: true
---

# 성능 보장 렌더링 순서

## 4.5 Critical rendering path

1. Construction [ DOM > CSSOM > RenderTree ]
   1. request/response
   1. loading
   1. scripting (DOM 변환)
1. Operation [ layout > paint > composition ]
   1. rendering (브라우저 윈도우에 표기하기 위해 준비)
   1. layout
   1. painting

- paint 단계에서 브라우저는 layer 별로 그리기 위해 준비함: 성능 개선을 위함, 일부를 변경할 수 있음.
- css will-chang -> 남용하지 말 것.

### Step1 Construction

- RenderTree까지 최대한 빨리가기
- DOM, CSS가 작을수록 좋음

### Step2 Operation

- Composition만 다시 일어날 수 있는 변경사항
- Paint > Composition만 다시 일어날 수 있는 변경사항
- Layout 부터 모두 다시 실행되는 사항
- 위 세가지 사항을 이해하고 개발해야함.

## 4.6 레이어 데모

```css
img {
  will-change: opacity;
}
```

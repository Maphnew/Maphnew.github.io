---
title: "[CSS] CSS Layout"

date: 2021-10-05 13:37:00

categories:
  - CSS
tags:
  - [CSS, Web]

toc: true
toc_sticky: true
---

# CSS Layout

<small><cite>ref: https://developer.mozilla.org/ko/docs/Learn/CSS/CSS_layout</cite></small>

## CSS layout overview

### 보통 흐름(normal flow)

- 페이지 레이아웃을 브라우저가 기본값으로 배치하는 방법
- 소스 코드에 나타나는 순서 그래도 HTML 요소가 표시된다. 요소 집합이 상대 요소 바로 아래 나타나는 것을 block 요소라고 기술하고, inline 요소와 상반된다.
- CSS에서 요소가 배치되는 방식을 변경시키는 메서드는 다음과 같다.
  - diplay 속성 --- `block`, `inline`, `inline-block`
    - ref - The box model: https://developer.mozilla.org/ko/docs/Learn/CSS/Building_blocks/The_box_model
  - Floats --- block 수준 요소가 어떤 요소의 한 쪽 측면으로 밀려나도록 할 수 있다.
  - position 속성 --- 다른 상자 내부에 들어가 상자의 정확한 위치를 제어할 수 있게 해준다.
  - table layout --- HTML table 스타일 지정을 위한 기능이기는 하나 `display:table`과 관련된 속성을 사용하여 비테이블 요소에도 사용될 수 있다.
  - Multi-column layout
    - 신문에서 볼 수 있는 column 형태로 배치되도록 만들 수 있다.

### display 속성

- 보통 흐름(normal flow)상의 모든 요소는 한 가지 `display` 속성값을 갖고 있으며, 해당 요소의 기본 동작 방식을 지정하는 데 사용된다.
- 우리는 이런 기본값 동작을 변경할 수 있다.
- 레이아웃의 목적이 무엇인지 논할 때 가장 중요한 두 가지 속성값은 `display: flex` 와 `diplay: grid` 이다.

### flexbox: Flexible Box Layout

- flexbox를 사용하려면 당신이 진열하길 원하는 모든 요소의 부모 요소에 `display: flex`를 적용하고 나면 모든 직계 자식이 플렉스 항목이 되고, column으로 배열된다.
- 요소들이 flex 항목이 되었고, flexbox가 그들 요소에 부여한 일부 초기값을 사용했기 때문이다. 그들이 행으로 표시된 이유는 `flex-direction`의 초기값이 `row`이기 때문이다.
- `align-items` 속성의 초기값 `stretch`에 다라 height는 가장 키가 큰 아이템의 높이로 연장된다.
- 아래는 flexbox 예시

```CSS
.wrapper {
  display: flex;
}
```

```html
<div class="wrapper">
  <div class="box1">하나</div>
  <div class="box2">둘</div>
  <div class="box3">셋</div>
</div>
```

- 자식 항목을 여유 공간에 맞춰 연장하거나 수축할 수 있다. `flex: 1`

```CSS
.wrapper {
    display: flex;
}

.wrapper > div {
    flex: 1;
}
```

### Grid Layout

- flex box는 일차원 레이아웃, grid layout은 이차원 레이아웃. 즉, 행과 열에 포함된 아이템을 배열한다.
- 여기 각기 1fr값이 지정된 3열과 100px이 지정된 2행을 정의했다.

```CSS
.wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 100px;
    grid-gap: 10px;
}
```

```html
<div class="wrapper">
  <div class="box1">하나</div>
  <div class="box2">둘</div>
  <div class="box3">셋</div>
  <div class="box4">넷</div>
  <div class="box5">다섯</div>
  <div class="box6">여섯</div>
</div>
```

- `grid-column`, `grid-row`를 사용해서 명시적으로 위치를 지정할 수 있다.

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-gap: 10px;
}

.box1 {
  grid-column: 2 / 4;
  grid-row: 1;
}

.box2 {
  grid-column: 1;
  grid-row: 1 / 3;
}

.box3 {
  grid-row: 2;
  grid-column: 3;
}
```

```html
<div class="wrapper">
  <div class="box1">하나</div>
  <div class="box2">둘</div>
  <div class="box3">셋</div>
</div>
```

### Floats

### 포지셔닝

### 테이블 레이아웃

### 다단 레이아웃

## Introduction to CSS layout

## Normal Flow

## Flexbox

## Grids

## Floats

## Positioning

## Multiple-column Layout

## Responsive design

## Beginner's guide to media queries

## Legacy Layout Methods

## Supporting Older Browsers

## Fundamental Layout Comprehension

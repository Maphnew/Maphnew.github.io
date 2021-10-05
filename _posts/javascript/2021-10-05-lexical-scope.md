---
title: "[Javascript] 렉시컬 스코프 Lexical scope"
date: 2021-10-05 13:37:00

categories:
  - Javascript
tags:
  - [Javascript, Lexical scope]

toc: true
toc_sticky: true
---

# 렉시컬 스코프
- 프로그래밍 언어는 일반적으로 두 가지 방식 중 한가지 방식으로 함수의 상위 스코프를 결정한다.
1. 함수를 어디서 호출했는지에 따라 함수의 상위 스코프를 결정한다.
2. 함수를 어디서 정의했는지에 따라 함수의 상위 스코프를 결정한다.

- 첫 번째 방식을 동적 스코프`dynamic scope`라 한다.
- 두 번째 방식을 렉시컬 스코프`lexical scope`라 한다. 함수 정의가 평가되는 시점에 상위 슼포르가 정적으로 결정된다. 자바스크립트를 비롯한 대부분의 프로그래밍 언어는 렉시컬 스코프를 따른다.
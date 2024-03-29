---
title: "[Book] Clean Code: 9 단위 테스트"
date: 2022-04-17 21:25:00
categories:
  - Book
tags:
  - [Book, "Clean Code"]

toc: true
toc_sticky: true
---

# 클린 코드

애자일 소프트웨어 장인 정신

<small>저자: 로버트 C. 마틴</small>

# 9. 단위 테스트

## TDD 법칙 세 가지

## 깨끗한 테스트 코드 유지하기

### 테스트는 유연성, 유지보수성, 재사용성을 제공한다

## 깨끗한 테스트 코드

### 도메인에 특화된 테스트 언어

### 이중 표준

## 테스트 당 assert 하나

### 테스트 당 개념 하나

## F.I.R.S.T

Fast 빠르게: 테스트는 빨리 돌아야 한다. 자주 돌릴 수 있도록.

Independent 독립적으로: 각 테스트가 서로 의존하면 안 된다.

Repeatable 반복 가능하게: 테스트는 어떤 환경에서도 반복 가능해야 한다. 실제 환경, QA환경, 버스에서(네트워크x) 노트북 환경에서도 실행할 수 있어야 한다.

Self-Validating 자가 검증하는: 테스트는 bool 값으로 결과를 내야 한다. 성공 아니면 실패다.

Timely 적시에: 테스트는 적시에 작성해야 한다. 단위 테스트는 테스트하려는 실제 코드를 구현하기 직전에 구현한다.

## 결론

테스트 코드는 실제 코드 만큼이나 프로젝트 건강에 중요하다. 테스트 코드는 실제 코드의 유연성, 유지보수성, 재사용성을 보존하고 강화하기 때문이다. 그러므로 테스트 코드는 지속적으로 깨끗하게 관리하자.

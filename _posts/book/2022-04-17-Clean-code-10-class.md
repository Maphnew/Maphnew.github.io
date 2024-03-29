---
title: "[Book] Clean Code: 10 클래스"
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

# 10. 클래스

자바 관례에 따르면 클래스를 정의할 때 아래의 순서로 나온다.

1. 변수 목록(정적 공개 상수 - 정적 비공개 변수 - 비공개 인스턴스 변수)
1. 공개 함수
1. 비공개 함수(자신 호출하는 공개 함수 직후)
   추상화 단계가 순차적으로 내려가서 신문 기사처럼 읽힌다.

## 클래스 체계

결합도를 최소로 줄이면 자연스럽게 또 다른 클래스 설계 원칙인 DIP`Dependency Inversion Principle`를 따르는 클래스가 나온다. 본질적으로 DIP는 클래스가 상세한 구현이 아니라 추상화에 의존해야 한다는 원칙이다.

### 캡슐화

캡슐화를 풀어주는 결정은 언제나 최후의 수단이다.

## 클래스는 작아야 한다!

함수와 마찬가지다.

클래스 이름은 해당 클래스 책임을 기술해야 한다. 작명은 클래스 크기를 줄이는 첫 번째 관문이다.

### 단일 책임 원칙

클래스나 모듈을 변경할 이유가 단 하나뿐이어야 한다는 원칙이다.

도구 상자를 어떻게 관리하고 싶은가? 작은 서랍을 많이 두고 기능과 이름이 명확한 컴포넌트를 나눠 넣고 싶은가? 아니면 큰 서랍 몇 개를 두고 모두를 던져 넣고 싶은가?

### 응집도Cohesion

클래스는 인스턴스 변수 수가 작아야 한다. 각 클래스 메서드는 클래스 인스턴스 변수를 하나 이상 사용해야 한다. 일반적으로 메서드가 변수를 더 많이 사용할수록 메서드와 클래스는 응집도가 더 높다.

때때로 몇몇 메서드만이 사용하는 인스턴스 변수가 아주 많아진다. 이는 십중팔구 새로운 클래스로 쪼개야 한다는 신호다. 응집도가 높아지도록 변수와 메서드를 적절히 분리해 새로운 클래스 두세 개로 쪼개준다.

### 응집도를 유지하면 작은 클래스 여럿이 나온다

큰 함수를 작은 함수 여럿으로 쪼개다 보면 종종 작은 클래스 여럿으로 쪼갤 기회가 생긴다. 그러면서 프로그램에 점점 더 체계가 잡히고 구조가 투명해진다.

## 변경하기 쉬운 클래스

OCP란 클래스는 확장에 개방적으고 수정에 폐쇄적이어야 한다는 원칙이다.

새 기능을 수정하거나 기존 기능을 변경할 때 건드릴 코드가 최소인 시스템 구조가 바람직하다.

이상적인 시스템이라면 새 기능을 추가할 때 시스템을 확장할 뿐 기존 코드를 변경하지 않는다.

### 변경으로부터 격리

테스트가 가능할 정도로 시스템의 결합도를 낮추면 유연성과 재사용성도 더욱 높아진다. 결합도가 낮다는 소리는 각 시스템 요소가 다른 요소로부터 그리고 변경으로부터 잘 격리되어 있다는 의미다. 시스템 요소가 서로 잘 격리되어 있으면 각 요소를 이해하기도 더 쉬워진다.

좀 더 차원 높은 단계까지 신경 써보자.

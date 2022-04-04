---
title: "[Book] Refactoring"
date: 2022-03-03 23:25:00
categories:
  - Book
tags:
  - [Book]

toc: true
toc_sticky: true
---

# 리팩터링

출처: 리팩터링 2판, 마틴 파울러

## 01 리팩터링: 첫 번째 예시

## 02 리팩터링 원칙

page 79 ~ 111

### 2.1 리팩터링 정의

- 리팩터링: [명사] 소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법

- 리팩터링(하다): [동사] 소프트웨어의 겉보기 동작은 그대로 유지한 채, 여러 가지 리팩터링 기법을 적용해서 소프트웨어를 재구성하다.

### 2.2 두 개의 모자

- 소프트웨어 개발할 때 목적이 '기능 추가'냐, 아니면 '리팩터링'이냐를 구분하는 것을 두 개의 모자`two hats`에 비유했다. 소프트웨어 개발하는 동안 두 모자를 바꿔 써 가며 작업한다.

### 2.3 리팩터링하는 이유

#### 리팩터링하면 소프트웨어 설계가 좋아진다

#### 리팩터링하면 소프트웨어를 이해하기 쉬워진다

#### 리팩터링하면 버그를 쉽게 찾을 수 있다

#### 리팩터링하면 프로그래밍 속도를 높일 수 있다

### 2.4 언제 리팩터링해야 할까?

#### 3의 법칙 - 돈 로버츠

1. 처음에는 그냥 한다.
2. 비슷한 일을 두 번째로 하게 되면(중복이 생겼다는 사실에 당황스럽겠지만), 일단 계속 진행한다.
3. 비슷한 일을 세 번째 하게 되면 리팩터링한다.

#### 준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기

#### 이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기

#### 쓰레기 줍기 리팩터링

#### 계획된 리팩터링과 수시로 하는 리팩터링

#### 오래 걸리는 리팩터링

#### 코드 리뷰에 리팩터링 활용하기

#### 관리자에게는 뭐라고 말해야 할까?

#### 리팩터링하지 말아야 할 때

내부 동작을 이해해야 할 시점에 리팩터링해야 효과를 제대로 볼 수 있다.

### 2.5 리팩터링 시 고려할 문제

#### 새 기능 개발 속도 저하

리팩터링의 궁극적인 목적은 개발 속도를 높여서, 더 적은 노력으로 더 많은 가치를 창출하는 것 이다.

#### 코드 소유권

코드 소유권이 나뉘어 있으면 리팩터링에 방해가 된다.

#### 브랜치

지속적 통합과 리팩터링을 합쳐서 익스트림 프로그래밍이라고 하는데, 두 기법의 궁합이 잘 맞다.

#### 테스팅

리팩터링 하기 위해서는 자가 테스트 코드를 마련해야 한다.

#### 레거시 코드

레거시 시스템을 파악할 때 리팩터링이 굉장히 도움된다.

#### 데이터베이스

### 2.6 리팩터링, 아키텍처, 애그니(YAGNI)

You aaren't going to need it

### 2.7 리팩터링과 소프트웨어 개발 프로세스

자가 테스트 코드와 리팩터링을 묶어서 테스트 주도 개발이라 한다.
리팩터링의 첫 번째 토대는 자가 테스트 코드다.

### 2.8 리팩터링과 성능

리팩터링은 성능 좋은 소프트웨어를 만드는 데 기여한다. 단기적으로 보면 리팩터링 단계에서는 성능이 느려질 수도 있다. 하지만 최적화 단계에서 코드를 튜닝하기 훨씬 쉬워지기 떄문에 결국 더 빠른 소프트웨어를 얻게 된다.

### 2.9 리팩터링의 유래

### 2.10 리팩터링 자동화

### 2.11 더 알고 싶다면

리팩터링 연습에 주력한 책: 윌리엄 웨이크가 쓴 '리팩터링 워크북'(인사이트, 2006)

소프트웨어 패턴 + 리팩터링: 패턴을 활용한 리팩터링, 조슈아 케리에프스키(인사이트, 2011)

리팩터링 데이터베이스

리팩터링 HTML

레거시 코드 활용 전략

Refactoring: Ruby Edition

## 03 코드에서 나는 악취

page 113~132

리팩터링을 언제 시작하고 언제 그만할지를 판단하는 일은 리팩터링의 작동 원리를 아는 것 못지않게 중요하다.

리팩터링이 필요한, 때로는 아주 절실한 코드들에 일정한 패턴이 있다. '냄새'라는 표현을 사용해서 이 코드들을 설명한다.

멈춰야 하는지를 판탄하는 정확한 기준을 제시하지는 않는다. 숙력된 사람의 직관이 정확하다.

### 3.1 기이한 이름 Mysterious Name

이름만 잘 지어도 나중에 문맥을 파악하느라 헤매는 시간을 크게 절약할 수 있다.
우리가 가장 많이 사용하는 리팩터링은 **함수 선언 바꾸기**, **변수 이름 바꾸기**, **필드 이름 바꾸기**처럼 이름을 바꾸는 리팩터링들이다.

### 3.2 중복 코드 Duplicated Code

똑같은 코드 구조가 여러 곳에서 반복된다면 하나로 통합하여 더 나은 프로그램을 만들 수 있다. 코드가 중복되면 각각을 볼 떄마다 서로 차이점은 없는지 주의 깊게 살펴봐야 하는 부담이 생긴다.

한 클래스에 딸린 두 메서드가 똑같은 표현식을 사용하는 경우 **함수 추출하기**를 써서 양쪽 모두 추출된 메서드를 호출하게 바꾸면 된다.

코드가 비슷하긴 한데 완전히 똑같지는 않다면, 먼저 **문장 슬라이드하기**로 비슷한 부분을 한 곳에 모아 함수 추출하기를 더 쉽게 적용할 수 있는지 살펴본다.

같은 부모로부터 파생된 서브 클래스들에 코드가 중복되어 있다면, 각자 따로 호출되지 않도록 **메서드 올리기**를 적용해 부모로 옮긴다.

### 3.3 긴 함수

짧은 함수로 구성된 코드를 이해하기 쉽게 만드는 가장 확실한 방법은 좋은 이름이다.
그러기 위해서는 훨씬 적극적으로 함수를 쪼개야 한다. 함수 이름에 코드의 목적을 드러내야 한다.

함수를 짧게 만드는 작업의 99%는 **함수 추출하기**가 차지한다.

함수가 매개변수와 임시 변수를 많이 사용한다면 **임시 변수를 질의 함수로 바꾸기**로 임시 변수의 수를, **매개변수 객체 만들기**와 **객체 통째로 넘기기**로는 매개변수의 수를 줄일 수 있을 것이다.

이 리팩터링들을 적용해도 여전히 임시 변수와 매개변수가 너무 많다면 더 큰 수술이라 할 수있는 **함수를 명령으로 바꾸기**를 고려해보자.

추출할 코드 덩어리를 찾아내는 한 가지 좋은 방법은 주석을 참고하는 것이다. 주석이 설명하는 코드와 함께 함수로 빼내고, 함수 이름은 주석 내용을 토대로 짓는다.

조건문은 **조건문 분해하기**로 대응한다.

거대한 `switch`문을 구성하는 `case`문마다 **함수 추출하기**를 적용해서 각 `case`의 본문을 함수 호출문 하나로 바꾼다. 같은 조건을 기준으로 나뉘는 `switch`문이 여러 개라면 **조건문을 다형성으로 바꾸기**를 적용한다.

반복문도 그 안의 코드와 함께 추출해서 독립된 함수로 만든다. 추출한 반복문 코드에 적합한 이름이 떠오르지 않는다면 성격이 다른 두 가지 작업이 섞여 있기 때문일 수 있다. 이럴 때는 과감히 **반복문 쪼개기**를 적용해서 작업을 분리한다.

### 3.4 긴 매개변수 목록

종종 다른 매개변수에서 값을 얻어올 수 있는 매개변수가 있을 수 있는데, 이런 매개변수는 **매개변수를 질의 함수로 바꾸기**로 제거할 수 있다.

사용 중인 데이터 구조에서 값들을 뽑아 각각을 별개의 매개변수로 전달하는 코드라면 **객체 통쨰로 넘기기**를 적용해서 원본 데이터 구조를 그대로 전달한다.

항상 함께 전달되는 매개변수들은 **매개변수 객체 만들기**로 하나로 묶어버린다.

함수의 동작 방식을 정하는 플래그 역할의 매개변수는 **플래그 인수 제거하기**로 없애준다.

클래스는 매개변수 목록을 줄이는 데 효과적인 수단이다.여러 개의 함수가 특정 매개변수들의 값을 공통으로 사용할 때 유용하다. 이럴 때는 **여러 함수를 클래스로 묶기**를 이용하여 공통 값들을 클래스의 필드로 정의한다. 함수형 프로그래밍이었다면 일련의 부분 적용 함수`partially applied function`들을 생성한다고 말했을 것이다.

### 3.5 전역 데이터

전역 데이터는 이를 함부로 사용한 프로그래머들에게 벌을 주는 지옥 4층에 사는 악마들이 만들었다는 말이 돌 정도였다.

다른 코드에서 오염시킬 가능성이 있는 데이터를 발견할 떄마다 **변수 캡슐화하기** 기법을 먼저 적용한다.

### 3.6 가변 데이터 Mutable Data

**변수 캡슐화하기**를 적용하여 정해놓은 함수를 거쳐야만 값을 수정할 수 있도록 하면 값이 어떻게 수정되는지 감시하거나 코드를 개선하기 쉽다.

하나의 변수에 용도가 다른 값들을 저장하느라 값을 갱신하는 경우라면 **변수 쪼개기**를 이용하여 용도별로 독립 변수에 저장하게 하여 값 갱신이 문제를 일으킬 여지를 없앤다.

갱신 로직은 다른 코드와 떨어뜨려 놓는 것이 좋다. 그러기 위해 **문장 슬라이드하기**와 **함수 추출하기**를 이용해서 무언가를 갱신하는 코드로부터 부작용이 없는 코드를 분리한다.

API를 만들 때는 **질의 함수와 변경 함수 분리하기**를 활용해서 꼭 필요한 경우가 아니라면 부작용이 이는 코드를 호출할 수 없게 한다.

우리는 가능한 한 **세터 제거하기**도 적용한다.

**여러 함수를 클래스로 묶기**나 **여러 함수를 변환 함수로 묶기**를 활용해서 변수를 갱신하는 코드들의 유효범위를 (클래스나 변환`transform`) 제한한다.

구조체처럼 내부 필드에 데이터를 담고 있는 변수라면, 일반적으로 **참조를 값으로 바꾸기**를 적용하여, 내부 필드를 직접 수정하지 말고 구조체를 통째로 교체하는 편이 낫다.

### 3.7 뒤엉킨 변경 Divergent Change

코드를 수정할 때 시스템에서 고쳐야 할 딱 한 군데를 찾아서 그 부분만 수정할 수 있기를 바라지만 그렇게 할 수 없다면 (서로 밀접한 악취인) 뒤엉킨 변경과 산탄총 수술 중 하나가 풍긴다.

뒤엉킨 변경은 단일 책임 원칙이 제대로 지켜지지 않을 때 나타난다. 즉, 하나의 모듈이 서로 다른 이유들로 인해 여러 가지 방식으로 변경되는 일이 많을 때 발생한다.

### 3.8 산탄총 수술 Shotgun Surgery

이 냄새는 코드를 변경할 때마다 자잘하게 수정해야 하는 클래스가 많을 때 풍긴다.

이럴 때는 함께 변경되는 대상들을 **함수 옮기기**와 **필드 옮기기**로 모두 한 모듈에 묶어두면 좋다.

비슷한 데이터를 다루는 함수가 많다면 **여러 함수를 클래스로 묶기**를 적용한다.

데이터 구조를 변환하거나 보강`enrich`하는 함수들에는 **여러 함수를 변환 함수로 묶기**를 적용한다. 이렇게 묶은 함수들의 출력 결과를 묶어서 다음 단계의 로직으로 전달할 수 있다면 **단계 쪼개기**를 적용한다.

어설프게 분리된 로직을 **함수 인라인하기**나 **클래스 인라인하기** 같은 인라인 리팩터링으로 하나로 합치는 것도 산탄총 수술에 대처하는 좋은 방법이다.

### 3.9 기능 편애 Feature Envy

기능 편애는 흔히 어떤 함수가 자기가 속한 모듈의 함수나 데이터보다 다른 모듈의 함수나 데이터와 상호작용할 일이 많을 때 풍기는 냄새다.

### 3.10 데이터 뭉치 Data Clumps

몰려다니는 데이터 뭉치는 보금자리를 따로 마련해줘야 마땅하다.

가장 먼저 필드 형태의 데이터 뭉치를 찾아서 **클래스 추출하기**로 하나의 객체로 묶는다.

메서드 시그니처에 있는 데이터 뭉치는 **매개 변수 객체 만들기**나 **객체 통째로 넘기기**를 적용해서 매개변수 수를 줄여본다. 그 즉시 메서드 호출 코드가 간결해질 것이다.

### 3.11 기본형 집착 Primitive Obsession

**기본형을 객체로 바꾸기**를 적용하면 기본형만이 거주하는 구석기 동굴을 의미 있는 자료형들이 사는 최신 온돌식 코드로 탈바꿈시킬 수 있다.ais-body
기본형으로 표현된 코드가 조건부 동작을 제어하는 타입 코드`type code`로 쓰였다면 **타입 코드를 서브클래스로 바꾸기**와 **조건부 로직을 다형성으로 바꾸기**를 차례로 적용한다.

기본형 그룹 데이터 뭉치도 **클래스 추출하기**와 **매개변수 객체 만들기**를 이용하여 반드시 문명사회로 이끌어줘야 한다.

### 3.12 반복되는 switch문 Repeated Switches

중복된 switch문이 문제가 되는 이유는 조건절을 하나 추가할 때마다 다른 switch문들도 모두 찾아서 함께 수정해야 하기 때문이다. 이럴 때 다형성은 반복된 switch문이 내뿜는 사악한 기운을 제압하여 코드베이스를 최신 스타일로 바꿔주는 세련된 무기인 셈이다.

### 3.13 반복문 Loops

**반복문을 파이프라인으로 바꾸기**를 적용해서 시대에 걸맞지 않은 반복문을 제거할 수 있다.

### 3.14 성의 없는 요소 Lazy Element

**함수 인라인하기**나 **클래스 인라인하기**로 요소들을 처리한다. 상속을 사용했다면 **계층 합치기**를 적용한다.

### 3.15 추측성 일반화 Speculative Generality

나중에 필요할 거라는 생각으로 이해하거나 관리하기 어려워진 코드는 눈앞에서 치워버리자.

하는 일이 없는 추상 클래스는 **계층 합치기**로 제거한다.

쓸데없이 위임하는 코드는 **함수 인라인하기**나 **클래스 인라인하기**로 삭제한다.

본문에서 사용되지 않는 매개변수는 **함수 선언 바꾸기**로 없앤다.

테스트 코드 말고는 사용하는 곳이 없는 함수나 클래스는 **죽은 코드 제거하기**로 날려버리자.

### 3.16 임시 필드 Temporary Field

쓰이지 않는 필드를 가진 클래스도 있다. **클래스 추출하기**로 제 살 곳을 찾아준다. 그런 다음 **함수 옮기기**로 임시 필드들과 관련된 코드를 모조리 새 클래스에 몰아넣는다. 또한, 임시 필드들이 유효한지를 확인한 후 동작하는 조건부 로직이 있을 수 있는데, **특이 케이스 추가하기**로 필드들이 유효하지 않을 때를 위한 대안 클래스를 만들어서 제거할 수 있다.

### 3.17 메시지 체인 Message Chains

클라이언트가 한 객체를 통해 다른 객체를 얻은 뒤 방금 얻은 객체에 또 다른 객체를 요청하는 식으로, 다른 객체를 요청하는 작업이 연쇄적으로 이어지는 코드를 말한다.

이 문제는 **위임 숨기기**로 해결한다. 이 리팩터링은 메시지 체인의 다양한 연결점에 적용할 수 있다.

### 3.18 중개자 Middle Man

객체의 대표적인 기능 하나로, 외부로부터 세부사항을 숨겨주는 캡슐화`encapsulation`가 있다. 캡슐화하는 과정에서는 위임`delegation`이 자주 활용된다.

클래스가 제공하는 메서드 중 절반이 다른 클래스에 구현을 위임하고 있다면 어떤가? 이럴 때는 **중개자 제거하기**를 활용하여 실제로 일을 하는 객체와 직접 소통하게 하자.

### 3.19 내부자 거래 Insider Trading

은밀히 데이터를 주고받는 모듈들이 있다면 **함수 옮기기**와 **필드 옮기기** 기법으로 떼어 놓아서 사적으로 처리하는 부분을 줄인다.

여러 모듈이 같은 관심사를 공유한다면 공통 부분을 정식으로 처리하는 제3의 모듈을 새로 만들거나 **위임 숨기기**를 이용하여 다른 모듈이 중간자 역할을 하게 만든다.

부모 클래스를 자식 클래스가 떠나야 할 때가 온다면 **서브 클래스를 위임으로 바꾸기**나 **슈퍼클래스를 위임으로 바꾸기**를 활용하자.

### 3.20 거대한 클래스 Large Class

클래스에 필드가 너무 많으면 **클래스 추출하기**로 필드들 일부를 따로 묶는다.

분리할 컴포넌트를 원래 클래스와 상속 관계로 만드는 게 좋다면 (클래스 추출하기보다는) **수퍼클래스 추출하기**나 (실질적으로 서브클래스 추출하기에 해당하는) **타입코드를 서브클래스로 바꾸기**를 적용하는 편이 더 쉬울 것이다.

### 3.21 서로 다른 인터페이스의 대안 클래스들 Alternative Classes with Different Interfaces

클래스를 사용할 때 필요에 따라 다른 클래스로 교체할 수 있다. 단, 교체하려면 인터페이스가 같아야 한다. 따라서 **함수 선언 바꾸기**로 메서드 시그니처를 일치시킨다. 이것만으로 부족하면 **함수 옮기기**를 이용하여 인터페이스가 같아질 때까지 필요한 동작들을 클래스 안으로 밀어 넣는다. 그러다 대안 클래스들 사이에 중복 코드가 생기면 **슈퍼클래스 추출하기**를 적용할지 고려해본다.

### 3.22 데이터 클래스 Data Class

데이터 저장 용도로만 쓰이는 클래스에 public 필드가 있다면 **레코드 캡슐화하기**로 숨기자. 변경하면 안되는 필드는 **세터 제거하기**롤 접근을 원천 봉쇄한다.

다른 클래스에서 데이터 클래스의 게터나 세터를 사용하는 메서드를 찾아서 **함수 옮기기**로 그 메서드를 뎅터 클래스로 옮길 수 있는지 살펴보자. 메서드를 통째로 옮기기 어렵다면 **함수 추출하기**를 이용해서 옮길 수 있는 부분만 별도 메서드로 뽑아낸다.

### 3.23 상속 포기 Refused Bequest

부모의 유산 중 관심 있는 몇 개만 받을 때, 먼저 같은 계층에 서브클래스를 하나 새로 만들고, **메서드 내리기**와 **필드 내리기**를 활용해서 물려받지 않을 부모 코드를 모조리 새로 만든 서브 클래스로 넘긴다. 그러면 부모에는 공통된 부분만 남는다.

### 3.24 주석 Comments

주석을 남겨야겠다는 생각이 들면, 가장 먼저 주석이 필요 없는 코드로 리팩터링해본다.

## 04 테스트 구축하기

리팩터링을 제대로 하려면 불가피하게 저지르는 실수를 잡아주는 견고한 테스트 스위트`test suite`가 뒷받침돼야 한다.

리팩터링을 하지 않더라도 좋은 테스트를 작성하는 일은 개발 효율을 높여준다.

### 4.1 자가 테스트 코드의 가치

> 모든 테스트를 완전히 자동화하고 그 결과까지 스스로 검사하게 만들자.

자가 테스트 코드 자체뿐 아니라 테스트를 자주 수행하는 습관도 버그를 찾는 강력한 도구가 된다.

> 테스트 스위트는 강력한 버그 검출 도구로, 버그를 찾는 데 걸리는 시간을 대폭 줄여준다.

회귀 버그`regression bug`: 잘 작동하던 기능에서 문제가 생기는 현상
회귀 테스트`regression test`: 잘 작동하던 기능이 여전히 잘 작동하는지 확인하는 테스트

테스트를 작성하기 가장 좋은 시점은 프로그래밍을 시작하기 전이다.
기능을 추가해야 할 때 테스트부터 작성한다.
구현보다 인터페이스에 집중하게 된다는 장점도 있다.
게다가 코딩이 완료되는 시점을 정확하게 판단할 수 있다.
테스트를 모두 통과한 시점이 바로 코드를 완성한 시점이다.

### 4.2 테스트할 샘플 코드

사용자가 생산 계획을 검토하고 수정하도록 해주는 간단한 애플리케이션의 일부다.

생산 계획은 각 지역`province`의 수요`demand`와 가격`price`으로 구성된다.

지역에 위치한 생산자`producer`들은 각기 제품을 특정 가격으로 특정 수량만큼 생산할 수 있다.

UI는 생산자별로 제품을 모두 판매했을 때 얻을 수 있는 수익`full revenue`도 보여준다.

화면 맨 아래에는 생산 부족분`shorfall`과 현재 계획에서 거둘 수 있는 총수익`profit`도 보여준다.

사용자는 UI에서 수요, 가격, 생산자별 생산량`production`과 비용`cost`를 조정해가며, 그에 따른 생산 부족분과 총수익을 확인할 수 있다.

비즈니스 로직 코드는 클래스 두 개로 구성된다. 하나는 생산자를 표현하는 Producer이고, 다른 하나는 지역 전체를 표현하는 Province다. Province의 생성자는 JSON 문서로부터 만들어진 자바스크립트 객체를 인수로 받는다.

### 4.3 첫 번째 테스트

먼저 테스트 프레임워크를 마련해야 한다.

여기서는 모카`Mocah`를 사용한다.

다음은 생산 부족분을 제대로 계산하는지 확인하는 테스트다.

```js
describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvince()); // 1. fixture 설정
    assert.equal(asia.shortfall, 5); // 2. 검증
  });
});
```

1. 테스트에 필요한 데이터와 객체를 뜻하는 픽스쳐`fixture, 고정장치`를 설정한다. 이 예시에서는 샘플 지역 정보로부터 생성한 Province 객체를 픽스처로 설정했다.
2. 픽스처 속성들을 검증하는데, 여기서는 주어진 초깃값에 기초하여 생산 부족분을 정확히 계산했는지 확인한다.

결과

```
1 passing (51ms)
```

> 실패해야 할 상황에서는 반드시 실패하게 만들자.

테스트가 실패하는지 확인할 필요가 있다. 이를 위해 일시적으로 코드에 오류를 주입한다.

```js
get shortfall() {
  return this._demand - this.totalProduction * 2; // <-- 오류 주입
}
```

결과

```
!

0 passing(72ms)
1 failing

1) province shortfall:
AssertinError: expected -20 to equal 5
at Context.<anonymous> (src/test.js:10:12)
```

> 자주 테스트하라. 작성 중인 코드는 최소한 몇 분 간격으로 테스트하고, 적어도 하루에 한 번은 전체 테스트를 돌려보자.

### 4.4 테스트 추가하기

page 143

테스트는 위험 요인을 중심으로 작성해야 한다. 테스트의 목적은 어디까지나 현재 혹은 향후에 발생하는 버그를 찾는 데 있다.

> 완벽하게 만드느라 테스트를 수행하지 못하느니, 불완전한 테스트라도 작성해 실행하는 게 낫다.

총 수익이 제대로 계산되는지 간단히 검사하도록 작성해보자.

```js
describe('province', function() {
  it('short', function() {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equal(5);
  })

  if('profit', function() {
    const asia = new Province(sampleProvinceData());
    expect(asia.profit).equal(230);
  })
})
```

먼저 기댓값 자리에 임의의 값을 넣고 테스트를 수행한 다음, 프로그램이 내놓는 실제 값(230)으로 대체했다. 그리고 테스트가 제대로 작동한다고 확인되면, 총수익 계산 로직에 \* 2를 덧 붙여서 잘못된 값이 나오도록 수정한다. 일부러 주입한 이 오류를 테스트가 걸러내는 게 확인되면, 원래 코드로 되돌린다. 이 패턴은 기존 코드를 검사하는 테스트를 추가할 때 흔히 쓰는 방식이다.

작성 된 두 테스트에 겹치는 부분이 있다. 중복을 제거해보자. 먼저 바깥 범위로 끌어내는 방법을 시도해보자.

```js
describe('province', function() {
  const asia = new Province(sampleProvinceData()); // 이렇게 하면 안된다.
  it('short', function() {
    expect(asia.shortfall).equal(5);
  })

  if('profit', function() {
    expect(asia.profit).equal(230);
  })
})
```

이렇게 하면 테스트 관련 버그 중 가장 지저분한 유형인 '테스트끼리 상호작용하게 하는 공유 픽스처'를 생성하는 원인이 된다.

자바스크립트에서 const 키워드는 asia 객체의 '내용'이 아니라 asia를 가리키는 참조가 상수임을 뜻한다. 나중에 다른 테스튼에서 이 공유 객체의 값을 수정하면 이 픽스처를 사용하는 또 다른 테스트가 실패할 수 있다. 즉, 테스트를 실행하는 순서에 따라 결과가 달라질 수 있다.

그래서 다음 방식이 선호된다.

```js
describe("province", function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });
  it("shortfall", function () {
    expect(asia.shorfall).equal(5);
  });
  it("profit", function () {
    expect(asia.profit).equal(230);
  });
});
```

beforeEach 구문은 각각의 테스트 바로 저에 실행되어 asia를 초기화하기 때문에 모든 테스트가 자신만의 새로운 asia를 사용하게 된다.

beforeEach 블록의 등장은 표준 픽스처를 사용한다는 사실을 알려준다. 그러면 코드를 읽는 이들은 해당 describe 블록 안의 모든 테스트가 똑같은 기준 데이터로부터 시작한다는 사실을 쉽게 알 수 있다.

### 4.5 픽스처 수정하기

픽스처 수정 대부분은 세터에서 이뤄지는데, 세터는 보통 아주 단순하여 버그가 생길 일도 별로 없으니 잘 테스트하지 않는다. 하지만 Producer 의 production() 세터는 좀 복잡한 동작을 수행하기 때문에 테스트해볼 필요가 있다.

```js
describe("province", function () {
  // ...
  it("change production", function () {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });
});
```

beforeEach 블록에서 '설정'한 표준 픽스처를 취해서, 테스트를 '수행'하고, 이 픽스처가 일을 기대한 대로 처리했는지를 '검증'한다.

이 패턴을 설정-실행-검증`setup-exercise-verify`, 조건-발생-결과`given-when-then`, 준비-수행-단언`arrange-act-assert`등으로 부른다.

해체 혹은 청소라고 하는 네 번째 단계도 있는데 명시적으로 언급하지 않을 때가 많다. 해체 단계에서는 픽스처를 제거하여 테스트들이 서로 영향을 주지 못하게 막는다.

이 테스트는 it 구문 하나에서 두 가지 속성을 검증하고 있다. 일반적으로 it 구문 하나당 검증도 하나씩만 하는 게 좋다. 앞쪽 검증을 통과하지 못하면 나머지 검증은 실행해보지 못하고 테스트가 실패하게 되는데, 그러면 실패의 원인을 파악하는 데 유용한 정보를 놓치기 쉽게 때문이다.

### 4.6 경계 조건 검사하기

범위를 벗어나는 경계 지점에서 문제가 생기면 어떤 일이 벌어지는지 확인하는 테스트도 함께 작성하면 좋다.

```js
describe("no producers", function () {
  // 생산자가 없다.
  let noProducers;
  beforeEach(function () {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });
  it("shortfall", function () {
    expect(noProducers.shortfall).equal(30);
  });
  it("profit", function () {
    expect(noProducers.profit).equal(0);
  });
});
```

숫자형이라면 0일 때를 검사해본다.

```js
describe("no producers", function () {
  // ...

  it("zero demand", function () {
    // 수요가 없다.
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });
});
```

음수도 넣어보면 좋다.

```js
describe("no producers", function () {
  // ...

  it("negative demand", function () {
    // 수요가 마이너스다.
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });
});
```

수요의 최솟값은 0이어야 한다는 생각을 할 수 있다. 그리고 예외 처리를 해야 된다.

> 문제가 생길 가능성이 있는 경계 조건을 생각해보고 그 부분을 집중적으로 테스트하자.

이 프로그램의 세터들은 의미상 숫자만 입력받아야 하지만 UI로부터 문자열을 취하고 있다.

```js
describe("province", function () {
  // ...

  it("empty string demand", function () {
    // 수요 입력란이 비어 있다.
    asia.demand = "";
    expect(asia.shortfall).Nan;
    expect(asia.profit).Nan;
  });
});
```

의식적으로 프로그램을 망가뜨리는 방법을 모색하는데, 이런 마음 자세가 생산성과 재미를 끌어올려준다. 내 마음 속에 잠재하는 사악한 욕구를 충족시켜주기 때문인 것 같다.

```js
describe("string for producers", function () {
  // 생산자 수 필드에 문자열을 대입한다.
  // ...

  it("", function () {
    const data = {
      name: "String producers",
      producers: "",
      demand: 30,
      price: 20,
    };
    const prov = new Province(data);
    expect(prov.shortfall).equal(0);
  });
});
```

이 테스트는 TypeError 오류, 실패로 처리한다.

이런 오류로 인해 프로그램 내부에 잘못된 데이터가 흘러서 디버깅하기 어려운 문제가 발생한다면 어서션 추가하기를 적요앻서 오류가 최대한 빨리 드러나게 하자. 어서션도 일종의 테스트로 볼 수 있으니 테스트 코드를 따로 작성할 필요는 없다.

> 어차피 모든 버그를 잡아낼 수는 없다고 생각하여 테스트를 작성하지 않는다면 대다수의 버그를 잡을 수 있는 기회를 날리는 셈이다.

테스트는 위험한 부분에 집중하느 게 좋다. 처리 과정이 복잡한 부분, 오류가 생길만한 부분을 찾아보자.

### 4.7 끝나지 않은 여정

이 장에서 보여준 테스트는 단위 테스트에 해당한다. 단위 테스트는 자가 테스트 코드의 핵심이다.

> 버그 리포트를 받으면 가장 먼저 그 버그를 드러내는 단위 테스트부터 작성하자.

테스트 커버리지 분석은 코드에서 테스트하지 않은 영역을 찾는 데만 도움될 뿐, 테스트 스위트의 품질과는 크게 상관 없다.

## 05 리팩터링 카탈로그 보는 법

page 153

카탈로그 6~12장에는 여러 가지 리팩터링 기법을 하나씩 소개한다.

### 5.1 리팩터링 설명 형식

- 이름
- 개요
- 배경
- 절차
- 예시

### 5.2 리팩터링 기법 선정 기준

- 가장 유용한 것들

## 06 기본적인 리팩터링

### 6.1 함수 추출하기

Extraction Function

- 반대 리팩터링: 함수 인라인하기
- 1판에서의 이름: 메서드 추출

```js
// before
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();

  // 세부사항 출력
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
}
```

```js
// after
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);

  function printDetails(outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
  }
}
```

#### 배경

함수 추출하기는 코드 조각을 찾아 무슨 일을 하는지 파악한 다음, 독립된 함수로 추출하고 목적에 맞는 이름을 붙인다.

#### 절차

1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다('어떻게'가 아닌 '무엇을' 하는지가 드러나야 한다).
2. 추출할 코드를 원본 함수에서 복사하여 새 함수를 붙여넣는다.
3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. 있다면 매개변수로 전달한다.
4. 변수를 다 처리했다면 컴파일한다.
5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문자으로 바꾼다(즉, 추출한 함수로 일을 위임한다).
6. 테스트한다.
7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토한다(인라인 코드를 함수 호출로 바꾸기).

#### 예시: 유효범위를 벗어나는 변수가 없을 때

```js
function printOwing(invoice) {
  let outstanding = 0;

  console.log("******************");
  console.log("**** 고객 채무 ****");
  console.log("******************");

  // 미해결 채무(outstanding)를 계산한다.
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  // 세부 사항을 출력한다.
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
}
```

#### 예시: 지역 변수를 사용할 때

```js
function printOwing(invoice) {
  let outstanding = 0;

  printBanner();

  // 미해결 채무(outstanding)를 계산한다.
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  // 세부 사항을 출력한다.
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
}
```

#### 예시: 지역 변수의 값을 변경할 때

```js
function printOwing(invoice) {
  let outstanding = 0;

  printBanner();

  // 미해결 채무(outstanding)를 계산한다.
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
```

#### 결과

```js
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);

  function calculateOutstanding(invoice) {
    let result = 0;
    for (const o of invoice.orders) {
      result += o.amount;
    }
    return result;
  }
}
```

### 6.2 함수 인라인하기

Inline Function

- 반대 리팩터링: 함수 추출하기
- 1판에서의 이름: 메서드 내용 직접 삽입

```js
// before
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}
```

```js
// after
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

#### 배경

함수 본문이 이름만큼 명확한 경우, 함수 본문 코드를 이름만큼 깔끔하게 리팩터링할 때는 그 함수를 제거한다.
쓸데없는 간접 호출은 거슬릴 뿐이다.

#### 절차

1. 다형 메서드인지 확인한다.
2. 인라인할 함수를 호출하는 곳을 모두 찾는다.
3. 각 호출문을 함수 본문으로 교체한다.
4. 하나씩 교체할 때마다 테스트한다.
5. 함수 정의(원래 함수)를 삭제한다.

#### 예시

```js
function rating(aDriver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(aDriver) {
  return aDriver.numberOfLateDeliveries > 5;
}
```

### 6.3 변수 추출하기

Extract Variable

page 173

- 반대 리팩터링: 변수 인라인하기
- 1판에서의 이름: 직관적 임시변수 사용

```js
// before
return (
  order.quantity * order.itemPrice -
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
  Math.min(order.quantity * order.itemPrice * 0.1, 100)
);
```

```js
// after
const basePrice = order.quantity * order.itemPrice;
const quantityDiscount =
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);
return basePrice - quantityDiscount + shipping;
```

#### 배경

표현식이 복잡해서 이해하기 어려울 때 지역 변수를 활용하면 표현식을 쪼개 관리하기 더 쉽게 만들 수 있다. 디버깅에도 도움이 된다.

#### 절차

1. 추출하려는 표현식에 부작용은 없는지 확인한다.
2. 불변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본을 대입한다.
3. 원본 표현식을 새로 만든 변수로 교체한다.
4. 테스트한다.
5. 표현식을 여러 곳에서 사용한다면 각각ㅁ을 새로 만든 변수로 교체한다. 하나 교체할 때마다 테스트 한다.

### 6.4 변수 인라인하기

Inline Variable

- 반대 리팩터링: 변수 추출하기
- 1판에서의 이름: 임시변수 내용 직접 삽입

```js
// before
let basePrice = anOrder.basePrice;
return basePrice > 1000;
```

```js
// after
return anOrder.basePrice > 1000;
```

#### 배경

변수 이름이 원래 표현식과 다를 바 없을 때 그 변수를 인라인하는 것이 좋다.

#### 절차

1. 대입문의 우변(표현식)에서 부작용이 생기지는 않는지 확인한다.
2. 변수가 불변으로 선언되지 않았다면 불변으로 만든 후 테스트한다. -> 이렇게 하면 변수에 값이 단 한 번만 대입되는지 확인할 수 있다.
3. 이 변수를 가장 처음 사용하는 코드를 찾아서 대입문의 우변의 코드로 바꾼다.
4. 테스트한다.
5. 변수를 사용하는 부분을 모두 교체할 때까지 이 과정을 반복한다.
6. 변수 선언문과 대입문을 지운다.
7. 테스트한다.

### 6.5 함수 선언 바꾸기

Change Function Declaration

```js
// before
function circum(radius) {...}
```

```js
/// after
function circumference(radius) {...}
```

#### 배경

시스템의 구성 요소를 조립하는 여결부 역할을 하는 함수가 있다.
이러한 연결부에서 가장 중요한 요소는 함수의 이름이다.

> 좋은 이름을 떠올리는 데 효과적인 방법은 주석을 이용해 함수의 목적을 설명해보는 것이다. 그러다 보면 주석이 멋진 이름으로 바뀌어 되돌아올 때가 있다.

함수의 매개변수도 마찬가지다. 함수가 외부 세계에 어우러지는 방식을 정의한다.

#### 절차

##### 간단한 절차

1. 매개변수를 제거하려거든 먼저 함수 본문에서 제거 대상 매개변수를 참조하는 곳은 없는지 확인한다.
2. 메서드 선언을 원하는 형태로 바꾼다.
3. 기존 메서드 선언을 참조하는 부분을 모두 찾아서 바뀐 형태로 수정한다.
4. 테스트한다.

##### 마이그레이션 절차

1. 이어지는 추출 단계를 수월하게 만들어야 한다면 함수의 본문을 적절히 리팩터링한다.
2. 함수 본문을 새로운 함수로 추출한다.
3. 추출한 함수에 매개변수를 추가해야 한다면 '간단한 절차'를 따라 추가한다.
4. 테스트한다.
5. 기존 함수를 인라인한다.
6. 이름을 임시로 붙여뒀다면 함수 선언 바꾸기를 한 번 더 적용해서 원래 이름으로 되돌린다.
7. 테스트한다.

### 6.6 변수 캡슐화하기

Encapsulate Variable

- 1판에서의 이름: 필드 자체 캡슐화, 필드 캡슐화

```js
// before
let defaultOwner = { firstName: "마틴", lastName: "파울러" };
```

```js
// after
let defaultOwnerData = { firstName: "마틴", lastName: "파울러" };
export function defaultOwner() {
  return defaultOwnerData;
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}
```

#### 배경

데이터는 함수보다 다루기가 까다롭다. 유효범위가 넓어질수록 다루기 어려워진다. 전역 데이터가 골칫거리다.

접근할 수 있는 범위가 넓은 데이터를 옮길 때는 먼저 그 데이터로의 접근을 독점하는 함수를 만드는 식으로 캡슐화하는 것이 가장 좋은 방법일 때가 많다. 데이터 재구성이라는 작업을 함수 재구성이라는 더 단순한 작업으로 변환하는 것이다.

데이터를 변경하고 사용하는 코드를 감시할 수 있는 확실한 통로가 되어준다.

#### 절차

1. 변수로의 접근과 갱신을 전담하는 캡슐화 함수들을 만든다.
2. 정적 검사를 수행한다.
3. 변수를 직접 참조하던 부분을 모두 적절한 캡슐화 함수 호출로 바꾼다. 하나씩 바꿀 떄마다 테스트한다.
4. 변수의 접근 범위를 제한한다.
5. 테스트한다.
6. 변수 값이 레코드라면 레코드 캡슐화하기를 적용할지 고려해본다.

### 6.7 변수 이름 바꾸기

Rename Variable

page 194

```js
// before
let a = height * width;
```

```js
// after
let area = height * width;
```

#### 배경

명확한 프로그래밍의 핵심은 이름짓기다.

#### 절차

1. 폭넓게 쓰이는 변수라면 변수 캡슐화하기를 고려한다.
2. 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서, 하나씩 변경한다.
3. 테스트한다.

#### 예시

- 가장 간단한 예는 유효범위가 함수 하나로 국한된 변수이다.

```js
let tpHd = "untitled";
```

```js
result += `<h1>${tpHd}</h1>`;
```

```js
tpHd = obj["articleTitle"];
```

1. 변수 캡슐화하기

```js
result += `<h1>${title()}</h1>`;

setTitle(obj["articleTitle"]);

function title() {
  return tpHd;
}
function setTitle(arg) {
  tpHd = arg;
}
```

캡슐화 후 변수 이름 바꿔도 된다.

```js
let _title = "untitled";

function title() {
  return _title;
}
function setTitle(arg) {
  _title = arg;
}
```

#### 예시: 상수 이름 바꾸기

```js
const cpyNm = "애크미 구스베리";
```

```js
const companyName = "애크미 구스베리";
const cpyNam = companyName;
```

### 6.8 매개변수 객체 만들기

Introduce Parameter Object

```js
// before
function amountInvoiced(startDate, endDate) {...};
function amountReceived(startDate, endDate) {...};
function amountOverdue(startDate, endDate) {...};
```

```js
// after
function amountInvoiced(aDateRange) {...};
function amountReceived(aDateRange) {...};
function amountOverdue(aDateRange) {...};
```

#### 배경

데이터 항목 여러 개가 몰려다닐 때 데이터 구조 하나로 모아준다.

#### 절차

1. 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만든다.
2. 테스트한다.
3. 함수 선언 바꾸기로 새 데이터 구조를 매개변수로 추가한다.
4. 테스트한다.
5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정한다. 하나씩 수정할 때마다 테스트한다.
6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
7. 다 바꿨다면 기존 매개변수를 제거하고 테스트한다.

### 6.9 여러 함수를 클래스로 묶기

Combine Functions into Class

page 202

```js
// before
function base(aReading) {...}
function taxableCharge(aReading) {...}
function calculateBaseCharge(aReading) {...}
```

```js
// after
class Reading {
  base() {...}
  taxableCharge() {...}
  calculateBaseCharge() {...}
}
```

#### 배경

클래스는 객체 지향 언어의 기본인 동시에 다른 패러다임 언어에도 유용하다.

흔히 함수 호출 시 인수로 전달되는 공통 데이터를 중심으로 긴밀하게 엮여 작동하는 함수 무리를 발견하면 클래스 하나로 묶고 싶어진다. 클래스로 묶으면 이 함수들이 공유하는 공통 환경을 더 명확하게 표현할 수 있고, 각 함수에 전달되는 인수를 줄여서 객체 안에서의 함수 호출을 간결하게 만들 수 있다. 또한 이런 객체를 시스템의 다른 부분에 전달하기 위한 참조를 제공할 수 있다.

#### 절차

1. 함수들이 공유하는 공통 데이터 레코드를 캡슐화한다.
2. 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다.
3. 데이터를 조작하는 로직들을 함수로 추출해서 새 클래스로 옮긴다.

### 6.10 여러 함수를 변환 함수로 묶기

Combine Functions into Transform

```js
// before
function base(aReading) {...}
function taxableCharge(aReading) {...}
```

```js
// after
function enrichReading(argReading) {
  const aReading = _.cloneDeep(argReading);
  aReading.baseCharge = base(aReading);
  aReading.taxableCharge = taxableCharge(aReading);
  return aReading;
}
```

#### 배경

데이터를 입력받아 도출된 정보가 사용되는 로직이 반복된다. 여러 곳에서 이런 도출 작업을 한데로 모다우면 검색과 갱신을 일관된 장소에서 처리할 수 있고 로직 중복도 막을 수 있다.

#### 절차

1. 변환할 레코드를 입력받아서 값을 그대로 반환하는 변환 함수를 만든다.
2. 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환 함수로 옮기고, 처리 결과를 레코드에서 새 필드로 기록한다. 그런 다음 클라이언트 코드가 이 필드를 사용하도록 수정한다.
3. 테스트한다.
4. 나머지 관련 함수도 위 과정에 따라 처리한다.

### 6.11 단계 쪼개기

Split Phase

```js
// before
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;
```

```js
// after
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
  const values = aString.split(/\s+/);
  return {
    productID: values[0].split("-")[1],
    quantity: parseInt(calues[1]),
  };
}

function price(order, priceList) {
  return order.quantity * priceList[order.productID];
}
```

#### 배경

서로 다른 두 대상을 한꺼번에 다루는 코드는 각각을 별개 모듈로 나눈다.
모듈이 잘 분리되어 있다면 다른 모듈의 상세 내용은 전혀 기억하지 못해도 원하는 대로 수정을 끝마칠 수도 있다.

#### 절차

1. 두 번째 단계에 해당하는 코드를 독립 함수로 추출한다.
2. 테스트한다.
3. 중간 데이터 구조를 만들어서 앞에서 추출한 함수의 인수로 추가한다.
4. 테스트한다.
5. 추출한 두 번째 단계 함수의 매개변수를 하나씩 검토한다. 그중 첫번째 단계에서 사용되는 것은 중간 데이터 구조로 옮긴다. 하나씩 옮길 때마다 테스트한다.
6. 첫 번째 단계 코드를 함수로 추출하면서 중간 데이터 구조를 반환하도록 만든다.

#### 예시

```js
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}
```

```js
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const price = applyShipping(basePrice, shippingMethod, quantity, discount);
  return price;
}

function applyShipping(basePrice, shippingMethod, quantity, discount) {
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}
```

```js
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const priceData = {}; // 중간 데이터 구조
  const price = applyShipping(
    priceData,
    basePrice,
    shippingMethod,
    quantity,
    discount
  );
  return price;
}

function applyShipping(
  priceData,
  basePrice,
  shippingMethod,
  quantity,
  discount
) {
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}
```

```js
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const priceData = { basePrice: basePrice }; // 중간 데이터 구조
  const price = applyShipping(priceData, shippingMethod, quantity, discount);
  return price;
}

function applyShipping(priceData, shippingMethod, quantity, discount) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = priceData.basePrice - discount + shippingCost;
  return price;
}
```

```js
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const priceData = {
    basePrice: basePrice,
    quantity: quantity,
    discount: discount,
  }; // 중간 데이터 구조
  const price = applyShipping(priceData, shippingMethod);
  return price;
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  const price = priceData.basePrice - priceData.discount + shippingCost;
  return price;
}
```

```js
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(priceData, shippingMethod);
  const price = applyShipping(priceData, shippingMethod);
  return price;
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  return { basePrice: basePrice, quantity: quantity, discount: discount };
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
}
```

## 07 캡슐화

### 7.1 레코드 캡슐화하기

- 1판에서의 이름: 레코드를 데이터 클래스로 전환

```js
organization = { name: "애크미 구스베리", country: "GB" };
```

```js
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get country() {
    return this._country;
  }
  set country(arg) {
    this._country = arg;
  }
}
```

#### 배경

레코드는 연관된 여러 데이터를 직관적인 방식으로 묶을 수 있어서 각각을 따로 취급할 때보다 훨씬 의미 있는 단위로 전달할 수 있게 해준다.
레코드는 단점이 있다. 계산해서 얻을 수 있는 값과 그렇지 않은 값을 명확히 구분해 저장해야 하는 점이 번거롭다.
이 때문에 가변 데이터를 저장하는 용도로는 레코드보다 객체를 사용한다.

#### 절차

1. 레코드를 담은 변수를 캡슐화한다.
2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 이 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이접근자를 사용하도록 수정한다.
3. 테스트한다.
4. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만든다.
5. 레코드를 반환하는 예전 함수를 사용하는 코드를 4에서 만든 새 함수를 사용하도록 바꾼다. 필드에 접근할 때는 객체의 접근자를 사용한다. 적절한 접근자가 없다면 추가한다. 한 부분을 바꿀 때마다 테스트한다.
6. 클래스에서 원본 데이터를 반환하는 접근자와 원본 레코드를 반환하는 함수들을 제거한다.
7. 테스트한다.
8. 레코드의 필드도 데이터 구조인 중첩 구조라면 레코드 캡슐화하기와 컬렉션 캡슐화하기를 재귀적으로 적용한다.

### 7.2 컬렉션 캡슐화하기

```js
class Person {
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
}
```

```js
class Person {
  get courses() {return this._courses.slice();}
  addCourse(aCourse) {...}
  removeCourse(aCourse) {...}
}
```

#### 배경

컬렉션을 다룰 때 컬렉션을 감싼 클래스에 add()와 remove()라는 이름의 컬렉션 변경자 메서드를 만든다. 이렇게 항상 컬렉션을 소유한 클래스를 통해서만 원소를 변경하도록 하면 프로그램을 개선하면서 컬렉션 변경 방식도 원하는 대로 수정할 수 있다.

#### 절차

1. 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기부터 한다.
2. 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
3. 정적 검사를 수행한다.
4. 컬렉션을 참조하는 부분을 모두 찾는다. 컬렉션의 변경자를 호출하는 코드가 모두 앞에서 추가한 추가/제거 함수를 호출하도록 수정한다. 하나씩 수정할 때마다 테스트한다.
5. 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 읽기전용 프락시나 복제본을 반환하게 한다.
6. 테스트한다.

### 7.3 기본형을 객체로 바꾸기

Replace Primitive with Object

- 1판에서의 이름
  - 데이터 값을 객체로 전환
  - 분류 부호를 클래스로 전환

```js
// before
orders.filter((o) => "high" === o.priority || "rush" === o.priority);
```

```js
// after
orders.filter((o) => o.priority.higherThan(new Priority("normal")));
```

#### 배경

간단했던 정보들이 복잡하게 변할 때, 그 데이터를 표현하는 전용 클래스를 정의한다.

#### 절차

1. 아직 변수를 캡슈로하하지 않았다면 캡슐화한다.
2. 단순한 값 클래스를 만든다. 생성자는 기존 값을 인수로 받아서 저장하고, 이 값을 반환하는 게터를 추가한다.
3. 정적 검사를 수행한다.
4. 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록 세터를 수정한다. 이미 있다면 필드의 타입을 적절히 변경한다.
5. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정한다.
6. 테스트한다.
7. 함수 이름을 바꾸면 원본 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다.

### 7.4 임시 변수를 질의 함수로 바꾸기

Replace Temp with Query

```js
// before
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000) {
  return basePrice * 0.95;
} else {
  return basePrice * 0.98;
}
```

```js
// after
get basePrice() {this._quantity * this._itemPrice;}
//...
if (this.basePrice > 1000) {
  return this.basePrice * 0.95;
} else {
  return this.basePrice * 0.98;
}
```

#### 배경

임시 변수가 유용하지만 아예 함수로 만들어 사용하는 편이 나을 때가 많다.
비슷한 계산을 수행하는 다른 함수에서도 사용할 수 있다 코드 중복이 줄어든다.

#### 절차

1. 변수가 사용되기 전에 값이 확실히 결정되는지, 변수를 사용할 때마다 계산 로직이 매번 다른 결과를 내지는 않는지 확인한다.
2. 읽기전용으로 만들 수 있는 변수는 읽기전용으로 만든다.
3. 테스트한다.
4. 변수 대입문을 함수로 추출한다.
5. 테스트한다.
6. 변수 인라인하기로 임시 변수를 제거한다.

### 7.5 클래스 추출하기

Extract Class

- 반대 리팩터링: 클래스 인라인하기

```js
// before
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  get offceNumber() {
    return this._officeNumber;
  }
}
```

```js
// after
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
}
class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }
  get number() {
    return this._number;
  }
}
```

#### 배경

클래스는 반드시 명확하게 추상화하고 소수의 주어진 역할만 처리해야 한다. 메서드와 데이터가 너무 많은 클래스는 이해하기 쉽지 않으니 잘 살펴보고 적절히 분리하는 것이 좋다.

#### 절차

1. 클래스의 역할을 분리할 방법을 정한다.
2. 분리될 역할을 담당할 클래스를 새로 만든다.
3. 원래 클래스의 생성자에서 새로운 클래스의 인스턴스를 생성하여 필드에 저장해둔다.
4. 분리될 역할에 필요한 필드들을 새 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
5. 메서드들도 새 클래스로 옮긴다. 이때 저수준 메서드, 즉 다른 메서드를 호출하기보다는 호출을 당하는 일이 많은 메서드부터 옮긴다. 하나씩 옮길때마다 테스트한다.
6. 양쪽 클래스의 인터페이스를 살펴보면서 불필요한 메서드를 제거하고, 이름도 새로운 환경에 맞게 바꾼다.
7. 새 클래스를 외부로 노출할지 정한다. 노출하려거든 새 클래스에 참조를 값으로 바꾸기를 적용할지 고민해본다.

### 7.6 클래스 인라인하기

Inline Class

- 반대 리팩터링: 클래스 추출하기

```js
// before
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
}

class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }
  get number() {
    return this._number;
  }
}
```

```js
// after
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  get officeNumber() {
    return this._officeNumber;
  }
}
```

#### 배경

클래스 인라인하기는 클래스 추출하기를 거꾸로 돌리는 리팩터링이다. 더 이상 제역할을 못 해서 그대로 두면 안 되는 클래스를 인라인 한다. 두 클래스의 기능을 지금과 다르게 배분하고 싶을 때로 클래스를 인라인한다. 하나로 합친 다음 새로운 클래스를 추출하는 게 쉬울 수도 있기 때문이다.

#### 절차

1. 소스 클래스의 각 public 메서드에 대응하는 메서드들을 타깃 클래스에 생성한다. 이 메서드들은 단 순히 작업을 소스 클래스로 위임해야 한다.
2. 소스 클래스의 메서드를 사용하는 코드를 모두 타깃 클래스의 위임 메서드를 사용하도록 바꾼다. 하나씩 바꿀 때마다 테스트한다.
3. 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
4. 소스 클래스를 삭제하고 조의를 표한다.

### 7.7 위임 숨기기

Hide Delegate

- 반대 리팩터링: 중개자 제거하기

```js
//before
manager = aPerson.department.manager;
```

```js
// after
manager = aPerson.manager;

class Person {
  get manager() {
    return this.department.manager;
  }
}
```

#### 배경

모듈화 설계를 제대로 하는 핵심은 캡슐화다.
객체 지향을 처음 배울 때는 캡슐화한 필드를 숨기는 것이라고 배운다. 그러다 경험이 쌓이면서 캡슐화의 역할이 그보다 많다는 사실을 깨닫는다.

#### 절차

1. 위임 객체의 각 메서드에 해당하는 위임 메서드를 서버에 생성한다.
2. 클라이언트가 위임 객체 대신 서버를 호출하도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
3. 모두 수정했다면, 서버로부터 위임 객체를 얻는 접근자를 제거한다.
4. 테스트한다.

### 7.8 중개자 제거하기

Remove Middle Man

- 반대 리팩터링: 위임 숨기기

```js
// before
manager = aPerson.manager;
class Person {
  get manager() {
    return this.department.manager;
  }
}
```

```js
// after
manager = aPerson.department.manager;
```

#### 배경

위임 숨기기를 하다 보면 단순히 전달만 하는 위임 메서드들이 점점 성가셔진다. 그러면 서버 클래스는 그저 중ㄱ개자 역하로전락하여, 차라리 클라이언트가 위임 객체를 직접 호출하는 게 나을 수 있다.

#### 절차

1. 위임 객체를 얻는 게터를 만든다.
2. 위임 메서드를 호출하는 클라이언트가 모두 이 게터를 거치도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
3. 모두 수정했다면 위임 메서드를 삭제한다.

### 7.9 알고리즘 교체하기

Substitute Algorithm

```js
//before
function foundPerson(people) {
  for (let i = 0; i < people.length; i++) {
    if (people[i] === "Don") {
      return "Don";
    }
    if (people[i] === "John") {
      return "John";
    }
    if (people[i] === "Kent") {
      return "Kent";
    }
  }
  return "";
}
```

```js
//after
function foundPerson(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find((p) => candidates.includes(p)) || "";
}
```

#### 배경

더 간명한 알고리즘으로 고친다.

#### 절차

1. 교체할 코드를 함수 하나에 모은다.
2. 이 함수만을 이용해 동작을 검증하는 테스트를 마련한다.
3. 대체할 알고리즘을 준비한다.
4. 정적 검사를 수행한다.
5. 기존 알고리즘과 새 알고리즘의 결과를 비교하는 테스트를 수행한다. 두 결과가 같다면 리팩터링이 끝난다. 그렇지 않다면 기존 알고리즘을 참고해서 새 알고리즘을 테스트하고 디버깅한다.

## 08 기능 이동

### 8.1 함수 옮기기

Move Function

- 1판에서의 이름: 메서드 이동

```js
// before
class Account {
  get overdraftCharge() {....}
}
```

```js
class AccountType {
  get overdraftCharge() {....}
}
```

#### 배경

좋은 소프트웨어 설계의 핵심은 모듈화가 얼마나 잘 되어 있느냐를 뜻하는 모듈성`modularity`이다.
모듈성이란 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력이다.
모듈성을 높이려면 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야 한다.

#### 절차

1. 선택한 함수가 현재 컨텍스트에서 사용 중인 모든 프로그램 요소를 살펴본다. 이 요소들 중에도 함께 옮겨야 할 게 있는지 고민해본다.
2. 선택한 함수가 다형 메서드인지 확인한다.
3. 선택한 함수를 타깃 컨텍스트로 복사한다(이때 원래의 함수를 소스 함수`source function`라 하고 복사해서 만든 새로운 함수를 타깃 함수`target function`라 한다). 타깃 함수가 새로운 터전에 잘 자리 잡도록 다듬는다.
4. 정적 분석을 수행한다.
5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영한다.
6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정한다.
7. 테스트한다.
8. 소스 함수를 인라인할지 고민해본다.

### 8.2 필드 옮기기

Move Field

```js
// before
class Customer {
  get plan() {
    return this._plan;
  }
  get discountRate() {
    return this._discountRate;
  }
}
```

```js
// after
class Customer {
  get plan() {
    return this._plan;
  }
  get discountRate() {
    return this.plan.discountRate;
  }
}
```

#### 배경

프로그램의 진짜 힘은 데이터 구조에서 나온다. 주어진 문제에 적합한 데이터 구조를 활용하면 동작 코드는 자연스럽게 단순하고 직관적으로 짜여진다.

가장 적합한 데이터 구조를 알아내려면, 경험과 도메인 주도 설계 같은 기술이 필요하다. 하지만 그럼에도 불구하고 초기 설게에서는 실수가 빈번하다.

#### 절차

1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화한다.
2. 테스트한다.
3. 타깃 객체에 필드(와 접근자 메서드들)를 생성한다.
4. 정적 검사를 수행한다.
5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인한다.
6. 접근자들이 타깃 필드를 사용하도록 수정한다.
7. 테스트한다.
8. 소스 필드를 제거한다.
9. 테스트한다.

#### 예제

```js
// 예제
class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {
    return this._discountRate;
  }
  becomePreferred() {
    this._discountRate += 0.03;
  }

  applyDiscount(amount) {
    return amount.substract(amout.multiply(this._discountRate));
  }
}

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate;
  }
}
```

1. 필드 캡슐화

```js
class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._setDiscountRate(discountRate); // <--
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {
    return this._discountRate;
  }
  _setDiscountRate(aNumber) {
    this._discountRate = aNumber;
  } // <--
  becomePreferred() {
    this._discountRate += 0.03;
  }

  applyDiscount(amount) {
    return amount.substract(amout.multiply(this._discountRate));
  }
}

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate;
  }
}
```

3. CunstomerContract 클래스에 필드 하나와 접근자들을 추가

```js
class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }

  get discountRate() {
    return this._discountRate;
  }
  set discountRate(arg) {
    this._discountRate = arg;
  }
}
```

6. Customer의 접근자들이 새로운 필드를 사용하도록 수정한다. 다 수정하고 나면 "Cannot set property 'discountRate' of undefined"라는 오류가 날 것이다. 생성자에서 Contract 객체를 생성하기도 전에 \_setDiscountRate()를 호출하기 때문이다. 이 오류를 고치려면 먼저 기존 상태로 되돌린 다음, 문자 슬라이드하기를 적용해 \_setDiscountRate() 호출을 계약 생성 뒤로 옮겨야 한다.

```js
class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }

  get discountRate() {
    return this._discountRate;
  }
  _setDiscountRate(aNumber) {
    // <--
    this._contract.discountRate = aNumber;
  }
  becomePreferred() {
    this._discountRate += 0.03;
  }

  applyDiscount(amount) {
    return amount.substract(amout.multiply(this._discountRate));
  }
}
```

8. 자바스크립트를 사용하고 있으므로 소스 필드를 미리 선언할 필요는 없었다. 그래서 제거해야 할 것도 없다.

### 8.3 문장을 함수로 옮기기

Move Statements into Function

- 반대 리팩터링: 문장을 호출한 곳으로 옮기기

```js
// before
result.push("<p>제목: ${person.photo.title}</p>");
result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    "<p>위치: ${aPhoto.location}</p>",
    "<p>날짜: ${aPhoto.date.toDateString()}</p>",
  ];
}
```

```js
// after
result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    "<p>제목: ${aPhoto.title}</p>",
    "<p>위치: ${aPhoto.location}</p>",
    "<p>날짜: ${aPhoto.date.toDateString()}</p>",
  ];
}
```

#### 배경

중복 제거는 코드를 건강하게 관리하는 가장 효과적인 방법 중 하나다.

#### 절차

1. 반복 코드가 함수 호출 부분과 멀리 떨어져 있다면 문장 슬라이드하기를 적용해 근처로 옮긴다.
2. 타깃 함수를 호출하는 곳이 한 곳뿐이면, 단순히 소스 위치에서 해당 코드를 잘라내어 피호출 함수로 복사하고 테스트한다. 이 경우라면 나머지 단계는 무시한다.
3. 호출자가 둘 이상이면 호출자 중 하나에서 '타깃 함수 호출 부분과 그 함수로 옮기려는 문장들을 함께' 다른 함수로 추출한다. 추출한 함수에 기억하기 쉬운 임시 이름을 지어준다.
4. 다른 호출자 모두가 방금 추출한 함수를 사용하도록 수정한다. 하나씩 수정할 때마다 테스트한다.
5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인한 후 원래 함수를 제거한다.
6. 새로운 함수의 이름을 원래 함수의 이름으로 바꿔준다.(함수 이름 바꾸기)

### 8.4 문장을 호출한 곳으로 옮기기

Move Statement to Callers

- 반대 리팩터링: 문장을 함수로 옮기기

```js
// before
emitPhotoData(outStream, person.photo);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);
}
```

```js
// after
emitPhotoData(outStream, person.photo);
outStream.write(`<p>위치: ${person.photo.location}</p>\n`);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
}
```

#### 배경

함수는 프로그래머가 쌓아 올리는 추상화의 기본 빌딩 블록이다. 함수 관점에서 기능 범위가 달라지면 추상화의 경계도 움직인다.

#### 절차

1. 호출자가 한두개 뿐이고 피호출 함수도 간단한 단순한 상황이면, 피호출 함수의 처음(혹은 마지막) 줄(들)을 잘라내어 호출자(들)로 복사해 넣는다(필요하면 적당히 수정한다). 테스트만 통과하면 이번 리팩터링은 여기서 끝이다.
2. 더 복잡한 상황에서는, 이동하지 '않길' 원하는 모든 문장을 함수로 추출한 다음 검색하기 쉬운 임시 이름을 지어준다.
3. 원래 함수를 인라인한다.
4. 추출된 함수의 이름을 원래 함수의 이름으로 변경한다(함수 이름 바꾸기).

### 8.5 인라인 코드를 함수 호출로 바꾸기

Replace Inline Code with Function Call

```js
// before
let appliesToMass = false;
for (const s of states) {
  if (s === "MA") appliesToMass = true;
}
```

```js
// after
appliesToMass = states.includes("MA");
```

#### 배경

함수는 여러 동작을 하나로 묶어준다. 함수 이름이 목적을 말해주기 때문에 이해하기 쉬워진다. 중복을 없애는 데도 효과적이다.

#### 절차

1. 인라인 코드를 함수 호출로 대체한다.
2. 테스트한다.

- 인라인 코드를 대체할 함수가 이미 존재한다면 인라인 코드를 함수 호출로 바꾸기를 적용하면 된다.

### 8.6 문장 슬라이드하기

Slide Statements

- 1판에서의 이름: 조건문의 공통 실행 코드 빼내기

```js
// before
const pricingPlan = retrievePricingPlan();
const order = retrieveOrder();
let charge;
const chargePerUnit = pricingPlan.unit;
```

```js
// after
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retrieveOrder();
let charge;
```

#### 배경

관련된 코드들이 가까이 모여 있다면 이해하기가 더 쉽다.

#### 절차

1. 코드 조각을 이동할 목표 위치를 찾는다. 코드 조각의 원래 위치와 목표 위치 사이의 코드들을 훑어보면서, 조각을 모으고 나면 동작이 달라지는 코드가 있는지 살핀다. 다음은 같은 간섭이 있다면 이 리팩터링을 포기한다.
2. 코드 조각을 원래 위치에서 잘라내어 목표 위치에 붙여 넣는다.
3. 테스트한다.

### 8.7 반복문 쪼개기

Split Loop

```js
// before
let averageAge = 0;
let totalSalary = 0;
for (const p of people) {
  averageAge += p.age;
  totalSalary += p.salary;
}
averageAge = averageAge / people.length;
```

```js
// after
let totalSalary = 0;
for (const p of people) {
  totalSalary += p.salary;
}

let averageAge = 0;
for (const p of people) {
  averageAge += p.age;
}
averageAge = averageAge / people.length;
```

#### 배경

반복문 하나에서 두 가지 일을 수행하면 수정해야 할 때마다 두 가지 일 모두를 잘 이해하고 진행해야 한다. 반대로 각각의 반복문으로 분리해두면 수정할 동작 하나만 이해하면 된다.

#### 절차

1. 반복문을 복제해 두 개로 만든다.
2. 반복문이 중복되어 생기는 부수효과를 파악해서 제기한다.
3. 테스트한다.
4. 완료됐으면, 각 반복문을 함수로 추출할지 고민해본다.

### 8.8 반복문을 파이프라인으로 바꾸기

Replace Loop with Pipeline

```js
// before
const names = [];
for (const i of input) {
  if (i.job === "programmer") {
    names.push(i.name);
  }
}
```

```js
//after
const names = input.filter((i) => i.job === "programmer").map((i) => i.name);
```

#### 배경

컬렉션 파이프라인`Collection Pipeline`을 이용하면 처리 과정을 일련의 연산으로 표현할 수 있다.

#### 절차

1. 반복문에서 사용하는 컬렉션을 가리키는 변수를 하나 만든다.
2. 반복문의 첫 줄부터 시작해서, 각각의 단위 행위를 적절한 컬렉션 파이프라인 연산으로 대체한다. 이 때 컬렉션 파이프라인 연산은 1에서 만든 반복문 컬렉션 변수에서 시작하여, 이전 연산의 결과를 기초로 연쇄적으로 수행된다. 하나를 대체할 때마다 테스트한다.
3. 반복문의 모든 동작을 대체했다면 반복문 자체를 지운다.

### 8.9 죽은 코드 제거하기

Remove Dead Code

```js
// before
if (false) {
  doSomethingThatUsedToMatter();
}
```

```js
// after
```

#### 배경

사용되지 않는 코드가 있다면 그 소프트웨어의 동작을 이해하는 데는 커다란 걸림돌이 될 수 있다. 코드가 더 이상 사용되지 않게 됐다면 지워야 한다.

#### 절차

1. 죽은 코드를 외부에서 참조할 수 있는 경우라면(예컨대 함수 하나가 통째로 죽었을 때) 혹시라도 호출하는 곳이 있는지 확인한다.
2. 없다면 죽은 코드를 제거한다.
3. 테스트한다.

## 09 테이터 조직화

데이터 구조는 프로그램에서 중요한 역할을 수행한다.

### 9.1 변수 쪼개기

Split Variable

- 1판에서의 이름: 매개변수로의 값 대입 제거
- 1판에서의 이름: 임시변수 분리

```js
// before
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);
```

```js
// after
const perimeter = 2 * (height + width);
console.log(perimeter);
const area = height * width;
console.log(area);
```

#### 배경

역할이 둘 이상인 변수가 있다면 쪼개야 한다. 예외는 없다. 역할 하나당 변수 하나다.

#### 절차

1. 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꾼다.
2. 가능하면 이때 불변`immutable`으로 선언한다.
3. 이 변수에 두 번째로 값을 대입하는 곳 앞까지의 모든 참조(이 변수가 쓰인 곳)를 새로운 변수 이름으로 바꾼다.
4. 두 번째 대입 시 변수를 원래 이름으로 다시 선언한다.
5. 테스트한다.
6. 반복한다. 매 반복에서 변수를 새로운 이름으로 선언하고 다음번 대입 때까지의 모든 참조를 새 변수명으로 바꾼다. 이 과정을 마지막 대입까지 반복한다.

### 9.2 필드 이름 바꾸기

Rename Field

```js
// before
class Organization {
  get name() {...}
}
```

```js
// after
class Organization {
  get title() {...}
}
```

#### 배경

이름은 중요하다. 레코드 구조체의 필드 이름들은 특히 더 중요하다. 데이터 구조는 프로그램을 이해하는 데 큰 역할을 한다.

#### 절차

1. 레코드의 유효 범위가 제한적이라면 필드에 접근하는 모든 코드를 수정한 후 테스트한다. 이후 단계는 필요 없다.
2. 레코드가 캡슐화되지 않았다면 우선 레코드를 캡슐화한다.
3. 캡슐화된 객체 안의 private 필드명을 변경하고, 그에 맞게 내부 메서드들을 수정한다.
4. 테스트한다.
5. 생성자의 매개변수 중 필드의 이름이 겹치는 게 있다면 함수 선언 바꾸기로 변경한다.
6. 접근자들의 이름도 바꿔준다.

### 9.3 파생 변수를 질의 함수로 바꾸기

Replace Derived Variable with Query

```js
// before
get discountedTotal() {return this._discountedTotal}
set discountedTotal(aNumber) {
  const old = this._discount;
  this._discount = aNumber;
  this._discountedTotal += old - aNumber;
}
```

```js
// after
get discountedTotal() {return this._baseTotal - this._discount}
set discountedTotal() {this._discount = aNumber}
```

#### 배경

가변 데이터는 서로 다른 두 코드에서 연쇄 효과를 일으켜 다른 쪽 코드에 원인을 찾기 어려운 문제를 야기하기도 한다. 가변 데이터를 완전히 배제하기란 불가능하므로 유효 범위를 가능한 좁혀야 한다.

#### 절차

1. 변수 값이 갱신되는 지점을 모두 찾는다. 필요하면 변수 쪼개기를 활용해 각 갱신 지점에서 변수를 분리한다.
2. 해당 변수의 값을 계산해주는 함수를 만든다.
3. 해당 변수가 사용되는 모든 곳에 어서션을 추가하여 함수의 계산 결과가 변수의 값과 같은지 확인한다.
4. 테스트한다.
5. 변수를 읽는 코드를 모두 함수 호출로 대체한다.
6. 테스트한다.
7. 변수를 선언하고 갱신하는 코드를 죽은 코드 제거하기로 없앤다.

### 9.4 참조를 값으로 바꾸기

Change Reference to Value

- 반대 리팩터링: 값을 참조로 바꾸기

```js
// before
class Product {
  applyDiscount(arg) {
    this._price.amount -= arg;
  }
}
```

```js
// after
class Product {
  applyDiscount(arg) {
    this._price = new Money(this._price.amount - arg, this.price.currency);
  }
}
```

#### 배경

필드를 값으로 다룬다면 내부 객체의 클래스를 수정하여 값 객체`Value object`로 만들 수 있다. 값 객체는 대체로 자유롭게 활용하기 좋은데, 특히 불변이기 때문이다. 값 객체는 분산 시스템과 동시성 시스템에서 특히 유용하다.

#### 절차

1. 후보 클래스가 불변인지, 혹은 불변이 될 수 있는지 확인한다.
2. 각각의 세터를 하나씩 제거한다.
3. 이 값 객체의 필드들을 사용하는 동치성 비교 메서드를 만든다.

## 10 조건부 로직 간소화

## 11 API 리팩터링

## 12 상속 다루기

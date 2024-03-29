---
title: "[Book] Refactoring: 3 코드에서 나는 악취"
date: 2022-03-05 23:25:00
categories:
  - Book
tags:
  - [Book, Refactoring]

toc: true
toc_sticky: true
---

# 리팩터링

출처: 리팩터링 2판, 마틴 파울러

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

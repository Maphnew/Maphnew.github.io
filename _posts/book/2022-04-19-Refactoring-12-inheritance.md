---
title: "[Book] Refactoring: 12 상속 다루기"
date: 2022-04-17 23:25:00
categories:
  - Book
tags:
  - [Book, Refactoring]

toc: true
toc_sticky: true
---

# 리팩터링

출처: 리팩터링 2판, 마틴 파울러

## 12 상속 다루기

객체 지향 프로그래밍에서 가장 유명한 특성인 상속`inheritance`을 다룬다. 다른 강력한 메커니즘처럼 이 역시 아주 유용한 동시에 오용하기 쉽다. 더욱이 상속은 발등에 불이 떨어져서야 비로소 잘못 사용했음을 알아차리는 경우가 많다.

### 12.1 메서드 올리기

Pull Up Method

- 반대 리팩터링: 메서드 내리기

```js
// before
class Employee {...}

class Salesperson extends Employee {
  get name() {...}
}

class Engineer extends Employee {
  get name() {...}
}
```

```js
// after
class Employee {
  get name() {...}
}

class Salesperson extends Employee {}

class Engineer extends Employee {}
```

#### 배경

중복 코드 제거는 중요하다. 한쪽의 변경이 다른 쪽에는 반영되지 않을 수 있다는 위험을 항상 수반한다.

#### 절차

1. 똑같이 동작하는 매서드인지 면밀히 살펴본다.
2. 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼클래스에서도 호출하고 참조할 수 있는지 확인한다.
3. 메서드 시그니처가 다르다면 함수 선언 바꾸기로 슈퍼클래스에서 사용하고 싶은 형태로 통일한다.
4. 슈퍼클래스에 새로운 메서드를 생성하고, 대상 메서드의 코드를 복사해넣는다.
5. 정적 검사를 수행한다.
6. 서브클래스 중 하나의 메서드를 제거한다.
7. 테스트한다.
8. 모든 서브클래스의 메서드가 없어질 떄까지 다른 서브클래스의 메서드를 하나씩 제거한다.

### 12.2 필드 올리기

Pull Up Field

- 반대 리팩터링: 필드 내리기

```js
// before
class Employee {...} // 자바 코드

class Salesperson extends Employee {
  private String name;
}

class Engineer extends Employee {
  private String name;
}
```

```js
// after
class Employee {
  protected String name;
}

class Salesperson extends Employee {}

class Engineer extends Employee {}
```

#### 배경

서브클래스들이 독립적으로 개발되었거나 뒤늦게 하나의 계층구조로 리팩터링된 경우라면 일부 기능이 중복되어 있을 때가 있다. 이런 필드들은 항상 이름이 비슷하지 않아 어떻게 이용되는지 분석해봐야 한다. 분석 결과 필드들이 비슷한 방식으로 쓰인다면 슈퍼클래스로 끌어올리자.

#### 절차

1. 후보 필드들을 사용하는 곳 모두가 그 필드들을 똑같은 방식으로 사용하는지 면밀히 살핀다.
2. 필드들의 이름이 각기 다르다면 똑같은 이름으로 바꾼다(필드 이름 바꾸기).
3. 슈퍼클래스에 새로운 필드를 생성한다.
4. 서브클래스의 필드들을 제거한다.
5. 테스트한다.

### 12.3 생성자 본문 올리기

Pull Up Constructor Body

```js
// before
class Party {...}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
}
```

```js
// after
class Party {
  constructor(name) {
    this._name = name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
}
```

#### 배경

생성자는 다루기 까다롭다. 일반 메서드와는 많이 달라서, 생성자에서 하는 일에 제약을 두는 편이 좋다.
서브클래스들에서 기능이 같은 메서드들을 발견하면 함수 추출하기와 메서드 올리기를 차례로 적용하여 말끔히 슈퍼클래스로 옮길 수 있다. 그런데 그 메서드가 생성자라면 스텝이 꼬인다. 생성자는 할 수 있는 일과 호출 순서에 제약이 있기 때문에 조금 다른 식으로 접근해야 한다.

#### 절차

1. 슈퍼클래스에 생성자가 없다면 하나 정의한다. 서브클래스의 생성자들에서 이 생성자가 호출되는지 확인한다.
2. 문장 슬라이드하기로 공통 문장 모두를 super() 호출 직후로 옮긴다.
3. 공통 코드를 슈퍼클래스에 추가하고 서브클래스들에서는 제거한다. 생성자 매개변수 중 공통 코드에서 참조하는 값들을 모두 super()로 건넨다.
4. 테스트한다.
5. 생성자 시작부분으로 옮길 수 없는 공통 코드에는 함수 추출하기와 메서드 올리기를 차례로 적용한다.

### 12.4 메서드 내리기

Push Down Method

- 반대 리팩터링: 메서드 올리기

```js
// before
class Employee {
  get quota {...}
}

class Engineer extends Employee {...}
class Salesperson extends Employee {...}
```

```js
// after
class Employee {...}

class Engineer extends Emplyee {...}
class Salesperson extends Employee {
  get quota {...}
}
```

#### 배경

특정 서브클래스 하나와만 관련된 메서드는 슈퍼클래스에서 제거하고 해당 서브클래스에 추가하는 편이 깔끔하다.

#### 절차

1. 대상 메서드를 모든 서브클래스에 복사한다.
2. 슈퍼클래스에서 그 메서드를 제거한다.
3. 테스트한다.
4. 이 메서드를 사용하지 않는 모든 서브클래스에서 제거한다.
5. 테스트한다.

### 12.5 필드 내리기

Push Down Field

- 반대 리팩터링: 필드 올리기

```js
// before
class Employee { // 자바 코드
  private String quita
}

class Engineer extends Employee {...}
class Salesperson extends Employee {...}
```

```js
// after
class Employee {...}

class Engineer extends Employee {...}
class Salesperson extends Employee {
  protected String quita;
}
```

#### 배경

서브클래스 하나에서만 사용하는 필드는 해당 서브클래스로 옮긴다.

#### 절차

1. 대상 필드를 모든 서브클래스에 정의한다.
2. 슈퍼클래스에서 그 필드를 제거한다.
3. 테스트한다.
4. 이 필드를 사용하지 않는 모든 서브클래스에서 제거한다.
5. 테스트한다.

### 12.6 타입 코드를 서브클래스로 바꾸기

Replace Type Code with Subclasses

- 반대 리팩터링: 서브클래스 제거하기
- 하위 리팩터링
  - 타입 코드를 상태/전략 패턴으로 바꾸기
  - 서브클래스 추출하기

```js
// before
function createEmployee(name, type) {
  return new Employee(name, type);
}
```

```js
// after
function createEmplyee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name);
    case "salesperson":
      return new Salesperson(name);
    case "manager":
      return new Manager(name);
  }
}
```

#### 배경

소프트웨어 시스템에서는 비슷한 대상들을 특정 특성에 다라 구분해야 할 때가 자주 있다. 예컨대 직원을 담당 업무로 구분하거나(엔지니어, 관리자, 영업자 등) 주문을 시급성으로 구분하기도 한다(급함, 보통 등). 이런 일을 다루는 수단으로는 타입 코드`type code` 필드가 있다. 타입 코드는 프로그래밍 언어에 따라 열거형이나 심볼, 문자열, 숫자 등으로 표현하며, 외부 서비스가 제공하는 데이터를 다루려 할 때 딸려오는 일이 흔하다.

#### 절차

1. 타입 코드 필드를 자가 캡슐화한다.
2. 타입 코드 값 하나를 선택하여 그 값에 해당하는 서브클래스를 만든다. 타입 코드 게터 메서드를 오버라이드하여 해당 타입 코드의 리터럴 값을 반환하게 한다.
3. 매개변수로 받은 타입 코드와 방금 만든 서브클래스를 매핑하는 선택 로직을 만든다.
4. 테스트한다.
5. 타입 코드 값 각각에 대해 서브클래스 생성과 선택 로직 추가를 반복한다. 클래스 하나가 완성될 때마다 테스트한다.
6. 타입 코드 필드를 제거한다.
7. 테스트한다.
8. 타입 코드 접근자를 이용하는 메서드 모두에 메서드 내리기와 조건부 로직을 다형성으로 바꾸기를 적용한다.

### 12.7 서브클래스 제거하기

Remove Subclass

- 반대 리팩터링: 타입 코드를 서브클래스로 바꾸기
- 1판에서의 이름: 하위클래스를 필드로 전환

```js
// before
class Person {
  get genderCode() {
    return "X";
  }
}

class Male extends Person {
  get genderCode() {
    return "M";
  }
}

class Female extends Person {
  get genderCode() {
    return "F";
  }
}
```

```js
// after
class Person {
  get genderCode() {
    return this._genderCode;
  }
}
```

#### 배경

서브클래싱은 원래 데이터 구조와는 다른 변종을 만들거나 종류에 따라 동작이 달라지게 할 수 있는 유용한 메커니즘이다. 다름을 프로그래밍하는 멋진 수단인 것이다. 하지만 소프트웨어 시스템이 성장함에 따라 서브클래스로 만든 변종이 다른 모듈로 이동하거나 완전히 사라지기도 하면서 가치가 바래기도 한다. 서브클래스는 결국 한 번도 활용되지 않기도 하며, 때론 서브클래스를 필요로 하지 않는 방식으로 만들어진 기능에서만 쓰이기도 한다.

#### 절차

1. 서브클래스의 생성자를 팩터리 함수로 바꾼다.
2. 서브클래스의 타입을 검사하는 코드가 있다면 그 검사 코드에 함수 추출하기와 함수 옮기기를 차례로 적용하여 슈퍼클래스로 옮긴다. 하나 변경할 때마다 테스트한다.
3. 서브클래스의 타입을 나타내는 필드를 슈퍼클래스에 만든다.
4. 서브클래스를 참조하는 메서드가 방금 만든 타입 필드를 이용하도록 수정한다.
5. 서브클래스를 지운다.
6. 테스트한다.

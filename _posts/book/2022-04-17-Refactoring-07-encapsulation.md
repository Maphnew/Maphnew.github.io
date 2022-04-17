---
title: "[Book] Refactoring: 7 캡슐화"
date: 2022-03-15 23:25:00
categories:
  - Book
tags:
  - [Book, Refactoring]

toc: true
toc_sticky: true
---

# 리팩터링

출처: 리팩터링 2판, 마틴 파울러

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

---
title: "[Book] Refactoring: 8 기능 이동"
date: 2022-03-21 23:25:00
categories:
  - Book
tags:
  - [Book, Refactoring]

toc: true
toc_sticky: true
---

# 리팩터링

출처: 리팩터링 2판, 마틴 파울러

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

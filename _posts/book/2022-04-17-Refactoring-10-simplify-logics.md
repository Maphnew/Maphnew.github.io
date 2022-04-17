---
title: "[Book] Refactoring: 10 조건부 로직 간소화"
date: 2022-04-12 23:25:00
categories:
  - Book
tags:
  - [Book, Refactoring]

toc: true
toc_sticky: true
---

# 리팩터링

출처: 리팩터링 2판, 마틴 파울러

## 10 조건부 로직 간소화

### 10.1 조건문 분해하기

Decompose Conditional

```js
// before
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}
```

```js
// after
if (summer()) {
  charge = summerCharge();
} else {
  charge = regularCharge();
}
```

#### 배경

복잡한 조건부 로직은 프로그램을 복잡하게 만든다. 코드를 부위별로 분해한 다음 코드 덩어리 들을 각 덩어리의 의도를 살린 이름의 함수 호출로 바꾸자.

#### 절차

1. 조건식과 그 조건식에 딸린 조건절 각각을 함수로 추출한다.

### 10.2 조건식 통합하기

Consolidate Conditional Expression

```js
// before
if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;
```

```js
// after
if (isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
  return ((anEmployee.seniority < 2) || (anEmployee.monthsDisabled > 12) || (anEmployee.isPartTime)));
}
```

#### 배경

비교하는 조건은 다르지만 동작은 똑같은 코드들이 더러 있는데, 같은 일을 할 거면 조건 검사를 하나로 통합하는 게 낫다.

#### 절차

1. 해당 조건식들 모두에 부수효과가 없는지 확인한다.
2. 조건문 두 개를 선택하여 두 조건문의 조건식들을 논리 연산자로 결합한다.
3. 테스트한다.
4. 조건이 하나만 남을 때까지 2~3 과정을 반복한다.
5. 하나로 합쳐진 조건식을 함수로 추출할지 고려해본다.

### 10.3 중첩 조건문을 보호 구문으로 바꾸기

Replace Nested Conditional with Guard Clauses

```js
// before
function getPayAmount() {
  let result;
  if (isDead) {
    result = deadAmount();
  } else {
    if (isSeperated) {
      result = seperatedAmount();
    } else {
      if (isRetired) {
        result = retiredAmount();
      } else {
        result = normalPayAmount();
      }
    }
  }
}
return result;
```

```js
// after
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeperated) return seperatedAmount();
  if (isRetired) return retiredAmount();
  return normalPayAmount();
}
```

#### 배경

조건문은 주로 두 가지 형태로 쓰인다. 참인 경로와 거짓인 경로 모두 정상 동작으로 이어지는 형태와, 한쪽만 정상인 형태다.

두 경로 모두 정상이라면 if와 else절을 사용한다.
한쪽만 정상이라면 비정상 조건을 if에서 검사한 다음, 조건이 참이면(비정상이면) 함수에서 빠져나온다.
두 번째 검사 형태를 흔히 보호 구문`guard clause`이라고 한다.

#### 절차

1. 교체해야 할 조건 중 가장 바깥 것을 선택하여 보호 구문으로 바꾼다.
2. 테스트한다.
3. 1~2 과정을 필요한 만큼 반복한다.
4. 모든 보호 구문이 같은 결과를 반환한다면 보호 구문들의 조건식을 통합한다.

### 10.4 조건부 로직을 다형성으로 바꾸기

Replace Conditional with Polymorphism

```js
// before
switch (bird.type) {
  case "유럽 제비":
    return "보통이다";
  case "아프리카 제비":
    return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  case "노르웨이 파랑 앵무":
    return bird.voltage > 100 ? "그을렸다" : "예쁘다";
  default:
    return "알 수 없다";
}
```

```js
// after
class EuropeanSwallow {
  get plumage() {
    return "보통이다";
  }
}

class AfricanSwallow {
  get plumage() {
    return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }
}

class NorwegianBlueParrot {
  get plumage() {
    return bird.voltage > 100 ? "그을렸다" : "예쁘다";
  }
}
```

#### 배경

조건부 로직을 직관적으로 구조화할 방법을 항상 고민한다. 클래스와 다형성을 이용하면 더 확실하게 분리할 수도 있다.

#### 절차

1. 다형적 동작을 표현하는 클래스들이 아직 없다면 만들어준다. 이왕이면 적합한 인스턴스를 알아서 만들어 반환하는 팩터리 함수도 함께 만든다.
2. 호출하는 코드에서 팩터리 함수를 사용하게 한다.
3. 조건부 로직 함수를 슈퍼클래스로 옮긴다.
4. 서브클래스 중 하나를 선택한다. 서브클래스에서 슈퍼클래스의 조건부 로직 메서드를 오버라이드한다. 조건부 문장 중 선택된 서브클래스에 해당하는 조건절을 서브클래스 메서드로 복사한 다음 적절히 수정한다.
5. 같은 방식으로 각 조건절을 해당 서브클래스에서 메서드로 구현한다.
6. 슈퍼클래스 메서드에는 기본 동작 부분만 남긴다. 혹은 슈퍼클래스가 추상 클래스여야 한다면, 이 메서드를 추상으로 선언하거나 서브클래스에서 처리해야 함을 알리는 에러를 던진다.

#### 예시

```js
function plumages(birds) {}
function speeds(birds) {}
function plumage(bird) {}
function airSpeedVelocity(bird) {}
```

```js
function plumage(bird) {}
function airSpeedVelocity(bird) {}
class Bird {
  constructor(birdObject) {}
  get plumage() {}
  get airSpeedVelocity() {}
}
```

```js
function plumage(bird) {}
function airSpeedVelocity(bird) {}
function createBird(bird) {}
class EuropeanSwallow {
  get plumage() {
    return "보통이다";
  }
}
class AfricanSwallow {
  get plumage() {
    return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }
}
class NorwegianBlueParrot {
  get plumage() {
    return bird.voltage > 100 ? "그을렸다" : "예쁘다";
  }
}
```

### 10.5 특이 케이스 추가하기

Introduce Special Case

- 1판에서의 이름: Null 검사를 널 객체에 위임

```js
// before
if (aCustomer === "미확인 고객") customerName = "거주자";
```

```js
// after
class UnknownCustomer {
  get name() {
    return "거주자";
  }
}
```

#### 배경

데이터 구조의 특정 값을 확인한 후 똑같은 동작을 수행하는 중복 코드가 곳곳에 등장한다. 한 데로 모으는 게 효율적이다.
특이 케이스 패턴`Special Case Pattern`은 특수한 경우의 공통 동작을 요소 하나에 모아서 사용하는 패턴이다.
이 패턴을 활용하면 특이 케이스를 확인하는 코드 대부분을 단순한 함수 호출로 바꿀 수 있다.

#### 절차

1. 컨테이너에 특이 케이스인지를 검사하는 속성을 추가하고, false를 반환하게 한다.
2. 특이 케이스 객체를 만든다. 이 객체는 특이 케이스인지를 검사하는 속성만 포함하며, 이 속성은 true를 반환하게 한다.
3. 클라이언트에서 특이 케이스인지를 검사하는 코드를 함수로 추출한다. 모든 클라이언트가 값을 직접 비교하는 대신 방금 추출한 함수를 사용하도록 고친다.
4. 코드에 새로운 특이 케이스 대상을 추가한다. 함수의 반환 값으로 받거나 변환 함수를 적용하면 된다.
5. 특이 케이스를 검사하는 함수 본문을 수정하여 특이 케이스 객체의 속성을 사용하도록 한다.
6. 테스트한다.
7. 여러 함수를 클래스로 묶기나 여러 함수를 변환 함수로 묶기를 적용하여 특이 케이스를 처리하는 공통 동작을 새로운 요소로 옮긴다.
8. 아직도 특이 케이스 검사 함수를 이용하는 곳이 남아 있다면 검사 함수를 인라인한다.

### 10.6 어서션 추가하기

Introduce Assertion

```js
// before
if (this.discountRate) {
  base = base - this.discountRate * base;
}
```

```js
// after
assert(this.discountRate >= 0);
if (this.discountRate) {
  base = base - this.discountRate * base;
}
```

#### 배경

특정 조건이 참일 때만 제대로 동작하는 코드 영역이 있을 때가 있다.
가정이 코드에 항상 명시적으로 기술되어 있지는 않을 때가 많다. 주석에라도 적혀 있다면 그나마 형편이 좀 낫다. 더 나은 방법은 어서션`assertion; 단언, 확언`을 이용해서 코드 자체에 삽입해놓는 것이다.

어서션은 항상 참이라고 가정하는 조건부 문장으로, 어서션이 실패했다는 건 프로그래머가 잘 못했다는 뜻이다.

#### 절차

1. 참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가한다.

- 어서션은 시스템 운영에 영향을 주면 안되므로 어서션을 추가한다고 해서 동작이 달라지지는 않는다.

### 10.7 제어 플래그를 탈출문으로 바꾸기

Replace Control Flag with Break

- 1판에서의 이름: 제어 플래그 제거

```js
// before
for (const p of people) {
  if (!found) {
    if (p === "조커") {
      sendAlert();
      fount = true;
    }
  }
}
```

```js
// after
for (const p of people) {
  if (p === "조커") {
    sendAlert();
    break;
  }
}
```

#### 배경

제어 플래그란 코드의 동작을 변경하는 데 사용되는 변수를 말하는데, 이런 코드를 항상 악취로 본다.
제어 플래그의 주 서식지는 반복문 안이다.

#### 절차

1. 제어 플래그를 사용하는 코드를 함수로 추출할지 고려한다.
2. 제어 플래그를 갱신하는 코드 각각을 적절한 제어문으로 바꾼다. 하나 바꿀 대마다 테스트한다.
3. 모두 수정했다면 제어 플래그를 제거한다.

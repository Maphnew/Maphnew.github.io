---
title: "[Book] Refactoring: 11 API 리팩터링"
date: 2022-04-14 23:25:00
categories:
  - Book
tags:
  - [Book, Refactoring]

toc: true
toc_sticky: true
---

# 리팩터링

출처: 리팩터링 2판, 마틴 파울러

## 11 API 리팩터링

모듈과 함수라는 블록들을 끼워 맞추는 연결부가 API이다. 이런 API를 이해하기 쉽고 사용하기 쉽게 만드는 일은 중요한 동시에 어렵기도 하다. 그래서 API를 개선하는 방법을 새로 깨달을 때마다 그에 맞게 리팩터링해야 한다.

### 11.1 질의 함수와 변경 함수 분리하기

Seperate Query from Modifier

```js
// before
function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce(
    (total, each) => each.amount + total,
    0
  );
  sendBill();
  return result;
}
```

```js
// after
function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}
function sendBill() {
  emailGateway.send(formatBill(customer));
}
```

#### 배경

외부에서 관찰할 수 있는 겉보기 부수효과`observable side effect`가 전혀 없이 값을 반환해주는 함수를 추구해야 한다. 이용할 때 신경 쓸 거리가 매우 적게 만들어야 한다.

#### 절차

1. 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓는다.
2. 새 질의 함수에서 부수효과를 모두 제거한다.
3. 정적 검사를 수행한다.
4. 원래 함수(변경 함수)를 호출하는 곳을 모두 찾아낸다. 호출하는 곳에서 반환 값을 사용한다면 질의 함수를 호출하도록 바꾸고, 원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가한다. 하나 수정할 때마다 테스트한다.
5. 원래 함수에서 질의 관련 코드를 제거한다.
6. 테스트한다.

### 11.2 함수 매개변수화하기

Parameterize Function

- 1판에서의 이름: 메서드를 매개변수호 전환

```js
// before
function tenPercnetRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}
```

```js
// after
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```

#### 배경

두 함수의 로직이 아주 비슷하고 단지 리터럴 값만 다르다면, 그 다른 값만 매개변수로 받아 처리하는 함수 하나로 합쳐서 중복을 없앨 수 있다. 이렇게 하면 매개변수 값만 바꿔서 여러 곳에서 쓸 수 있으니 함수의 유용성이 커진다.

#### 절차

1. 비슷한 함수 중 하나를 선택한다.
2. 함수 선언 바꾸기로 리터럴들을 매개변수로 추가한다.
3. 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
4. 테스트한다.
5. 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다. 하나 수정할 때마다 테스트한다.
6. 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정한다. 하나 수정할 때마다 테스트한다.

### 11.3 플래그 인수 제거하기

Remove Flag Argument

- 1판에서의 이름: 매개변수를 메서드로 전환

```js
// before
function setDimension(name, value) {
  if (name === "height") {
    this._height = value;
    return;
  }
  if (name === "width") {
    this._with = value;
    return;
  }
}
```

```js
//after
function setHeight(value) {
  this._height = value;
}
function setWidth(value) {
  this._width = value;
}
```

#### 배경

플래그 인수`flag argument`란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수다.

#### 절차

1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다.
2. 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다.

### 11.4 객체 통째로 넘기기

Preserve Whole Object

```js
// before
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (aPlan.withinRange(low, high)) {
}
```

```js
// after
if (aPlan.withinRange(aRoom.daysTempRange));
```

#### 배경

하나의 레코드에서 값 두어 개를 가져와 인수로 넘기는 코드를 보면, 그 값들 대신 레코드를 통째로 넘기고 함수 본문에서 필요한 값들을 꺼내 쓰도록 한다.

#### 절차

1. 매개변수들을 원하는 형태로 받는 빈 함수를 만든다.
2. 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다.
3. 정적 검사를 수행한다.
4. 모든 호출자가 새 함수를 사용하게 수정한다. 하나씩 수정하며 테스트하자.
5. 호출자를 모두 수정했다면 원래 함수를 인라인한다.
6. 새 함수의 이름을 적절히 수정하고 모든 호출자에 반영한다.

### 11.5 매개변수를 질의 함수로 바꾸기

Replace Parameter with Query

- 반대 리팩터링: 질의 함수를 매개변수로 바꾸기
- 1판에서의 이름: 매개변수 세트를 메서드로 전환

```js
// before
availableVacation(anEmployee, anEmployee.grade);

function availableVaction(anEmployee, grade) {}
```

```js
// after
availableVacation(anEmployee);

function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
}
```

#### 배경

매개변수 목록은 함수의 변동 요인을 모아놓은 곳이다. 즉, 함수의 동작에 변화를 줄 수 있는 일차적인 수단이다. 다른 코드와 마찬가지로 이 목록에서도 중복은 피하는 게 좋으며 짧을수록 이해하기 쉽다.

#### 절차

1. 필요하다면 대상 매개변수의 값을 계산하는 코드를 별도 함수로 추출해놓는다.
2. 함수 본문에서 대상 매개변수로의 참조를 모두 찾아서 그 매개변수의 값을 만들어주는 표현식을 참조하도록 바꾼다. 하나 수정할 때마다 테스트한다.
3. 함수 선언 바꾸기로 대상 매개변수를 없앤다.

### 11.6 질의 함수를 매개변수로 바꾸기

Replace Query with Parameter

- 반대 리팩터링: 매개변수를 질의 함수로 바꾸기

```js
// before
targetTemperature(aPlan);

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
}
```

```js
// after
targetTemperature(aPlan, thermostat.currentTemperature);

function targetTemperature(aPlan, currentTemperature) {}
```

#### 배경

함수 안에 두기엔 거북한 참조가 있다. 전역 변수나 제거하길 원하는 원소를 참조하는 경우다. 이 문제는 해당 참조를 매개변수로 바꿔 해결할 수 있다. 참조를 풀어내는 책임을 호출자로 옮기는 것이다.

#### 절차

1. 변수 추출하기로 질의 코드를 함수 본문의 나머지 코드와 분리한다.
2. 함수 본문 중 해당 질의를 호출하지 않는 코드들을 별도 함수로 추출한다.
3. 방금 만든 변수를 인라인하여 제거한다.
4. 원래 함수도 인라인한다.
5. 새 함수의 이름을 원래 함수의 이름으로 고쳐준다.

### 11.7 세터 제거하기

Remove Setting Method

```js
// before
class Person {
  get name() {...}
  set name(aString) {...}
}
```

```js
//after
class Person {
  get name() {...}
}
```

#### 배경

세터 메서드가 있다고 함은 필드가 수정될 수 있다는 뜻이다. 객체 생성 후에는 수정되지 않길 원하는 필드라면 세터를 제공하지 않았을 것이다. 그러면 해당 필드는 오직 생성자에서만 설정되며, 수정하지 않겠다는 의도가 명명백백해지고, 변경될 가능성이 봉쇄된다.

#### 절차

1. 설정해야 할 값을 생성자에서 받지 않는다면 그 값을 받을 매개변수를 생성자에 추가한다. 그런 다음 생성자 안에서 적절한 세터를 호출한다.
2. 생성자 밖에서 세터를 호출하는 곳을 찾아 제거하고, 대신 새로운 생성자를 사용하도록 한다. 하나 수정할 때마다 테스트한다.
3. 세터 메서드를 인라인한다. 가능하다면 해당 필드를 불변으로 만든다.
4. 테스트한다.

### 11.8 생성자를 팩터리 함수로 바꾸기

Replace Constructor with Factory Function

- 1판에서의 이름: 생성자를 팩토리 메서드로 전환

```js
// before
leadEngineer = new Employee(document.leadEngineer, "E");
```

```js
// after
leadEngineer = createEngineer(dcoument.leadEngineer);
```

#### 배경

많은 객체 지향 언어에서 제공하는 생성자는 객체를 초기화하는 특별한 용도의 함수다. 실제로 새로운 객체를 생성할 때면 주로 생성자를 호출한다. 하지만 생성자에는 일반 함수에는 없는 이상한 제역이 따라붙기도 한다. 가령 자바 생성자는 반드시 그 생성자를 정의한 클래스의 인스턴스를 반환해야 한다. 서브클래스의 인스턴스나 프락시를 반환할 수는 없다. 생성자의 이름도 고정되어, 기본 이름보다 더 적절한 이름이 있어도 사용할 수 없다. 생성자를 호출하려면 특별한 연산자(많은 언어에서 new를 쓴다)를 사용해야 해서 일반 함수가 오길 기대하는 자리에는 쓰기 어렵다.

팩터리 함수에는 이런 제약이 없다. 팩터리 함수를 구현하는 과정에서 생성자를 호출할 수는 있지만, 다른 무언가로 대체할 수 있다.

#### 절차

1. 팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.
2. 생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.
3. 하나씩 수정할 때마다 테스트한다.
4. 생성자의 가시 범위가 최소가 되도록 제한한다.

#### 예시

```js
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {
    return this._name;
  }
  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }
  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", S: "Salesperson" };
  }
}

// 호출자 예시 1
candidate = new Employee(document.name, document.empType);

// 호출자 예시 2
const leadEngineer = new Employee(document.leadEngineer, "E");
```

1. 팩터리 함수 만들기. 팩터리 본문은 단순히 생성자에 위임하는 방식으로 구현한다.

```js
function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}
```

2. 생성자를 호출하는 곳을 찾아 수정한다. 한 번에 하나씩, 생성자 대신 팩터리 함수를 사용하게 바꾼다.

```js
cadidate = createEmployee(document.name, document.empType);
```

```js
const leadEngineer = createEmployee(document.leadEngineer, "E");
```

하지만 두 번째 코드는 권장되지 않는다(함수에 문자열 리터럴을 건네는 건 악취로 봐야 한다). 그 대신 직원 유형을 팩터리 함수의 이름에 녹이는 방식을 권한다.

```js
// 호출자
const leadEngineer = createEngineer(document.leadEngineer);

function createEngineer(name) {
  return new Employee(name, "E");
}
```

### 11.9 함수를 명령으로 바꾸기

Replace Function with Command

- 반대 리팩터링: 명령을 함수로 바꾸기
- 1판에서의 이름: 메서드를 메서드 객체로 전환

```js
// before
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
}
```

```js
// after
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }

  execute() {
    this._result = 0;
    this._healthLevel = 0;
  }
}
```

#### 배경

함수는 프로그래밍의 기본적인 빌딩 블록 중 하나다. 그런데 함수를 그 함수만을 위한 객체 안으로 캡슐화하면 더 유용해지는 상황이 있다. 이런 객체를 가리켜 '명령 객체' 혹은 단순히 '명령`command`'이라 한다. 명령 객체 대부분은 메서드 하나로 구성되며, 이 메서드를 요청해 실행하는 것이 이 객체의 목적이다.

#### 절차

1. 대상 함수의 기능을 옮길 빈 클래스를 만든다. 클래스 이름은 함수 이름에 기초해 짓는다.
2. 방금 생성한 빈 클래스로 함수를 옮긴다.
3. 함수의 인수들 각각은 명령의 필드로 만들어 생성자를 통해 설정할지 고민해본다.

### 11.10 명령을 함수로 바꾸기

Replace Command with Function

- 반대 리팩터링: 함수를 명령으로 바꾸기

```js
// before
class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer;
    this._usage = usage;
  }
  execute() {
    return this._customer.rate * this._usage;
  }
}
```

```js
// after
function charge(customer, usage) {
  return customer.rate * usage;
}
```

#### 배경

명령 객체는 복잡한 연산을 다룰 수 있는 강력한 매커니즘을 제공한다. 구체적으로는, 큰 연산 하나를 여러 개의 작은 메서드로 쪼개고 필드를 이용해 쪼개진 메서드들끼리 정보를 공유할 수 있다. 또한 어떤 메서드를 호출하냐에 따라 다른 효과를 줄 수 있고 각 단계를 거치며 데이터를 조금씩 완성해갈 수도 있다.

명령의 로직이 크게 복잡하지 않다면 명령 객체는 장점보다 단점이 크니 평범한 함수로 바꿔주는 게 낫다.

#### 절차

1. 명령을 생성하는 코드와 명령의 실행 메서드를 호출하는 코드를 함께 함수로 추출한다.
2. 명령의 실행 함수가 호출하는 보조 메서드들 각각을 인라인한다.
3. 함수 선언 바꾸기를 적용하여 생성자의 매개변수 모두를 명령의 실행 메서드로 옮긴다.
4. 명령의 실행 메서드에서 참조하는 필드들 대신 대응하는 매개변수를 사용하게끔 바꾼다. 하나씩 수정할 때마다 테스트한다.
5. 생성자 호출과 명령의 실행 메서드 호출을 호출자(대체 함수) 안으로 인라인한다.
6. 테스트한다.
7. 죽은 코드 제거하기로 명령 클래스를 없앤다.

### 11.11 수정된 값 반환하기

Return Modified Value

```js
// before
let totalAscent = 0;
calculateAscent();

function calculateAscent() {
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    totalAscent += verticalChange > 0 ? verticalChange : 0;
  }
}
```

```js
// after
const totalAscent = calculateAscent();

function calculateAscent() {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    result += verticalChange > 0 ? verticalChange : 0;
  }
  return result;
}
```

#### 배경

데이터가 수정되는 흐름과 코드의 흐름을 일치시키가 어렵다. 그래서 데이터가 수정된다면 그 사실을 명확히 알려주어서, 어느 함수가 무슨일을 하는지 쉽게 알 수 있게 하는 일이 대단히 중요하다.

#### 절차

1. 함수가 수정된 값을 반환하게 하여 호출자가 그 값을 자신의 변수에 저장하게 한다.
2. 테스트한다.
3. 피호출 함수 안에 반환할 값을 가리키는 새로운 변수를 선언한다.
4. 테스트한다.
5. 계산이 선언과 동시에 이뤄지도록 통합한다(즉, 선언 시점에 계산 로직을 바로 실행해 대입한다).
6. 테스트한다.
7. 피호출 함수의 변수 이름을 새 역할에 어울리도록 바꿔준다.
8. 테스트한다.

### 11.12 오류 코드를 예외로 바꾸기

Replace Error Code with Exception

```js
// before
if (data) {
  return new ShippingRules(data);
} else {
  return -23;
}
```

```js
// after
if (data) {
  return new ShippingRules(data);
} else {
  throw new OrderProcessingError(-23);
}
```

#### 배경

예외는 프로그래밍 언어에서 제공하는 독립적인 오류 처리 메커니즘이다. 오류가 발견되면 예외를 던진다. 그러면 적절한 예외 핸들러를 찾을 때까지 콜스택을 타고 위로 전파된다. 예외를 사용하면 오류 코드를 일일이 검사하거나 오류를 식별해 콜스택 위로 던지는 일을 신경 쓰지 않아도 된다. 예외는 독자적인 흐름이 있어서 프로그램의 나머지에는 오류 발생에 따른 복잡한 상황에 대처하는 코드를 작성하거나 읽을 일이 없게 해준다.

#### 절차

1. 콜스택 상위에 해당 예외를 처리할 예외 핸들러를 작성한다.
2. 테스트한다.
3. 해당 오류 코드를 대체할 예외와 그 밖의 예외를 구분할 식별 방법을 찾는다.
4. 정적 검사를 수행한다.
5. catch절을 수정하여 직접 처리할 수 있는 예외는 적절히 대처하고 그렇지 않은 예외는 다시 던진다.
6. 테스트한다.
7. 오류 코드를 반환하는 곳 모두에서 예외를 던지도록 수정한다. 하나씩 수정할 때마다 테스트한다.
8. 모두 수정했다면 그 오류 코드를 콜스택 위로 전달하는 코드를 모두 제거한다. 하나씩 수정할 때마다 테스트한다.

### 11.13 예외를 사전확인으로 바꾸기

Replace Exception with Precheck

- 1판에서의 이름: 예외 처리를 테스트로 교체

```js
// before
double getValueForPeriod (int periodNumber) {
  try {
    return values[periodNumber];
  } catch (ArrayIndexOutOfBoundsException e){
    return 0;
  }
}
```

```js
// after
double getValueForPeriod (int periodNumber) {
  return (periodNumber >= values.length) ? 0 : values[periodNumber];
}
```

#### 배경

예외라는 개념은 프로그래밍 언어의 발전에 의미 있는 한걸음이었다. 오류 코드를 연쇄적으로 전파하던 긴 코드를 예외로 바꿔 깔끔히 제거할 수 있게 되었으니 말이다(오류 코드를 예외로 바꾸기11.12). 하지만 좋은 것들이 늘 그렇듯, 예외도 (더 이상 좋지 않을 정도까지) 과용되곤 한다. 예외는 '뜻밖의 오류'라는, 말 그대로 예외적으로 동작할 때만 쓰여야 한다. 함수 수행 시 문제가 될 수 있는 조건을 함수 호출 전에 검사할 수 있다면, 예외를 던지는 대신 호출하는 곳에서 조건을 검사하도록 해야 한다.

#### 절차

1. 예외를 유발하는 상황을 검사할 수 있는 조건문을 추가한다. catch 블록의 코드를 조건문의 조건절 중 하나로 옮기고, 남은 try 블록의 코드를 다른 조건절로 옮긴다.
2. catch 블록에 어서션을 추가하고 테스트한다.
3. try문과 catch 블록을 제거한다.
4. 테스트한다.

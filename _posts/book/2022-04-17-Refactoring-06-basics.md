---
title: "[Book] Refactoring: 6 기본적인 리팩터링"
date: 2022-03-08 23:25:00
categories:
  - Book
tags:
  - [Book, Refactoring]

toc: true
toc_sticky: true
---

# 리팩터링

출처: 리팩터링 2판, 마틴 파울러

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

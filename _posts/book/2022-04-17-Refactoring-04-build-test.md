---
title: "[Book] Refactoring: 4 테스트 구축하기"
date: 2022-03-06 23:25:00
categories:
  - Book
tags:
  - [Book, Refactoring]

toc: true
toc_sticky: true
---

# 리팩터링

출처: 리팩터링 2판, 마틴 파울러

## 01 리팩터링: 첫 번째 예시

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

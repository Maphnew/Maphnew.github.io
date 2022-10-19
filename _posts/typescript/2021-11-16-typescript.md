---
title: "Understanding TypeScript"
date: 2021-11-16 22:06:00
categories:
  - TypeScript
tags:
  - [Frontend, TypeScript]
toc: true
toc_sticky: true
---

# Understanding TypeScript - Udemy, Maximilian

## Section 1: Getting Started

## Section 2: TypeScript Basics & Basic Types

### 16. Object Types

```ts
const person: {
  name: string;
  age: number;
} = {
  name: "Maphanew",
  age: 35,
};

console.log(person.name);
```

### 18. Arrays Types

```ts
const person = {
  name: "Maphanew",
  age: 35,
  hobbies: ["Sports", "Cooking"],
};

let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person.name);
```

### 19. Working with Tuples

```ts
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "Maphanew",
  age: 35,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author"],
};

// person.role.push('admin');
// person.role[1] = 11; // error

// person.role = [0, 'admin', 'user']; // error

console.log(person);
```

### 20. Woring with Enums

```ts
// app.ts
enum Role {
  ADMIN = 5,
  READ_ONLY, // 6
  AUTHOR, // 7
}

const person = {
  name: "Maphanew",
  age: 35,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log(person);
}
```

```
npx tsc app.ts
```

```js
// app.js
var Role;
(function (Role) {
  Role[(Role["ADMIN"] = 0)] = "ADMIN";
  Role[(Role["READ_ONLY"] = 1)] = "READ_ONLY";
  Role[(Role["AUTHOR"] = 2)] = "AUTHOR";
})(Role || (Role = {}));
var person = {
  name: "Maphanew",
  age: 35,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};
if (person.role === Role.ADMIN) {
  console.log(person);
}
```

## Section5: Class & Interface

### 57. Module Content

- What & Why?
- Classes & Inheritance
- Interfaces

### 58. What is OOP?

- Work with real-life entities in your code.
- Class & Instance

### 59. Class

```ts
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}
const accounting = new Department("Accounting");
console.log(accounting); // Department {name: 'Accounting'}
```

### 60. ES5로 컴파일

- es5에서는 즉시실행함수를 이용한 constructor 함수를 이용해 class를 구현한다.

```js
var Department = (function () {
  function Department(n) {
    this.name = n;
  }
  return Department;
})();
```

### 61. 생성자 함수 및 this 키워드

- class의 생성자함수는 constructor이다. this는 생성된 인스턴스를 참조한다.
- 메소드 내에서 this 타입을 class로 지정하면 오류를 줄일 수 있다.

```ts
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  describe() {
    console.log("Department: " + this.name);
  }
}
const accounting = new Department("Accounting");
const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // Department: undefined
// describe 메소드가 accountingCopy를 참조하기 때문
```

```ts
  describe(this: Department) { // this가 Department 타입만 참조하도록 정의
    console.log('Department: ' + this.name);
  }

  const accountingCopy = { name: 'AccountingCopy', describe: accounting.describe }; // name filed 추가하면 정상작동
```

### 62. public, private access modifier

- field access modifier를 이용해 외부에서 접근할 수 없도록 할 수 있다.

```ts
class Department {
  name: string;
  employees: string[] = [];
  constructor(n: string) {
    this.name = n;
  }
  describe() {
    console.log("Department: " + this.name);
  }
}

accounting.employees[2] = "Anna"; // it works (employees is public)
```

```ts
class Department {
  name: string;
  private employees: string[] = [];
  constructor(n: string) {
    this.name = n;
  }
  describe() {
    console.log("Department: " + this.name);
  }
  addEmployee(name: string) {
    this.employees.push(name);
  }
}

accounting.addEmployee("Maph"); // this works normal way
```

### 63. 약식 초기화

- 생성자 함수의 파라미터를 정의할 때 약식으로 할 수 있다.

```ts
class Department {
  constructor(private id: string, public name: string) {
    // nothing
  }
  // ...
}
```

### 64. 읽기전용 속성

- readonly 한정자를 이용 쓰기를 불가능하게 할 수 있다.

```ts
class Department {
  constructor(private readonly id: string, public name: string) {
    // readonly 속성
    // nothing
  }
  // ...
}
```

### 65. 상속

- 상속 받을 때 extends 키워드를 사용하고 부모 생성자 함수를 호출할 때 super 키워드를 사용한다.
- this는 super 뒤에 사용 가능하다.

```ts
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins; // super 뒤에 this 사용 가능
  }
}
```

### 66. 속성 및 protected access modifier 재정의

- private 수정자는 extends 된(상속 된) 클래스에서 사용 불가하다.
- protected 수정자는 상속된 클래스에서 사용가능 하면서 외부에서 접근 불가한 한정자이다.
- 배이스 클래스 메소드를 override 할 수 있다.

```ts
class Department {
  protected employee: string[] = [];
  constructor(private readonly id: string, public name: string) {
    // nothing
  }
  addEmployee(name: string) {
    this.employee.push(name);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins; // super 뒤에 this 사용 가능
  }
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }
}

const it = new ITDepartment("d1", []);
it.addEmployee("Maph");
```

### 67. getter and setter

- get, set 키워드를 이용해 getter, setter를 생성할 수 있는데, 좋은 점은 변수와 같은 방식으로 접근이 가능하고 복잡한 로직을 추가할 수 있다는 것이다.(예외 처리 등)

```ts
// GETTER
// inside a class...
  get mostRecentReport() {
    if(this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found');
  }
// outside the class...
console.log(accounting.mostRecentReport); // mostRecentReport() 처럼 호출하지 않음. 변수처럼 접근
```

```ts
// SETTER
// inside a class...
  set mostRecentReport(value: string) {
    this.addReport(value);
  }
// outside the class...
accounting.mostRecentReport = 'Year end report'; // 변수처럼 접근
```

### 68. 정적 메서드, 정적 속성(field)

- static 메서드 또는 속성을 설정해 class에 직접 접근하여 호출 할 수 있다. 그룹화 메커니즘으로 사용하려는 의도이다.

```ts
// 예)
Math.pow(); // 클래스에 직접 접근 -> static 메서드 사용가능 -> 클래스를 그룹화 메커니즘으로 사용
// inside a class...
  static createEmployee(name: string) {
    return {name: name}
  }
// outside the class...
const employee1 = Department.createEmployee('Max');
console.log(employee1); // {name: 'Max'}
```

### 69. 추상클래스

- 추상클래스는 인스턴스화 될 수 없다. 추상 메서드는 상속받는 클래스에서 정의된다.

```ts
abstract class Department {
  // ...
  abstract describe(this: Department): void {
    // ...
  }
  // ...
}
```

### 70. 싱글톤 & private constructor

- singleton pattern 구현을 위햐 private constructor를 사용한다.
- 외부에서 new로 인스턴스를 생성할 수 없고 내부에서만 가능하다.

```ts
class AccountingDepartment {
  private static instance: AccountingDepartment;
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }
  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }
}

const accounting = AccountingDepartment.getInstance();
// class 밖에서 new 사용안됨
```

### 71. 클래스 요약

- class
- property
- access modifier
- private 내부 접근 제어자
- protected 상속클래스에서의 접근 제어자
- public 모든 곳에서 접근
- static method
- static property
- abstract method, class
- extends

### 72. 첫 번째 인터페이스

- 인터페이스는 객체의 구조를 설명한다.
- 클래스처럼 청샂ㄴ으로 사용하지 않고 사용자 정의 타입으로 사용한다.

```ts
interface Person {
  name: string;
  age: number;
  greeting(phrase: string): void;
}
let user1: Person;
user1 = {
  name: "Maph",
  age: 36,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};
user1.greet("Hi, I am"); // 'Hi, I am Maph'
```

### 73. 클래스와 인터페이스 사용하기

- type, abstract class와 다르게 구조 설명만을 위해 사용한다.
- 인터페이스는 구체적인 구현이 아닌 서로 다른 클래스간의 기능을 공유하기 위해 사용된다.
- 추상 클래스와 차이점은 추상 클래스는 구체적 구현 부분을 혼합할 수 있다는 것이다.

```ts
interface Greetable {
  name: string;
  greet(phrase: string): void;
}
class Person implements Greetable {
  // ...
}
```

### 74. Why interface

- 인터페이스는 구현된 객체 또는 클래스의 구조를 짐작할 수 있게 한다.
- 같은 interface로 구현하는 다른 클래스가 있다면 해당 interface에 있는 메소드가 항상 그 클래스들에게 존재한다는 것을 알 수 있고 꼭 구현해야 하는 것을 알 수 있다.

### 75. 읽기전용 인터페이스 속성

- 읽기전용 속성은 한번만 정의할 수 있고 초기화되면 변경할 수 없다. 해당 인터페이스로 구현된 클래스에서도 적용이 된다.

```ts
interface Greetable {
  readonly name: string;
  greet(phrase: string): void;
}
```

### 76. 인터페이스 확장하기

- 인터페이스는 다수의 인터페이스로부터 상속 받을 수 있지만 클래스는 오직 하나의 부모 클래스로 부터 상속받을 수 있다.

```ts
interface Named {
  readonly name: string;
}
interface Greetable extends Named {
  // 상속받는 interface에서 다시 name을 정의할 필요 없다.
  greet(phrase: string): void;
}
```

### 77. 함수타입으로서의 인터페이스

```ts
interface AddFn {
  (a: number, b: number): number;
}
let add: AddFn;
add: (n1: number, n2: number) => {
  return n1 + n2;
};
```

- type으로 정의하면 아래와 같다.

```ts
type AddFn = (a: number, b: number) => number;
```

### 78. 선택적 매개변수 & 속성

- 유연성을 제공하는 옵셔널 매개변수와 속성이 있다.

```ts
interface Named {
  name?: string;
  greet?(): void;
}
```

```ts
constructor(n?: string) {
  // ...
}
```

### 79. JS로 interface 컴파일

- 컴파일 뒤엔 interface가 남아있지 않느다. 개발과 컴파일에만 사용된다.

## Section6: 고급타입

### 82. 모듈 콘텐트

- Intersection types
- Type guards
- Discriminated unions
- Type casting
- Function overloads

### 83. 인터섹션타입

- 인터섹션 타입은 '&'을 이용하는데, 객체타입일 경우 속성의 조합, 유니언 타입은 공통부분만 가져간다.

```ts
type Admin = {
  name: string;
  privieges: string[];
};
type Employee = {
  name: string;
  startDate: Date;
};
type ElevatedEmployee = Admin & Employee;
const e1: ElevatedEmployee = {
  name: "Maph",
  privileges: ["create-server"],
  startDate: new Date(),
};
```

```ts
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;
// Universal: number;
```

### 84. 타입가드에 대한 추가정보

- 타입가드는 특정속성이나 메소드를 사용하기 전에 그것이 존재하는지 확인하거나 타입을 사용하기 전에 이 타입으로 어떤 작업을 수행할 수 있는지를 확인하는 개념 또는 방식을 나타내는 용어이다.

```ts
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

```ts
type UnknownEmployee = Employee | Admin;
function printEmployeeInfo(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log(emp.privileges);
  }
  if ("startDate" in emp) {
    console.log(emp.startDate);
  }
}
```

```ts
// object 또는 class일 경우
if (vehicle instanceof Truck) {
  vehicle.loadCargo(1000);
}
```

### 85. 구별된 유니언

- 구별된 유니언(Discriminated Union)은 타입가드를 쉽게 구현할 수 있도록 공통속성을 갖도록하는 패턴이다.

```ts
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}
interface Horse {
  type: 'horse';
  runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch(animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case: 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log('Moving at speed: ' + speed);
}
moveAnimal({type: 'bird', flyingSpeed: 10});
```

### 86. 타입 캐스팅(형 변환)

- 타입스크립트는 DOM에서 element를 정의할 때 null일 가능성이 있다고 인식한다.
- getElementById를 이용해 id로 정의할 떄는 어떤 종류인지 인식하지 못하고 HTMLElement인 것만 인식한다.
- null이 아니라고 정의할 떄 '!'를 붙여주고, 타입 변환을 위해서는 'as HTMLInputElement'와 같이 타입을 명시해 준다.

```ts
const paragraph = document.querySelect("p"); // HTMLParagraphElement | null
```

```ts
const paragraph = document.getElementById("message-output"); // HTMLElement | null
```

```ts
// not null
const userInput = document.getElementById("messages-output")!; // HTMLElement
```

```ts
// type casting (React JSX구문과 충돌 가능성이 있음)
const userInput = <HTMLInputElement>document.getElementById("messages-output")!; // HTMLInputElement
```

```ts
// type casting
const userInput = document.getElementById(
  "messages-output"
)! as HTMLInputElement; // HTMLInputElement
```

### 87. 인덱스 속성

- 사용하고자 하는 속성의 이름과 필요한 속성의 개수를 미리 알지 못할 때 인덱스 속성을 이용해 유연한 타입을 만들 수 있다.

```ts
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a vaild email",
  userName: "Must start with ...",
  // ...
};
```

### 88. 함수 오버로드

- 타입스크립트가 자체적으로 반환 타입을 정확인 추론하지 못할 때 명확히 하기위해 오버로드를 사용한다.

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("Maph", "Kim"); // string
```

### 89. Optional Chaining 선택적 체이닝

- 데이터에 속성이 존재하는지 정확히 알지 못할 때 사용한다.

```ts
console.log(data?.job?.title);
```

### 90. Null 병합

- null 또는 undefined를 걸러내기 위해 Null 병합을 사용한다.

```ts
const storedData = userInput ?? "Default";
```

### 91. 마무리

- 고급 타입을 알아보았다.

## Section 7: Generics

### 93. 소개

- What?
- Generic Function & Classes
- Constraints
- Special Typescript Types

### 94. 내장 제네릭

- 내장 제네릭이 있다.

```ts
const names: string[] = [];
const names: Array<string> = [];
const names: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});
```

### 95. 제네릭 함수 생성하기

- 제네릭 함수를 이용해 타입을 유연하게 구성할 수 있다.

```ts
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Max" }, { age: 30 });
```

### 96. 제약조건 작업하기

- 제약 조건을 두면 범위를 좁혀 파라미터의 타입을 구성할 수 있다.

```ts
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
```

### 97. 다른 일반 함수

- 제약 조건을 이용할 때, 특정 interface 또는 type의 구조를 따르는 파라미터를 받는 함수를 생성할 수 있다.

```ts
interface Lengthy {
  length: number;
}
function countAndDescibe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value";
  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements`;
  }
  return [element, descriptionText];
}
console.log(countAndDescibe("Hi there!"));
```

### 98. keyof 제약조건

- keyof 제약조건으로 object의 key 타입을 적용할 수 있다.

```ts
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value: ${obj[key]}`;
}
extractAndConvert({ name: "maph" }, "name");
```

### 99. Generic class

- 제네릭타입으로 유연하지만 안전성 높은 클래스를 생성할 수 있다.

```ts
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItems('Papa');
textStorage.addItems('Mama');
textStorage.removeItems('Mama');
console.log(.textStorage.getItems());
```

### 100. 요약

- 전달하거나 사용되는 값을 타입을 유연하게 지정할 수 있고, 때에 따라 제약사항을 적용하면 범위를 좁힐 수 있다.

### 101. 제네릭 유틸리티 타입

- Partial, Readonly와 같은 유용한 유틸리티 타입이 많이 있다.

```ts
interface CourseGoal {
  title: string;
  desc: string;
  complete: Date;
}
function createCourseGoal(title: string, desc: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // 일시적으로 속성들을 옵셔널로 만들고 싶을 때 사용
  courseGoal.title = title;
  courseGoal.desc = desc;
  courseGoal.date = date;
  return courseGoal as CourseGoal;
}

const names: ReadOnly<string[]> = ["Max", "Manu"];
// names.push('Anna'); // error
```

### 102. 제네릭타입 vs 유니언타입

- 두 타입의 차이를 잘 알고 사용하자

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

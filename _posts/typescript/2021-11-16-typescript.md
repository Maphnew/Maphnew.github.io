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

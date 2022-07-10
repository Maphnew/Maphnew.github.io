---
title: "[Algorithm] Practice"
date: 2022-07-13 23:43:00

categories:
  - Algorithm
tags:
  - [Algorithm]

toc: true
toc_sticky: true
---

## Practice

<small><cite>ref: https://www.udemy.com/course/best-javascript-data-structures/</cite></small>

### Frequency Counter - sameFrequency

Write a function called **sameFrequency**. Given two positive integers, find out if the two numbers have the same frequency of digits.

Your solution MUST have the following complexities

Time complexity: O(N)

- Sample input

```js
sameFrequency(182, 281); // true
sameFrequency(32, 14); // false
sameFrequency(3589578, 5879385); // true
sameFrequency(22, 222); // false
```

```js
function sameFrequency(first, second) {
  if (first.toString().length !== second.toString().length) {
    return false;
  }
  let lookup = {};
  for (const num of first.toString()) {
    lookup[num] = lookup[num] ? (lookup[num] += 1) : 1;
  }
  for (const num of second.toString()) {
    if (lookup[num]) {
      lookup[num] -= 1;
    } else {
      return false;
    }
  }
  console.log(`first: ${first}, second: ${second}, return: true`);
  return true;
}
```

```js
// Colt's Solution
function sameFrequency(num1, num2) {
  let strNum1 = num1.toString();
  let strNum2 = num2.toString();
  if (strNum1.length !== strNum2.length) return false;

  let countNum1 = {};
  let countNum2 = {};

  for (let i = 0; i < strNum1.length; i++) {
    countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1;
  }

  for (let j = 0; j < strNum1.length; j++) {
    countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1;
  }

  for (let key in countNum1) {
    if (countNum1[key] !== countNum2[key]) return false;
  }

  return true;
}
```

### Frequency Counter / Mutiple Pointers - areThereDuplicates

Implement a function called, **areThereDuplicates** which accepts a **variable number of arguments**, and checks whether there are any duplicates among the arguments passed in.
You can solve this using the frequency counter pattern OR the multiple pointers pattern.

Restrictions:  
 Time - O(n)  
 Space - O(n)

Bonus:  
 Time - O(n log n)  
 Space - O(1)

```js
// Examples:
console.log(areThereDuplicatesFC(1, 2, 3)); // false
console.log(areThereDuplicatesFC(1, 2, 2)); // true
console.log(areThereDuplicatesFC("a", "b", "c", "a")); // true
```

```js
// frequency counter pattern
function areThereDuplicatesFC() {
  if (!arguments.length) return false;
  let lookup = {};
  for (let arg of arguments) {
    lookup[arg] ? (lookup[arg] += 1) : (lookup[arg] = 1);
  }
  for (let val in lookup) {
    if (lookup[val] > 1) return true;
  }
  return false;
}
```

```js
// Colt's Solution
// frequency counter pattern

function areThereDuplicates() {
  let collection = {};
  for (let val in arguments) {
    collection[arguments[val]] = (collection[arguments[val]] || 0) + 1;
  }
  for (let key in collection) {
    if (collection[key] > 1) return true;
  }
  return false;
}

// multiple pointers pattern

function areThereDuplicates(...args) {
  // Two pointers
  args.sort((a, b) => a > b);
  let start = 0;
  let next = 1;
  while (next < args.length) {
    if (args[start] === args[next]) {
      return true;
    }
    start++;
    next++;
  }
  return false;
}

// one liner pattern

function areThereDuplicates() {
  return new Set(arguments).size !== arguments.length;
}
```

### Multiple Pointers - averagePair

Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

Bonus Constraints:  
Time: O(N)  
Space: O(1)

```js
function averagePair(arr, num) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let avg = (arr[start] + arr[end]) / 2;
    if (avg === num) return true;
    else if (avg < num) start++;
    else end--;
  }
  return false;
}

const result1 = averagePair([1, 2, 3], 2.5); // true
const result2 = averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8); // true
const result3 = averagePair([-1, 0, 3, 4, 5, 6], 4.1); // false
const result4 = averagePair([], 4); // false
console.log(result1, result2, result3, result4);
```

### Multiple Pointers - isSubsequence

Write a function called **isSubsequence** which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, **without their order changing.**

AT LEAST  
Time Complexity - O(N + M)  
Space Complexity - O(1)

```js
// Examples:
const isSub1 = isSubsequence("hello", "hello world"); // true
const isSub2 = isSubsequence("sing", "sting"); // true
const isSub3 = isSubsequence("abc", "abracadabra"); // true
const isSub4 = isSubsequence("abc", "acb"); // false (order matters)
```

```js
function isSubsequence(str1, str2) {
  var i = 0;
  for (var j = 0; j < str2.length; j++) {
    if (str1[i] === str2[j]) {
      i++;
    }
    if (str1.length === i) {
      return true;
    }
  }
  return false;
}
```

```js
// Colt's Solution

function isSubsequence(str1, str2) {
  var i = 0;
  var j = 0;
  if (!str1) return true;
  while (j < str2.length) {
    if (str2[j] === str1[i]) i++;
    if (i === str1.length) return true;
    j++;
  }
  return false;
}

// Colt's Solution2 - O(1) 공간이 아닌 재귀

function isSubsequence(str1, str2) {
  if (str1.length === 0) return true;
  if (str2.length === 0) return false;
  if (str2[0] === str1[0]) return isSubsequence(str1.slice(1), str2.slice(1));
  return isSubsequence(str1, str2.slice(1));
}
```

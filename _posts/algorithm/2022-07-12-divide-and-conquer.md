---
title: "[Algorithm] Divide and Conquer"
date: 2022-07-11 20:43:00

categories:
  - Algorithm
tags:
  - [Algorithm]

toc: true
toc_sticky: true
---

## DIVIDE AND CONQUER

<small><cite>ref: https://www.udemy.com/course/best-javascript-data-structures/</cite></small>

This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data

This pattern can tremendously decrease **time complexity**

### AN EXAMPLE

Given a **sorted** array of integers, write a function called search, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1

```js
search([1, 2, 3, 4, 5, 6], 4); // 3
search([1, 2, 3, 4, 5, 6], 6); // 5
search([1, 2, 3, 4, 5, 6], 11); // -1
```

#### A NAIVE SOLUTION

Linear Search

Time Complexity O(N)

```js
function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      return i;
    }
  }
  return -1;
}
```

#### REFACTOR

Time Complexity - Log(N) - Binary Search

```js
function search(array, val) {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];

    if (array[middle] < val) {
      min = middle + 1;
    } else if (array[middle] > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}

const result1 = search([1, 2, 3, 4, 5, 6], 4); // 3
const result2 = search([1, 2, 3, 4, 5, 6], 6); // 5
const result3 = search([1, 2, 3, 4, 5, 6], 11); // -1
console.log(result1, result2, result3);
```

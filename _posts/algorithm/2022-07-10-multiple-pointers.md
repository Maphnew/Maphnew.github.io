---
title: "[Algorithm] Multiple Pointers"
date: 2022-07-10 20:43:00

categories:
  - Algorithm
tags:
  - [Algorithm]

toc: true
toc_sticky: true
---

## MULTIPLE POINTERS

Creating pointers or values that correspond to an index or position and move towards the begining, end or middle based on a certain condition

Very efficient for solving problems with minimal space complexity as well

### AN EXAMPLE

Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist

```js
sumZero([-3, -2, -1, 0, 1, 2, 3]); // [-3, 3]
sumZero([-2, 0, 1, 3]); // undefined
sumZero([1, 2, 3]); // undefined
```

#### A NAIVE SOLUTION

Time Complexity - O(N^2)  
Space Complexity - O(1)

```js
function sumZero(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i+1;, j < arr.length; j ++) {
            if(arr[i] + arr[j] === 0) {
                return [arr[i], arr[j]];
            }
        }
    }
}
```

#### REFACTORED

Time Complexity - O(N)
Space Complexity - O(1)

```js
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}
```

### countUniqueValues

Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted

```js
// Maph's Solution
function countUniqueValues(array) {
  let result = 0;
  const noMeaningResult = array.reduce((prev, current) => {
    if (prev !== current) {
      result += 1;
    }
    return current;
  }, 0);
  return result;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4
```

```js
// Colt's Solution

function countUniqueValuesByColt(arr) {
  if (arr.length === 0) return 0;
  var i = 0;
  for (var j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

console.log(countUniqueValuesByColt([1, 1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValuesByColt([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValuesByColt([])); // 0
console.log(countUniqueValuesByColt([-2, -1, -1, 0, 1])); // 4
```

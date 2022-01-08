---
title: "React antd searchable tree 구축하기"
date: 2022-01-08 18:57:00
categories:
  - React
tags:
  - [Frontend, React]
toc: true
toc_sticky: true
---

# Ant design Searchable Tree 따라하기!

- 검색에 따라 트리 노드 중 검색어에 부합하는 노드들이 보여지고, 그 노드의 부모 노드가 열리는 로직을 따라해 보자.

## 1. 준비하기

- [Ant design compoent의 tree 메뉴](https://ant.design/components/tree/)에서 Searchable Tree를 따라 만들어 보았다. [Setting up antd searchable tree Branch](https://github.com/Maphnew/playground/tree/01-Setting-up-antd-searchable-tree)

### 1-1. 코드 탐색

- 주요 로직은 다음과 같다.

1. generateData 함수: tree에 들어갈 데이터를 생성한다.
2. generateList 함수: tree구조(json)의 데이터를 array형태로 바꾼다.
3. getParentKey 함수: 부모 key를 찾는다.
4. onExpand 함수: tree구조가 확장되면 expandKeys와 autoExpandParent 상태를 변경한다.
5. onChange 함수: 검색어가 변하면 검색된 노드와 부모 노드를 찾아 exandedKeys에 적용하고 searchValue와 setAutoExpandParent 상태를 변화시킨다.
6. loop 함수: tree 데이터를 인자로 받아 노드에 검색어가 포함되는지 찾아 해당 부분을 css로 색상 변경을 적용 시키는 함수.

### 1-2. 적용되는 데이터 형태 탐색

- tree 데이터와 dataList를 살펴보자.

- gData변수에 담긴 json 형태의 tree 데이터이다. key와 title이 같다.

```js
// gData
[
  {
    key: "0-0",
    title: "0-0",
    children: [
      {
        key: "0-0-0",
        title: "0-0-0",
        children: [
          { key: "0-0-0-0", title: "0-0-0-0" },
          { key: "0-0-0-1", title: "0-0-0-1" },
          { key: "0-0-0-2", title: "0-0-0-2" },
        ],
      },
      {
        key: "0-0-1",
        title: "0-0-1",
        children: [
          { key: "0-0-1-0", title: "0-0-1-0" },
          { key: "0-0-1-1", title: "0-0-1-1" },
          { key: "0-0-1-2", title: "0-0-1-2" },
        ],
      },
      {
        key: "0-0-2",
        title: "0-0-2",
      },
    ],
  },
  {
    key: "0-1",
    title: "0-1",
    children: [
      {
        key: "0-1-0",
        title: "0-1-0",
        children: [
          { key: "0-1-0-0", title: "0-1-0-0" },
          { key: "0-1-0-1", title: "0-1-0-1" },
          { key: "0-1-0-2", title: "0-1-0-2" },
        ],
      },
      {
        key: "0-1-1",
        title: "0-1-1",
        children: [
          { key: "0-1-1-0", title: "0-1-1-0" },
          { key: "0-1-1-1", title: "0-1-1-1" },
          { key: "0-1-1-2", title: "0-1-1-2" },
        ],
      },
      {
        key: "0-1-2",
        title: "0-1-2",
      },
    ],
  },
  {
    key: "0-2",
    title: "0-2",
  },
];
```

- 모든 노드를 list형태로 줄지어 놓았다. tree를 확장시킬 때 쉽게 찾기위해 전처리한 것이다.

```js
// dataList
[
  { key: "0-0", title: "0-0" },
  { key: "0-0-0", title: "0-0-0" },
  { key: "0-0-0-0", title: "0-0-0-0" },
  { key: "0-0-0-1", title: "0-0-0-1" },
  { key: "0-0-0-2", title: "0-0-0-2" },
  { key: "0-0-1", title: "0-0-1" },
  { key: "0-0-1-0", title: "0-0-1-0" },
  { key: "0-0-1-1", title: "0-0-1-1" },
  { key: "0-0-1-2", title: "0-0-1-2" },
  { key: "0-0-2", title: "0-0-2" },
  { key: "0-1", title: "0-1" },
  { key: "0-1-0", title: "0-1-0" },
  { key: "0-1-0-0", title: "0-1-0-0" },
  { key: "0-1-0-1", title: "0-1-0-1" },
  { key: "0-1-0-2", title: "0-1-0-2" },
  { key: "0-1-1", title: "0-1-1" },
  { key: "0-1-1-0", title: "0-1-1-0" },
  { key: "0-1-1-1", title: "0-1-1-1" },
  { key: "0-1-1-2", title: "0-1-1-2" },
  { key: "0-1-2", title: "0-1-2" },
  { key: "0-2", title: "0-2" },
];
```

## 2. 응용하기

1. key값과 title값이 달라도 잘 동작할까?
2. title이 만약 컴포넌트라면 어떻게 Searchable tree를 구축해야 할까?
3. 마무리

### 2-1. key값과 title값이 달라도 잘 동작할까?

#### 2-1-1. 실패하기

- key와 title을 다르게 해서 실행시켜보자.
- 우선 gData를 하드코딩으로 변환한다.
- generateData 함수를 사용하지 않고 gData 변수에 바로 데이터를 넣자.

```js
// const x = 3;
// const y = 2;
// const z = 1;
// const gData = [];

// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || "0";
//   const tns = _tns || gData;

//   const children = [];
//   for (let i = 0; i < x; i++) {
//     // 3 - 3개의 노드를 만들 것이다.
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key });
//     if (i < y) {
//       // 2 - 2로 끝나는 노드 부터는 children이 없다.
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z); // 1 - tree의 depth가 2단계이다.

const gData = [
  {
    key: "0-0",
    title: "0-0",
    children: [
      {
        key: "0-0-0",
        title: "0-0-0",
        children: [
          { key: "0-0-0-0", title: "0-0-0-0" },
          { key: "0-0-0-1", title: "0-0-0-1" },
          { key: "0-0-0-2", title: "0-0-0-2" },
        ],
      },
      {
        key: "0-0-1",
        title: "0-0-1",
        children: [
          { key: "0-0-1-0", title: "0-0-1-0" },
          { key: "0-0-1-1", title: "0-0-1-1" },
          { key: "0-0-1-2", title: "0-0-1-2" },
        ],
      },
      {
        key: "0-0-2",
        title: "0-0-2",
      },
    ],
  },
  {
    key: "0-1",
    title: "0-1",
    children: [
      {
        key: "0-1-0",
        title: "0-1-0",
        children: [
          { key: "0-1-0-0", title: "0-1-0-0" },
          { key: "0-1-0-1", title: "0-1-0-1" },
          { key: "0-1-0-2", title: "0-1-0-2" },
        ],
      },
      {
        key: "0-1-1",
        title: "0-1-1",
        children: [
          { key: "0-1-1-0", title: "0-1-1-0" },
          { key: "0-1-1-1", title: "0-1-1-1" },
          { key: "0-1-1-2", title: "0-1-1-2" },
        ],
      },
      {
        key: "0-1-2",
        title: "0-1-2",
      },
    ],
  },
  {
    key: "0-2",
    title: "0-2",
  },
];
```

- 그리고 title을 바꿔 실행시킨다.
- title로 검색해본다.

```js
// gData
const gData = [
  {
    key: "0-0",
    title: "TypeScript",
    children: [
      {
        key: "0-0-0",
        title: "Type",
        children: [
          { key: "0-0-0-0", title: "boolean" },
          { key: "0-0-0-1", title: "number" },
          { key: "0-0-0-2", title: "string" },
        ],
      },
      {
        key: "0-0-1",
        title: "Interface",
        children: [
          { key: "0-0-1-0", title: "implements" },
          { key: "0-0-1-1", title: "optional-property" },
          { key: "0-0-1-2", title: "indexable" },
        ],
      },
      {
        key: "0-0-2",
        title: "Generic",
      },
    ],
  },
  {
    key: "0-1",
    title: "TDD",
    children: [
      {
        key: "0-1-0",
        title: "RED",
        children: [
          { key: "0-1-0-0", title: "Write-a-test" },
          { key: "0-1-0-1", title: "Test-fails" },
          { key: "0-1-0-2", title: "Try-to-pass" },
        ],
      },
      {
        key: "0-1-1",
        title: "GREEN",
        children: [
          { key: "0-1-1-0", title: "Wrtie-code-make-test-pass" },
          { key: "0-1-1-1", title: "code-passes-test" },
          { key: "0-1-1-2", title: "Say-yeah" },
        ],
      },
      {
        key: "0-1-2",
        title: "REFACTOR",
      },
    ],
  },
  {
    key: "0-2",
    title: "SCSS",
  },
];
```

- 검색이 안된다.
- 아마 key를 위주로 검색이 되어 tree를 확장하고 title 색상을 변경시켜서 그런걸까?
- dataList를 보니 아직 title이 업데이트 되지 않았다.
- generateList 함수에서 title에 key값을 넣어주고 있었다. 변경해보자.

#### 2-1-2. 바로잡기

```js
const dataList = [];
const generateList = (data) => {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title } = node;
    dataList.push({ key, title });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);
```

- 제대로 dataList에 반영되었다.

```js
[
  { key: "0-0", title: "TypeScript" },
  { key: "0-0-0", title: "Type" },
  { key: "0-0-0-0", title: "boolean" },
  { key: "0-0-0-1", title: "number" },
  { key: "0-0-0-2", title: "string" },
  { key: "0-0-1", title: "Interface" },
  { key: "0-0-1-0", title: "implements" },
  { key: "0-0-1-1", title: "optional-property" },
  { key: "0-0-1-2", title: "indexable" },
  { key: "0-0-2", title: "Generic" },
  { key: "0-1", title: "TDD" },
  { key: "0-1-0", title: "RED" },
  { key: "0-1-0-0", title: "Write-a-test" },
  { key: "0-1-0-1", title: "Test-fails" },
  { key: "0-1-0-2", title: "Try-to-pass" },
  { key: "0-1-1", title: "GREEN" },
  { key: "0-1-1-0", title: "Wrtie-code-make-test-pass" },
  { key: "0-1-1-1", title: "code-passes-test" },
  { key: "0-1-1-2", title: "Say-yeah" },
  { key: "0-1-2", title: "REFACTOR" },
  { key: "0-2", title: "SCSS" },
];
```

- 잘 검색된다!!

![searchable-tree](https://user-images.githubusercontent.com/33482265/148645153-45028113-7f53-42b6-99aa-dcfd00ff3f15.PNG)

- 여기까지의 작업은 2번 브랜치 [02-When-title-and-key-values-are-different](https://github.com/Maphnew/playground/tree/02-When-title-and-key-values-are-different)에 저장했다.

### 2-2. title이 만약 컴포넌트라면 어떻게 Searchable tree를 구축해야 할까?

- title을 컴포넌트로 변경하여 실행하고 검색해보자. 당연히 안될 것이다.
- 그러면 key, title이 아닌 프로퍼티를 추가하여 그 프로퍼티의 값으로 판단하면 될 것이다.
- 하지만 그렇게 되면 컴포넌트에 있는 title의 css 변경에 대해 한번더 생각할 필요가 있다.
- class를 컴포넌트에 주입하여 색상을 변경해보자.

#### 2-2-1. title 컴포넌트로 변경<a name="title"></a>

- 컴포넌트로 변경 후 실행하니 loop함수의 item.title.indexOf 함수로부터 오류가 난다.
- 먼저 프로퍼티를 추가하고 loop함수를 변경 후 컴포넌트로 변경해야 겠다.
- [2-2-2. 프로퍼티 추가](#add-property) 먼저 끝내고 컴포넌트를 생성한다.
- 생성된 컴포넌트를 적용시켜보자.

```js
import { Tree, Input, Checkbox } from "antd";

const CheckboxNode = (props) => {
  const { title } = props;
  return (
    <>
      <span>{title}</span>
      <Checkbox.Group options={["learned", "used", "fluent"]} />
    </>
  );
};
```

![compoenet-node](https://user-images.githubusercontent.com/33482265/148646265-3ee2ef22-acbb-48c4-93a6-3e0bd0ba0695.PNG)

- 잘 적용되긴 했으나 search 기능에서 오류가 나는데 `onChange`함수에 unvisibleTitle을 적용시키는 것을 깜빡한 것 같다. 수정해보자.
- `onChange`함수에서 사용하는 dataList에 unvisibleTitle 또한 적용시켜 확장시키는데 필요한 로직을 수정한다.

```js
// ...
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title, unvisibleTitle } = node;
    dataList.push({ key, title, unvisibleTitle });
    if (node.children) {
      generateList(node.children);
    }
  }
};

// ...
const onChange = (e) => {
  const { value } = e.target;
  const expandedKeys = dataList
    .map((item) => {
      if (item.unvisibleTitle.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    })
    .filter((item, i, self) => item && self.indexOf(item) === i);
  setExpandedKeys(expandedKeys);
  setSearchValue(value);
  setAutoExpandParent(true);
};
```

- 이제 [2-2-3번](#component)으로 가서 검색된 노드의 색상 변경을 해보자.

#### 2-2-2. 프로퍼티 추가<a name="add-property"></a>

- 프로퍼티 명을 정해보자.
- 숨어있는 title이므로 unvisibleTitle로 정했다.
- 원래 있던 title값을 unvisibleTitle의 값에 복제한다.

```js
const gData = [
  {
    key: "0-0",
    title: "TypeScript",
    unvisibleTitle: "TypeScript",
    children: [
      {
        key: "0-0-0",
        title: "Type",
        unvisibleTitle: "Type",
        children: [
          { key: "0-0-0-0", unvisibleTitle: "boolean", title: "boolean" },
          { key: "0-0-0-1", unvisibleTitle: "number", title: "number" },
          { key: "0-0-0-2", unvisibleTitle: "string", title: "string" },
        ],
      },
      {
        key: "0-0-1",
        title: "Interface",
        unvisibleTitle: "Interface",
        children: [
          { key: "0-0-1-0", unvisibleTitle: "implements", title: "implements" },
          {
            key: "0-0-1-1",
            unvisibleTitle: "optional-property",
            title: "optional-property",
          },
          { key: "0-0-1-2", unvisibleTitle: "indexable", title: "indexable" },
        ],
      },
      {
        key: "0-0-2",
        title: "Generic",
        unvisibleTitle: "Generic",
      },
    ],
  },
  {
    key: "0-1",
    title: "TDD",
    unvisibleTitle: "TDD",
    children: [
      {
        key: "0-1-0",
        title: "RED",
        unvisibleTitle: "RED",
        children: [
          {
            key: "0-1-0-0",
            unvisibleTitle: "Write-a-test",
            title: "Write-a-test",
          },
          { key: "0-1-0-1", unvisibleTitle: "Test-fails", title: "Test-fails" },
          {
            key: "0-1-0-2",
            unvisibleTitle: "Try-to-pass",
            title: "Try-to-pass",
          },
        ],
      },
      {
        key: "0-1-1",
        title: "GREEN",
        unvisibleTitle: "GREEN",
        children: [
          {
            key: "0-1-1-0",
            unvisibleTitle: "Wrtie-code-make-test-pass",
            title: "Wrtie-code-make-test-pass",
          },
          {
            key: "0-1-1-1",
            unvisibleTitle: "code-passes-test",
            title: "code-passes-test",
          },
          { key: "0-1-1-2", unvisibleTitle: "Say-yeah", title: "Say-yeah" },
        ],
      },
      {
        key: "0-1-2",
        title: "REFACTOR",
        unvisibleTitle: "REFACTOR",
      },
    ],
  },
  {
    key: "0-2",
    title: "SCSS",
    unvisibleTitle: "SCSS",
  },
];
```

- loop함수를 작동하도록 변경한다.
- 검색당하는 프로퍼티를 unvisibleTitle로 변경하고 css도 unvisibleTitle에 먹여준다.
- 그러면 unvisibleTitle을 title 컴포넌트에 바로 삽입해 주면 될 것 같은데?
- 다시 [2-2-1번](#title)으로 가자.

```js
const loop = (data) => {
  return data.map((item) => {
    const index = item.unvisibleTitle.indexOf(searchValue);
    const beforeStr = item.unvisibleTitle.substr(0, index);
    const afterStr = item.unvisibleTitle.substr(index + searchValue.length);
    const unvisibleTitle =
      index > -1 ? (
        <span>
          {beforeStr}
          <span className="site-tree-search-value">{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      );
    if (item.children) {
      return {
        title: item.title,
        unvisibleTitle,
        key: item.key,
        children: loop(item.children),
      };
    }

    return {
      title: item.title,
      unvisibleTitle,
      key: item.key,
    };
  });
};
```

#### 2-2-3. 컴포넌트에 class 적용 -> 컴포넌트에 unvisibleTitle 적용<a name="component"></a>

- title 컴포넌트 프로퍼티로 색상변경된 unvisibleTitle를 적용한다.

```js
const loop = (data) => {
  return data.map((item) => {
    const index = item.unvisibleTitle.indexOf(searchValue);
    const beforeStr = item.unvisibleTitle.substr(0, index);
    const afterStr = item.unvisibleTitle.substr(index + searchValue.length);
    const unvisibleTitle =
      index > -1 ? (
        <span>
          {beforeStr}
          <span className="site-tree-search-value">{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      );
    const title = <CheckboxNode title={unvisibleTitle} />;
    if (item.children) {
      return {
        title,
        unvisibleTitle,
        key: item.key,
        children: loop(item.children),
      };
    }

    return {
      title,
      unvisibleTitle,
      key: item.key,
    };
  });
};
```

- 잘 동작한다!

![searchable-component](https://user-images.githubusercontent.com/33482265/148646674-a1125fdb-af1b-4620-942b-27ad59afa565.PNG)

### 2-3. 마무리

#### 2-3-1. UI 다듬기

- leaf 노드에만 checkbox group을 적용하고 위치를 잘 맞춰주자.

1. children이 있으면 title에 unvisibleTitle을 적용시켜준다.

```js
const loop = (data) => {
  return data.map((item) => {
    const index = item.unvisibleTitle.indexOf(searchValue);
    const beforeStr = item.unvisibleTitle.substr(0, index);
    const afterStr = item.unvisibleTitle.substr(index + searchValue.length);
    const unvisibleTitle =
      index > -1 ? (
        <span>
          {beforeStr}
          <span className="site-tree-search-value">{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      );
    const title = <CheckboxNode title={unvisibleTitle} />;
    if (item.children) {
      return {
        title: unvisibleTitle,
        unvisibleTitle,
        key: item.key,
        children: loop(item.children),
      };
    }

    return {
      title,
      unvisibleTitle,
      key: item.key,
    };
  });
};
```

![leaf-has-checkbox-group](https://user-images.githubusercontent.com/33482265/148647399-fc6f66fa-0d74-4c64-8413-7d233f7bb066.PNG)

2. checkbox group의 정렬을 맞춰보자.

- 컴포넌트를 div로 감싸고 flex, space-between을 적용한다.
- tree 노드의 너비를 확장시킨다.

```js
// ...
const CheckboxNode = (props) => {
  const { title } = props;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{title}</span>
      <Checkbox.Group options={["learned", "used", "fluent"]} />
    </div>
  );
};

// ...

return (
  <div>
    <Search
      style={{ marginBottom: 8 }}
      placeholder="Search"
      onChange={onChange}
    />
    <Tree
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      treeData={loop(gData)}
      blockNode={true} // <--- 노드의 align-items: stretch;
    />
  </div>
);
```

- 잘 정돈된 느낌이다.

![complete](https://user-images.githubusercontent.com/33482265/148647771-2d7cec54-cc71-4fbf-a653-1877646867e6.PNG)

- 여기까지 코드는 3번 브랜치 [03-What-if-the-title-is-component](https://github.com/Maphnew/playground/tree/03-What-is-the-title-is-component)에 저장했다.

- 이로써 Ant Design Searchable Tree를 따라해보고 응용해봤다. 끝.

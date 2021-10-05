---
title: "[Emmet] HTML 빠르게 마크업하기"
date: 2021-10-05 13:37:00

categories:
  - HTML
tags:
  - [HTML, Emmet, Web]

toc: true
toc_sticky: true
---

# Emmet

https://emmet.io/

- Super Cool!
- HTML 빠르게 마크업하기

```html
<!-- Type tab key at the end -->

<!-- ! -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

</body>

</html>

<!-- div -->
<div></div>

<!-- div.class -->
<div class="class"></div>

<!-- div#id -->
<div id="id"></div>

<!-- .class -->
<div class="class"></div>

<!-- > -->
<!-- div>ul>li -->
<div>
    <ul>
        <li></li>
    </ul>
</div>

<!-- + -->
<!-- div>ul+ol -->
<div>
    <ul></ul>
    <ol></ol>
</div>

<!-- * -->
<!-- ul>li*5 -->
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>

<!-- ^ -->
<!-- div>ul>li^ol>li -->
<div>
    <ul>
        <li></li>
    </ul>
    <ol>
        <li></li>
    </ol>
</div>

<!-- () -->
<!-- div>(header>ul>li*2>a)+footer>p -->
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>

<!-- {} -->
<!-- p{hello} -->
<p>hello</p>

<!-- {$} -->
<!-- p.class{item $}*5 -->
<p class="class">item 1</p>
<p class="class">item 2</p>
<p class="class">item 3</p>
<p class="class">item 4</p>
<p class="class">item 5</p>

<!-- dummy -->
<!-- p>lorem -->
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus est quia perferendis deleniti voluptatibus
    placeat sapiente totam quidem ea numquam, soluta ad sequi omnis incidunt cum reiciendis qui alias laborum!</p>

<!-- p>lorem4 -->
<p>Lorem ipsum dolor sit.</p>
```
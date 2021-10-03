---
title: "VanillaJS"
date: 2019-03-03 18:08:30
categories: javascript
---

### VanillaJS
#### Making a JS Clock
From : https://academy.nomadcoders.co

- index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Something</title>
        <link rel="stylesheet" href="index.css"/>
    </head>
    <body>
        <div class="js-clock">
            <h1>00:00</h1>
        </div>
        <script src="clock.js"></script>
    </body>
</html>
```

- clock.js

```javascript
const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
```

1. Backtick and Interpolation
2. querySelector();
3. innerText

4. setInterval(func, 3000);
5. div.js-Tile enter(vscode)
6. mini if


#### Saving the User Name
1. LocalStorage
2. form css {display : none / block};
3. form -> send somewhere (refreshed)
4. event.preventDefault();
5. input.value
6. form.classList.remove("showing"); .showing - display : block
7. greeting.classList.add("showing"); .showing - display : block
8. localStorage.setItem(USER_LS, text);


- greetings.js

```javascript
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}!`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();
```

- index.css

```css
.form,
.greetings{
    display: none;
}

.showing{
    display: block;
}
```

- index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Something</title>
        <link rel="stylesheet" href="index.css"/>
    </head>
    <body>
        <div class="js-clock">
            <h1>00:00</h1>
        </div>
        <form class="js-form form">
            <input type="text" placeholder="What is your name?" />
        </form>
        <h4 class="js-greetings greetings"></h4>
        <script src="clock.js"></script>
        <script src="greeting.js"></script>
    </body>
</html>
```


#### Making a To Do List

1. document.createElement("li"); or "button"
2. addEventListener("submit", fucn)
3. toDoList.appendChild(li); // toDoList: ul class="js-toDoList"
4. JavaScript Object Notation - JSON.stringify(json);
5. forEach(fucntion(each){ function(each.text); });
6. filter(function(each){ return each.id !== parseInt(li.id); });
7. toDoList.removeChild(event.target.parentNode);


- todo.js

```javascript
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

const toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "x";
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
```

- index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Something</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="index.css"/>
    </head>
    <body>
        <div class="js-clock">
            <h1>00:00</h1>
        </div>
        <form class="js-form form">
            <input type="text" placeholder="What is your name?" />
        </form>
        <h4 class="js-greetings greetings"></h4>
        <form class="js-toDoForm">
            <input type="text" placeholder="Write a to do" />
        </form>
        <ul class="js-toDoList">
            
        </ul>
        <script src="clock.js"></script>
        <script src="greeting.js"></script>
        <script src="todo.js"></script>
    </body>
</html>
```

#### Image Background
1. image.src = `1.jpg`;
2. image.classList.add('bgimage');
3. Math.floor() / Math.ceil() / Math.random()
4. @keyframes fadeIn{from{ opacity:0; }to{ opacity:1; }}
5. animation: fadeIn .5s linear;

- index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Something</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="index.css"/>
    </head>
    <body>
        <div class="js-clock">
            <h1>00:00</h1>
        </div>
        <form class="js-form form">
            <input type="text" placeholder="What is your name?" />
        </form>
        <h4 class="js-greetings greetings"></h4>
        <form class="js-toDoForm">
            <input type="text" placeholder="Write a to do" />
        </form>
        <ul class="js-toDoList">
            
        </ul>
        <script src="clock.js"></script>
        <script src="greeting.js"></script>
        <script src="todo.js"></script>
        <script src="bg.js"></script>
    </body>
</html>
```

- index.css

```css
body{
    background-color: #2c3e50;
}

.form,
.greetings{
    display: none;
}


.showing{
    display: block;
}

@keyframes fadeIn{
    from{
        opacity: 0;
    } 
    to {
        opacity: 1;
    }
}

.bgImage{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-1;
    animation: fadeIn .5s linear;
}
```

- bg.js

```javascript
const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add('bgImage');
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
```

#### Getting the Weather
1. navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
2. getPostion, save in localStrage
3. fetch( URL ).then(fucntion(response) {  })then(function(json) {  });


- weather.js

```javascript
const weather = document.querySelector(".js-weather");
  
const API_KEY = "fbd234b4b8ae80c48dfa0de89e8e3749";
const  COORDS = 'coords';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        console.log(weather);
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
        latitude,
        longitude
        // latitude: latitude,
        // longitude: longitude
    };
    saveCoords(coordObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("CAN'T LOAD")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();

```

- index.html

```javascript
<!DOCTYPE html>
<html>
    <head>
        <title>Something</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="index.css"/>
    </head>
    <body>
        <div class="js-clock">
            <h1>00:00</h1>
        </div>
        <form class="js-form form">
            <input type="text" placeholder="What is your name?" />
        </form>
        <h4 class="js-greetings greetings"></h4>
        <form class="js-toDoForm">
            <input type="text" placeholder="Write a to do" />
        </form>
        <ul class="js-toDoList">
            
        </ul>
        <spanc class="js-weather"></spanc>
        <script src="clock.js"></script>
        <script src="greeting.js"></script>
        <script src="todo.js"></script>
        <script src="bg.js"></script>
        <script src="weather.js"></script>
    </body>
</html>
```

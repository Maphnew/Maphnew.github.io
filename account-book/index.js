import Contents from "./components/Contents.js";
import Total from "./components/Total.js";

const initialState = {
    items: [
        // {name: '물', price: '1200', payment: 'card', category: 'eat'},
        // {name: '비빔밥', price: '12000', payment: 'card', category: 'eat'},
        // {name: '젖병', price: '51000', payment: 'card', category: 'baby'},
    ]
}
new Contents({ $target: document.querySelector(".App"), initialState: initialState});

new Total({ $target: document.querySelector(".App"), initialState: initialState})

const datepicker = document.querySelector('#datepicker')
const dateVal = datepicker.value

const now = new Date()

if(!dateVal) {
    const today = now.getFullYear() + '-' + leftFullNum(now.getMonth()+1, 2) + '-' + leftFullNum(now.getDate(), 2)
    datepicker.value = today
}

function leftFullNum(num, targetLength) {
    return num.toString().padStart(targetLength, "0")
}

datepicker.addEventListener('change', function(e) {
    const pickedDate = new Date(e.target.value)
    const day = pickedDate.getDay()
    whatday.value = dayNames[day]
})

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const day = now.getDay()
const whatday = document.querySelector('#whatday')
whatday.value = dayNames[day]
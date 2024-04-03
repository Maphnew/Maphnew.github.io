import getExpenses from "./getExpenses.js";
import appView from "./view/app.js";

const state = {
    expenses: getExpenses()
}

const main = document.querySelector('.app')

window.requestAnimationFrame(() => {
    const newMain = appView(main, state)
    main.replaceWith(newMain)
})
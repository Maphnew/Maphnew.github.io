import getExpenses from "./getExpenses.js";
import view from "./view.js";

const state = {
    expenses: getExpenses()
}

const main = document.querySelector('.app')

window.requestAnimationFrame(() => {
    const newMain = view(main, state)
    main.replaceWith(newMain)
})
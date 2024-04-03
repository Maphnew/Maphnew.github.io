import { formatCurrency } from "../utils/format.js"

const getExpenseElement = expense => {
    const {
        text,
        cash,
        price,
        category
    } = expense

    return `
        <li class="expenses-item">
            <div class="item">
                <div class="item-name">${text}</div>
                <div class="item-price">${formatCurrency(price)}</div>
                <div class="expense-type">
                    ${cash ? '<i class="fa fa-money"></i>' : '<i class="fa fa-credit-card-alt"></i>'}
                </div>
            </div>
            <div class="expense-category">${category}</div>
        </li>
    `
}

export default (targetElement, {expenses}) => {
    const newExpenseList = targetElement.cloneNode(true)
    const expensesElements = expenses.map(getExpenseElement).join('')
    newExpenseList.innerHTML = expensesElements
    return newExpenseList
}
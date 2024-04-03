import { formatCurrency } from "../utils/format.js"

const getExpensesAmount = expenses => {
    return expenses.reduce((acc, curr) => {
        return acc + parseInt(curr.price)
    }, 0)
}

export default (targetElement, {expenses}) => {
    const newAmount = targetElement.cloneNode(true)
    newAmount.textContent = formatCurrency(getExpensesAmount(expenses)) + '원'
    return newAmount
}
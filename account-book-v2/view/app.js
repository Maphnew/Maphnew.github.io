import expensesView from './expenses.js'
import amountView from './amount.js'

export default (targetElement, state) => {
    const element = targetElement.cloneNode(true)

    const list = element.querySelector('.expenses-list')
    const amount = element.querySelector('.amount')

    list.replaceWith(expensesView(list, state))
    amount.replaceWith(amountView(amount, state))

    return element
}
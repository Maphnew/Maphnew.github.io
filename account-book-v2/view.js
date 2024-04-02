const getExpenseElement = expense => {
    const {
        text,
        cash,
        price
    } = expense

    return `
        <li class="expenses-item">
            <div class="item">
                <div class="item-name">${text}</div>
                <div class="item-price">${price}</div>
            </div>
            <div class="expenses-type">
                ${cash ? '<i class="fa fa-money"></i>' : '<i class="fa fa-credit-card-alt"></i>'}
            </div>
        </li>
    `
}

const getExpensesAmount = expenses => {
    return expenses.reduce((acc, curr) => acc + curr.price, 0)
}

export default (targetElement, state) => {
    const {
        expenses
    } = state

    const element = targetElement.cloneNode(true)

    const list = element.querySelector('.expenses-list')

    list.innerHTML = expenses.map(getExpenseElement).join('')

    return element
}
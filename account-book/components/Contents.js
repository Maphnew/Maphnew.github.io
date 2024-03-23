export default function contents({ $target, initialState }) {
    this.$element = document.createElement('div')
    this.$element.className = 'contents'
    this.state = initialState

    $target.appendChild(this.$element)

    this.setState = (nextState) => {
        this.state = nextState
        this.render();
    }

    this.renderList = (items) => {
        this.$element.innerHTML = items.map((item, index) => `
            <input type="text" value="${item.name}">
            <input type="number" value="${item.price}">
            <div>
                <input type="radio" id="cash-${index}" name="payment-${index}" value="cash" ${item.payment === "cash" ? "checked" : ""}>
                    <label for="cash-${index}">현금</label>
                </input>
                <input type="radio" id="card-${index}" name="payment-${index}" value="card" ${item.payment === "card" ? "checked" : ""}>
                    <label for="card-${index}">카드</label>
                </input>
            </div>
            <select>
                <option value="eat" ${item.category === "eat" ? "selected" : ""}>식비</option>
                <option value="baby" ${item.category === "baby" ? "selected" : ""}>육아비</option>
            </select>
        `).join("")
    }
    
    this.render = () => {
        const { items = [] } = this.state
        if(items.length > 0) {
            this.renderList(items)
        } else {
            this.renderList(Array(10).fill({name: '', price: '', payment: 'card', category: ''}))
        }
        
        const list = document.createElement('div')
        list.innerText = '내역'
        const price = document.createElement('div')
        price.innerText = '금액'
        const payment = document.createElement('div')
        payment.innerText = '지불방법'
        const category = document.createElement('div')
        category.innerText = '분류'
        this.$element.prepend(list, price, payment, category)

    }

    this.render()
}
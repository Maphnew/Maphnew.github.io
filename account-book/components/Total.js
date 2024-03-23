export default function total({ $target, initialState }) {
    this.$element = document.createElement('div')
    this.$element.className = 'total'
    this.state = initialState

    $target.appendChild(this.$element)

    this.setState = (nextState) => {
        this.state = nextState
        this.render();
    }

    this.render = () => {
        const total = document.createElement('div')
        total.innerHTML = `
            <label for="cashTotal">현금 지출 금액</label>
            <input type="text" id="cashTotal" name="cashTotal" />
            <label for="cardTotal">카드 지출 금액</label>
            <input type="text" id="cardTotal" name="cardTotal" />
            <label for="total">총 지출 금액</label>
            <input type="text" id="total" name="total" />
        `
        const note = document.createElement('div')
        note.innerHTML = `
            <label for="note">NOTE</label>
            <textarea id="note" name="note" rows="4" style="width: 90%"/>
        `
        this.$element.append(total, note)
    }
    this.render()
}
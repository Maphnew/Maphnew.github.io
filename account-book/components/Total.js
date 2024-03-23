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
        total.className = 'left-total'
        total.innerHTML = `
            <div>
            <label for="cashTotal">Cash Total</label>
            <input type="text" id="cashTotal" name="cashTotal" style="width: 50%"/>
            </div>
            <div>
            <label for="cardTotal">Card Total</label>
            <input type="text" id="cardTotal" name="cardTotal" style="width: 50%"/>
            </div>
            <div>
            <label for="total">Total</label>
            <input type="text" id="total" name="total" />
            </div>
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
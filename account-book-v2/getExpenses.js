const { faker } = window

const createElement = () => ({
    text: faker.commerce.product(),
    cash: faker.random.boolean(),
    price: faker.commerce.price(1, 50, 0, '$')
})

const repeat = (elementFactory, number) => {
    const array = []
    for (let index = 0; index < number; index++) {
        array.push(elementFactory())
    }
    return array
}

export default () => {
    const howMany = faker.random.number(10)
    return repeat(createElement, howMany)
}
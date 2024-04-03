const { faker } = window

const createElement = () => ({
    text: faker.commerce.product(),
    cash: faker.random.boolean(),
    price: parseInt(faker.commerce.price(1, 50, 0)) * 1000,
    category: faker.random.arrayElement([
        '🍴 식비',
        '📚 생활용품',
        '👶🏻 육아비',
        '👕 의류비',
        '🏪 의료비',
        '🚗 교통비',
        '🎠 문화생활비'
    ])
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
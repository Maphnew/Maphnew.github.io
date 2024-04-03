export const formatCurrency = number => {
    return Intl.NumberFormat('ko-KR', {currency: 'KRW'}).format(number)
}
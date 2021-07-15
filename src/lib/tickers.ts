export const getTicker = (currency: string) => {
    switch (currency) {
        case 'btc':
            return 'BTC'
        case 'usd':
            return '$'
    }
}
export const getTicker = (currency: string, params?: any) => {
    if (params) {

        if (params.shortTickers) {
            switch (currency) {
                case 'btc':
                    return '₿'
                case 'usd':
                    return '$'
            }
        }
    } else {
        switch (currency) {
            case 'btc':
                return 'BTC'
            case 'usd':
                return '$'
        }
    }
}
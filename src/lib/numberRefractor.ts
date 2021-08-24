export const toDotThs = (value: number) => {

  let refractedValue = `${Math.sign(value)*Math.abs(value)}`

  if (Math.abs(value) > 999 && Math.abs(value) < 999999) {
    //@ts-ignore
    refractedValue = Math.sign(value)*((Math.abs(value)/1000).toFixed(0)) + 'k'
  }

  if (Math.abs(value) > 999999) {
    //@ts-ignore
    refractedValue = Math.sign(value)*((Math.abs(value)/1000000).toFixed(0)) + 'm'
  }

  return refractedValue
}

export const currencyValueChanger = (currency: string, rate: number, value: number, params?: any) => {

  let output: number = 0;

  switch (currency) {
    case 'usd':
      output = Number((value * rate).toFixed(1))
    break;

    case 'btc':
      output = Number(value.toFixed(8))
  }

  if (params) {

    if (params.absolute) {
      output = Math.abs(output)
    }

    if (params.fixed) {
      output = parseInt(String(output), 10)
    }

    if (params.shortTicker && currency === 'btc') {
      output = Number(output.toFixed(2))
    }

  }

  return output
}
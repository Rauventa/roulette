export const toDotThs = (value: number) => {
  //@ts-ignore
  return Math.abs(value) > 999 ? Math.sign(value)*((Math.abs(value)/1000).toFixed(1)) + 'k' : Math.sign(value)*Math.abs(value)
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

  }

  return output
}
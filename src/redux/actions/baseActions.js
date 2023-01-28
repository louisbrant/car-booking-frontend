export const setUserInfo = (user) => {
  return {
    type: 'SET_USERINFO',
    payload: { user },
  }
}


export function getDecimalsNum(priceTickSize) {
  let m = priceTickSize.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  let price = priceTickSize.toFixed(Math.max(0, (m[1] || '').length - m[2]))
  if (price.lastIndexOf('.') == -1) {
    return 0
  } else {
    return price.toString().split('.')[1].length
  }
}

export function onlyInputNumAndPoint(data, pointLong) {
  var regExp = new RegExp('^(\\-)*(\\d+)\\.(\\d{' + pointLong + '}).*$')
  data = data.replace(/[^\d.]/g, '')
  data = data.replace(/^\./g, '')
  data = data.replace(/\.{2,}/g, '.')
  data = data
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  data = data.replace(regExp, '$1$2.$3')
  return data
}

export function FormatNumberByDecimals(number, decimals) {
  let Newnumber = 0
  if (!number) { return 0 }
  if (decimals) {
    const numberString = (number).toString()
    const arr = numberString.split('.')
    const cerrentLength = arr[0].length
    const newString = arr.join('')
    let result = '';
    const diffLenght = cerrentLength - decimals;
    if (diffLenght > 0) {
      let newNum = newString.slice(0, diffLenght)
      while (newNum.length > 3) {
        result = ',' + newNum.slice(-3) + result;
        newNum = newNum.slice(0, newNum.length - 3);
      }
      if (newNum) { result = newNum + result }
      Newnumber = result + '.' + newString.slice(diffLenght);
    } else {
      let dudo = ''
      for (let i = 0; i < Math.abs(diffLenght); i++) {
        dudo += '0'
      }
      Newnumber = '0.' + dudo + newString
    }
    Newnumber = Newnumber.replace(/(\.0+|0+)$/, '')
  } else {
    Newnumber = number
  }
  return Newnumber
}

export function FormatNumberByDecimalsBalance(number, decimals) {
  let Newnumber = 0
  if (!number) { return 0 }
  if (decimals) {
    const numberString = (number).toString()
    const arr = numberString.split('.')
    const cerrentLength = arr[0].length
    const newString = arr.join('')

    const diffLenght = cerrentLength - decimals;
    if (diffLenght > 0) {
      Newnumber = newString.slice(0, diffLenght) + '.' + newString.slice(diffLenght);
    } else {
      let dudo = ''
      for (let i = 0; i < Math.abs(diffLenght); i++) {
        dudo += '0'
      }
      Newnumber = '0.' + dudo + newString
    }
    Newnumber = Newnumber.replace(/(\.0+|0+)$/, '')
  } else {
    Newnumber = number
  }
  return Newnumber
}

export function toThousands(num) {
  let NUM = (num || 0).toString();
  let arr = NUM.split('.')
  let number = (arr[0] || 0).toString(), result = '';
  while (number.length > 3) {
    result = ',' + number.slice(-3) + result;
    number = number.slice(0, number.length - 3);
  }
  if (number) {
    if (arr[0] > 10000) {
      result = number + result
    } else {
      if (arr[1]) {
        let array = arr[1].split('')
        let index = array.findIndex(e => parseInt(e) > 0)
        if (array.length > 5 && parseInt(arr[0]) >= 1) {
          result = number + result
        } else if (array.length > index + 3) {
          result = Number(number + result + '.' + arr[1].slice(0, index) + arr[1].slice(index, index + 3));
        } else {
          result = number + result + '.' + arr[1];
        }
      } else {
        result = number + result
      }
    }
  }
  return result;
}
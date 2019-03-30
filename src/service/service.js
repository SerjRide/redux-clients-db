const timestampToDate = (ts) => {
  var d = new Date();
  d.setTime(ts);
  return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + (d.getFullYear() + '').slice(-2);
}

const getNewOrederNamber = (length) => {
  const date = Date.now();
  return timestampToDate(date)[6] + timestampToDate(date)[7] + ('000' + length).slice(-4);
}

const calcVis = (obj) => {
  const { count, colors } = obj
  let priceForOne, price;
  if (colors === '1+0') priceForOne = 3;
  if (colors === '1+1') priceForOne = 5.6;
  if (colors === '4+0') priceForOne = 6;
  if (colors === '4+4') priceForOne = 9;
  price = priceForOne * count
  return price;
}

const calcProductsSumm = (arr) => {
  let price = 0;
  for (var i = 0; i < arr.length; i++) {
    price += arr[i].price
  }
  return price;
}

const getProductsNames = (obj) => {
  const { product } = obj
  let productsNames = ''
  if (typeof(product[0]) === 'string') productsNames = product[0]
  else {
    for (let j = 0; j < product.length; j++) {
      let join = ', ';
      if (j === product.length - 1) join = '';
      productsNames += product[j].name + join;
    }
  }
  return productsNames;
}

const getOrderById = (obj, id) => {
  let item = {}
  for (let i = 0; i < obj.length; i++) {
    if (id === obj[i]._id) {
      item.product = obj[i].product
      item.namber = obj[i].namber
      item.date = obj[i].date
      item.name = obj[i].name
      item.contacts = obj[i].contacts
      item.customer = obj[i].customer
      item.price = obj[i].price
      item.manager = obj[i].manager
      item.passed = obj[i].passed
      return item
    }
  }
}

export {

  timestampToDate,
  getNewOrederNamber,
  calcVis,
  calcProductsSumm,
  getProductsNames,
  getOrderById

}

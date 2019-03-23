const names = require('../../etc/russians-names.json');
const surnames = require('../../etc/russian-surnames.json');
const contacts = require('../../etc/contacts.json');
const products = require('../../etc/products-and-price.json');
const customers = require('../../etc/customers.json');
const fs = require("fs");

const addCustomers = (arr, i) => {
  let newArr = arr;
  newArr[i].customer = customers[Math.floor(Math.random() * 1000)];
  return newArr;
}

const addNames = (arr, i) => {
  let newArr = arr;
  const idxName = Math.floor(Math.random() * 99)
  const idxSurname = Math.floor(Math.random() * 100)
  const rndName = names[idxName].name;
  let rndSurname = surnames[idxSurname].Surname.slice(0,-1);
  if (names[idxName].sex === 'w') rndSurname += 'а';
  newArr[i].name = `${rndName} ${rndSurname}`;
  return newArr;
}

const addContacts = (arr, i) => {
  let newArr = arr;
  const rndPhone = contacts[Math.floor(Math.random() * 100)].phone;
  const rndEmail = contacts[Math.floor(Math.random() * 100)].email;
  newArr[i].contacts = `${rndPhone} / ${rndEmail}`;
  return newArr;
}

const addProducts = (arr, i, profit) => {
  let newArr = arr, count, rndProduct, product_count, charge;
  let rndPrice = Number(products[Math.floor(Math.random() * 56)].price);
  product_count = Math.floor(Math.random() * 99)
  if (profit === 'low') charge = 250;
  if (profit === 'mid') charge = 1000;
  if (profit === 'hight') charge = 2000;
  if (product_count < 50) count = 1;
  if (product_count >= 50 && product_count <= 79) count = 2; ;
  if (product_count >= 80) count = 3;
  if (count === 1) {
    rndProduct = products[Math.floor(Math.random() * 13)].products
  } else if (count === 2) {
    rndPrice += charge;
    rndProduct = products[Math.floor(Math.random() * 13)].products + ', ' +
                 products[Math.floor(Math.random() * 13)].products;
  } else if (count === 3) {
    rndPrice += (charge * 2);
    rndProduct = products[Math.floor(Math.random() * 13)].products + ', ' +
                 products[Math.floor(Math.random() * 13)].products + ', ' +
                 products[Math.floor(Math.random() * 13)].products;
  }
  newArr[i].product = rndProduct;
  newArr[i].price = rndPrice;
  return newArr;
}

const baseGenerator = (year = 18, profit = 'low') => {
  let date, namber, newArr = [], orders_count = 0;
  if (profit === 'low') orders_count += (1000 + Math.floor(Math.random() * 500))
  if (profit === 'mid') orders_count += (1500 + Math.floor(Math.random() * 500))
  if (profit === 'hight') orders_count += (2000 + Math.floor(Math.random() * 500))
  for (let i = 0; i < orders_count; i++) {
    const rndDay = ('0' + (Math.floor(Math.random() * 27) + 1)).slice(-2);
    const rndMonth = ('0' + (Math.floor(Math.random() * 11) + 1)).slice(-2);
    namber = year + '' + ((100000 + i) + '').slice(2);
    date = `${rndDay}.${rndMonth}.${year}` ;
    newArr[i] = { namber, date }
  }
  for (var i = 0; i < newArr.length; i++) {
    addCustomers(newArr, i, profit);
    addNames(newArr, i);
    addContacts(newArr, i);
    addProducts(newArr, i, profit);
  }
  fs.writeFile(`./server/build/${profit}_base.json`, JSON.stringify(newArr), (err) => {

    if(err) throw err;
    console.log('**************')
    console.log(`File ${profit}_base.json was successfully recorded in folder build`);

  });
  return newArr;
}

export default baseGenerator;

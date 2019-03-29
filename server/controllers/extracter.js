const findCountByCustomer = (arr, term) => {
  for (let i = 0; i < arr.length; i++) {
    const current_arr = arr[i].customer.toUpperCase();
    const value = term.toUpperCase();
    if (current_arr === value) return i
  }
}

const extracter = (res) => {
  const { data } = res;
  let customers = [];

  for (let key in data) {
    let obj = {}, overlap = false;
    for (let i = 0; i < customers.length; i++) {
      const arr = customers[i].customer.toUpperCase();
      const value = data[key].customer.toUpperCase();
      if (customers.length !== 0) {
        if (arr === value) {
          overlap = true
          i = customers.length
        }
      }
    }
    if (!overlap) {
      obj.customer = data[key].customer;
      obj.price = data[key].price;
      obj.date = [data[key].date];
      customers[customers.length] = obj;
    } else {
      const count = findCountByCustomer(customers, data[key].customer)
      customers[count].price += data[key].price;
      customers[count].date.push(data[key].date);
    }
  }

  return customers
}

export default extracter;

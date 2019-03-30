const findCountByCustomer = (arr, term) => {
  for (let i = 0; i < arr.length; i++) {
    const current_arr = arr[i].customer.toUpperCase();
    const value = term.toUpperCase();
    if (current_arr === value) return i
  }
}

const extracter = (res, year = 0) => {
  const { data } = res;
  let customers = [];

  for (let key in data) {
    let obj = {}, overlap = false, controller;
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

    if (year === 0) controller = year
    else controller = Number((data[key].date).slice(-2));

    if (controller === year) {
      if (!overlap) {
        obj.customer = data[key].customer;
        obj.date = [data[key].date];
        obj.total_amount = data[key].price;
        obj.true_amount = data[key].passed ? data[key].price : 0
        customers[customers.length] = obj;
      } else {
        const count = findCountByCustomer(customers, data[key].customer)
        customers[count].total_amount += data[key].price;
        customers[count].true_amount += data[key].passed ? data[key].price : 0;
        customers[count].date.push(data[key].date);
      }
    }
  }

  return customers
}

export default extracter;

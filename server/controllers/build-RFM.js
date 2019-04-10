// R - последняя активность
// F - кол-во заказов
// M - Общая выручка от клиента

const buildRFM = (customers) => {
  let arr = [];
  customers.map((item, i) => {
    arr[i] = {};
    arr[i].customer = item.customer;
    arr[i].true_amount = item.true_amount;
    arr[i].total_amount = item.total_amount;
    arr[i].date = [];
    for (let j = 0, length = item.date.length; j < length; j++) {
      arr[i].date[j] = item.date[j].date;
    }
    return item.date
  });

  const daySort = (a, b) => {
    let a_day = a.slice(0, 2);
    let b_day = b.slice(0, 2);
    if (a_day > b_day) return 1;
    if (a_day < b_day) return -1;
  };

  const mounthSort = (a, b) => {
    let a_mounth = a.slice(3, 5);
    let b_mounth = b.slice(3, 5);
    if (a_mounth > b_mounth) return 1;
    if (a_mounth < b_mounth) return -1;
  };

  const yearSort = (a, b) => {
    let a_year = a.slice(-2);
    let b_year = b.slice(-2);
    if (a_year > b_year) return 1;
    if (a_year < b_year) return -1;
  };

  if (arr.length !== 0) {

    for (let i = 0; i < arr[0].date.length; i++) {
      arr[i].date.sort(daySort).sort(mounthSort).sort(yearSort)
    };

    for (let i = 0; i < arr.length; i++) {

      const last_date = arr[i].date[arr[i].date.length - 1];
      const day = last_date.slice(0,2);
      const mounth = (Number(last_date.slice(4, 5)) - 1) + '';
      const year = last_date.slice(-2);
      const timestamp_ago = new Date() - new Date('20' + year, mounth, day).getTime();
      const day_ago = ((((timestamp_ago / 1000) / 60) / 60) / 24) | 0
      const orders_count = arr[i].date.length;

      const R = (day_ago) => {
        if (day_ago >= 0 && day_ago <= 30) return 1;
        if (day_ago >= 31 && day_ago <= 60) return 2;
        if (day_ago >= 61 && day_ago <= 90) return 3;
        if (day_ago >= 91 && day_ago <= 180) return 4;
        if (day_ago >= 181) return 5;
      };

      const F = (orders_count) => {
        if (orders_count >= 100) return 1;
        if (orders_count <= 99 && orders_count >= 75) return 2;
        if (orders_count <= 74 && orders_count >= 50) return 3;
        if (orders_count <= 49 && orders_count >= 25) return 4;
        if (orders_count <= 24 && orders_count >= 0) return 5;
      };

      const M = (true_amount) => {
        if (true_amount >= 450001) return 1;
        if (true_amount <= 450000 && true_amount >= 340001) return 2;
        if (true_amount <= 340000 && true_amount >= 230001) return 3;
        if (true_amount <= 230000 && true_amount >= 120001) return 4;
        if (true_amount <= 120000 && true_amount >= 0) return 5;
      };

      arr[i].last_date = last_date;
      arr[i].day_ago = day_ago;
      arr[i].orders_count = orders_count;

      arr[i].RFM = '' + R(day_ago) + F(orders_count) + M(arr[i].true_amount);

      delete arr[i].date;
      arr[i].date = customers[i].date;
    }
  }
  return arr;
}

export default buildRFM;

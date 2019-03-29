const customers = require('../../etc/template-customers.json');

const customersBuild = (obj) => {
  console.log('Customers Build is running...')
  console.log(obj)
  return customers;
}

export default customersBuild;

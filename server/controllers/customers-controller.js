import Order from '../models/order';
import Customers from '../models/customers';
import customersBuild from './customers-build';

class CustomersController {

  index(req, res) {
    Customers.find().then((err, customers) => {
      if (err) res.send(err);
      console.log('get all customers');
      res.json(customers);
    })
    .catch(() => {})
  }

  getByYear(req, res) {
    const { year } = req.params;
    const reg = new RegExp(`^${year}\\w+`, 'i')
    Customers.find({ namber: reg })
    .exec((err, customers) => {
      if (err) throw err;
      res.json(customers);
    })
  };

  create(req, res) {
    const data = req.body
    const customer = new Customers({
      customer: data.customer,
      total_amount: data.total_amount,
      dates: data.dates
    })

    customer.save()
    .then((res) => {
      console.log('customer added...');
      res.send(res);
    })
    .catch(() => {})
  }

  createMany(req, res) {
    const data = req.body;
    function onInsert(err, docs) {
      if (err) res.send(err)
      else {
        res.json({ status: 'All customers added' });
        console.log('All customers added...');
      }
    }
    Customers.collection.insertMany(data, onInsert);
  }

  deleteAll(req, res) {
    function deleteAllCustomers (err) {
      if (err) res.send(err)
      else {
        res.json({ status: 'All customers deleted' });
        console.log('All customers was be deleted...')
      }
    }
    Customers.collection.deleteMany({}, deleteAllCustomers);
  }

}

export default CustomersController;

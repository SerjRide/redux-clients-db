import Order from '../models/order';
import Customers from '../models/customers';
import customersBuild from './customers-build';

class CustomersController {

  index(req, res) {
    Customers.find().then((err, customers) => {
      if (err) res.send(err);
      res.json(customers);
    }).catch(() => {})
  }

  createOne(req, res) {
    const data = req.body;
    const onInsert = (err, docs) => {
      if (err) res.send(err)
    }
    Customers.collection.insertOne(data, onInsert);
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

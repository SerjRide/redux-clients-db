import Order from '../models/order';
import Orders from '../models/orders';

class OrderController {
  index(req, res) {
    Order.find().then((err, orders) => {
      if (err) res.send(err);
      res.json(orders);
    })
    .catch(() => {})
  }

  create(req, res) {
    const data = req.body
    const order = new Order({
      namber: data.namber,
      customer: data.customer,
      date: data.date,
      name: data.name,
      contacts: data.contacts,
      product: data.product,
      price: data.price
    })

    order.save()
    .then((res) => {
      console.log('order added...');
      res.send(res);
    })
    .catch(() => {})
  }

  createMany(req, res) {
    const data = req.body;
    function onInsert(err, docs) {
      if (err) { res.send(err) }
      else res.json({ status: 'All orders added' })
    }
    Orders.collection.insertMany(data, onInsert);
  }

  read(req, res) {
    Order.findOne({ _id: req.params.id })
    .then(post => {
      if (!post) { res.send({ error: 'not found' }) }
      else res.json(post);
    })
    .catch(() => {})
  }

  update(req, res) {
    Order.findByIdAndUpdate(req.params.id, { $set: req.body }, err => {
      if (err) res.send(err)
      res.json({ status: 'updated' });
    });
  }

  delete(req, res) {
    Order
    .deleteOne({
      _id: req.params.id,
    })
    .then((result) => {
      if (result) {
        res.json(res);
      } else res.json({ status: 'error' });
    })
    .catch(() => {});
  }

  deleteAll(req, res) {
    function deleteAllOrders (err) {
      if (err) { res.send(err) }
      else res.json({ status: 'All orders deleted' });
    }
    Order.collection.deleteMany({}, deleteAllOrders);
  }
}

export default OrderController;

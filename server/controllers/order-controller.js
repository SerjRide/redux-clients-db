import Order from '../models/order';

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

    order.save().then(() => {
      console.log('order added...');
      res.send({ status: 'ok' });
    })
    .catch(() => {})
  }

  read(req, res) {
    Order.findOne({ _id: req.params.id }).then(post => {
      if (!post) {
        res.send({ error: 'not found' });
      } else {
        res.json(post);
      }
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
    Order.remove({
      _id: req.params.id,
    }).then(post => {
      if (post) {
        res.json({ status: 'deleted' });
      } else res.json({ status: 'error' });
    })
    .catch(() => {});
  }
}

export default OrderController;

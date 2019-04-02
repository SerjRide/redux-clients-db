import express from 'express';
import Order from '../models/order';

const app = express();

app.get('/orders', (req, res) => {
  Order.find().then((err, orders) => {
    if (err) res.send(err);
    res.json(orders);
  })
});

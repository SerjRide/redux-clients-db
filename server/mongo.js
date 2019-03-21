import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import Order from './models/order';
import OrderController from './controllers/order-controller';

const ORC = new OrderController();

const app = express();
mongoose.connect('mongodb://localhost/orders', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getorders', ORC.index);
app.post('/setorder', ORC.create);
app.get('/orders/:id', ORC.read);
app.delete('/orders/:id', ORC.delete);
app.put('/orders/:id', ORC.update);

app.listen(8080, () => {
  console.log('server started on 8080 port...')
})

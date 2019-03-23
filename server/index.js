import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import Order from './models/order';
import OrderController from './controllers/order-controller';
import baseGenerator from './controllers/base-generator';
const exel = require('../etc/exel-to-json.json');

const ORC = new OrderController();

const app = express();
mongoose.connect('mongodb://localhost/orders', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getorders', ORC.index);
app.post('/setorder', ORC.create);
app.post('/setorders', ORC.createMany);
app.get('/orders/:id', ORC.read);
app.delete('/delorder/:id', ORC.delete);
app.delete('/delallorders', ORC.deleteAll);
app.put('/orders/:id', ORC.update);

// 1-ый аргумент - год
// 2-й аргумент - рентабельность

// baseGenerator(18, 'mid');

app.listen(8080, () => {
  console.log('server started on 8080 port...')
})

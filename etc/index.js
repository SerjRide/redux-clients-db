import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import OrderController from './controllers/order-controller';
import CustomersController from './controllers/customers-controller';
import extracter from './controllers/extracter';
import signIn from './controllers/auth';
import authMiddleware from './middleware/auth';
const config = require('../etc/config.json');
const url = config.apiPrefix;

const ORC = new OrderController();
const CC = new CustomersController();
const { prefix, name } = config.db

const app = express();
mongoose.connect(`${prefix}/${name}`, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/orders', ORC.index);
app.get('/orders/:year', authMiddleware, ORC.getByYear);
app.post('/order', authMiddleware, ORC.create);
app.post('/orders', authMiddleware, ORC.createMany);
app.post('/random-orders/gen?', ORC.createRandomDate);
app.delete('/order/:id', authMiddleware, ORC.delete);
app.delete('/orders', ORC.deleteAll);
app.put('/order/:id', authMiddleware, ORC.update);

app.get('/customers', authMiddleware, CC.index);
app.post('/customer', CC.createOne);
app.delete('/customers', CC.deleteAll);



app.put('/customers', (req, res) => {
  axios.get(`${url}/orders`).then((allCustomers) => {
    const customers = extracter(allCustomers);
    for (let i = 0; i < customers.length; i++) {
      axios.popost(`${url}/customer`, customers[i])
    }
    console.log('all customers was be extracted...');
  });
});

app.post('/signin', signIn);

app.listen(config.serverPort, () => {
  console.log(`server started on ${config.serverPort} port...`)
})

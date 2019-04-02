import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import bCrypt from 'bcrypt';
import OrderController from './controllers/order-controller';
import CustomersController from './controllers/customers-controller';
import Customers from './models/customers';
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

app.get('/orders', authMiddleware ,ORC.index);
app.get('/orders/:year', ORC.getByYear);
app.post('/order', ORC.create);
app.post('/orders', ORC.createMany);
app.post('/random-orders/gen?', ORC.createRandomDate);
app.delete('/order/:id', ORC.delete);
app.delete('/orders', ORC.deleteAll);
app.put('/order/:id', ORC.update);

app.get('/customers', CC.index);
app.post('/customer', CC.createOne);
app.delete('/customers', CC.deleteAll);

app.put('/customers', (req, res) => {
  axios.get(`${url}/orders`).then((allCustomers) => {
    const customers = extracter(allCustomers);
    for (let i = 0; i < customers.length; i++) {
      axios.post(`${url}/customer`, customers[i])
    }
    console.log('all customers was be extracted...');
  });
});

app.post('/signin', signIn);

const generateRandomBase = async (year, profit) => {
  await console.log(`The process of generating data for ${year}, profit: ${profit}`)
  await axios.post(`${url}/random-orders/gen?year=${year}&profit=${profit}`)
}

const deleteAllOrders = async () => {
  await axios.delete(`${url}/orders`).then(() => {
    console.log('All orders was be deleted')
  });
}

const deleteAllCustomers = async () => {
  await axios.delete(`${url}/customers`)
}

const extractCustomers =  async () => {
  await axios.put(`${url}/customers`);
}

const randomData = (withYear) => {
  deleteAllOrders().then(() => {
    deleteAllCustomers().then(() => {
      const count = (20 - withYear); let type;
      for (let i = 0; i < count; i++) {
        if (i <   (count / 2)) type = 'low';
        if (i >=  (count / 2) && i < count) type = 'mid';
        if (i === (count - 1)) type = 'hight'
        generateRandomBase((withYear + i), type)
      }
      extractCustomers();
    });
  });
};

const genBCryptHash = (text) => {
  const saltRounds = 10;
  const myPlaintextPassword = text;
  const hash = bCrypt.hashSync(myPlaintextPassword, saltRounds);
  console.log('hash was be generated');
  console.log(hash);
}

// randomData(16);
// genBCryptHash('ytrewq');

app.listen(config.serverPort, () => {
  console.log(`server started on ${config.serverPort} port...`)
})

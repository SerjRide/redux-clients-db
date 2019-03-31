import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import OrderController from './controllers/order-controller';
import CustomersController from './controllers/customers-controller';
import Customers from './models/customers';
import extracter from './controllers/extracter';
const url = 'http://localhost:8080';

const ORC = new OrderController();
const CC = new CustomersController();

const app = express();
mongoose.connect('mongodb://localhost/orders', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getorders', ORC.index);
app.get('/getbyyear/:year', ORC.getByYear);
app.post('/setorder', ORC.create);
app.post('/setorders', ORC.createMany);
app.post('/setrandomdata/gen?', ORC.createRandomDate);
app.get('/orders/:id', ORC.read);
app.delete('/delorder/:id', ORC.delete);
app.delete('/delallorders', ORC.deleteAll);
app.put('/updateorder/:id', ORC.update);

app.get('/getcustomers', CC.index);
app.post('/setcustomer', CC.createOne);
app.delete('/delallcustomers', CC.deleteAll);

app.get('/extract-customers', (req, res) => {
  axios.get(`${url}/getorders`).then((allCustomers) => {
    const customers = extracter(allCustomers);
    for (let i = 0; i < customers.length; i++) {
      axios.post(`${url}/setcustomer`, customers[i])
    }
    console.log('all customers was be extracted...');
  });
});

const generateRandomBase = async (year, profit) => {
  await console.log(`The process of generating data for ${year}, profit: ${profit}`)
  await axios.post(`${url}/setrandomdata/gen?year=${year}&profit=${profit}`)
}

const deleteAllOrders = async () => {
  await axios.delete(`${url}/delallorders`).then(() => {
    console.log('All orders was be deleted')
  });
}

const deleteAllCustomers = async () => {
  await axios.delete(`${url}/delallcustomers`)
}

const extractCustomers =  async () => {
  await axios.get(`${url}/extract-customers`);
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

randomData(16);

app.listen(8080, () => {
  console.log('server started on 8080 port...')
})

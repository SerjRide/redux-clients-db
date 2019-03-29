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
app.put('/orders/:id', ORC.update);

app.get('/getcustomers', CC.index);
app.post('/setcustomers', CC.createMany);
app.delete('/delallcustomers', CC.deleteAll);

const generateRandomBase = (year, profit) => {
  axios.post(`${url}/setrandomdata/gen?year=${year}&profit=${profit}`);
  console.log(`The process of generating data for ${year}...`)
}

const deleteAllOrders = () => {
  axios.delete(`${url}/delallorders`);
  console.log('All orders was be deleted')
}

const extractClients = async (year) => {
  axios.delete(`${url}/delallcustomers`);
  axios.get(`${url}/getorders`)
       .then((res) => {
         const customers = extracter(res, year);
         axios.post(`${url}/setcustomers`, customers)
         .then((res) => console.log(res.data))
         .catch((err) => console.log(err))
       });
}

app.get('/getcustomersbyyear/:year', (req, res, next) => {

  axios.delete(`${url}/delallcustomers`)
    .then(() => console.log('Все предыдущие записи удалены...'));

next();
}, (req, res) => {

  const year = Number(req.params.year);
  axios.get(`${url}/getorders`)
       .then((allCustomers) => {
         const customers = extracter(allCustomers, year);

         axios.post(`${url}/setcustomers`, customers)
         .then((status) => {
           Customers.find().then((err, getCustomers) => {
             if (err) res.send(err);
             console.log('get all customers');
             res.json(getCustomers)
           })
         })
       });


});

const randomData = () => {
  deleteAllOrders()
  generateRandomBase(16, 'low');
  generateRandomBase(17, 'low');
  generateRandomBase(18, 'mid');
  generateRandomBase(19, 'hight');
};

// randomData();
// extractClients(18);

app.listen(8080, () => {
  console.log('server started on 8080 port...')
})

// app.get('/getcustomersbyyear/:year', (req, res, next) => {
//
//   axios.delete(`${url}/delallcustomers`)
//     .then(() => console.log('Все предыдущие записи удалены...'));
//
// next();
// }, (req, res) => {
//
//   const year = Number(req.params.year);
//   axios.get(`${url}/getorders`)
//        .then((allCustomers) => {
//          const customers = extracter(allCustomers, year);
//
//          axios.post(`${url}/setcustomers`, customers)
//          .then((status) => {
//            Customers.find().then((err, getCustomers) => {
//              if (err) res.send(err);
//              console.log('get all customers');
//              res.json(getCustomers)
//            })
//              .catch(() => {})
//          })
//          .catch((err) => console.log(err))
//        });
//
//
// });

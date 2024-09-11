const fs = require('fs/promises');

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static('public/images'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const { order: orderData } = req.body;

  if (!orderData?.items?.length) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  const { customer } = orderData;
  const isValid = ['email', 'fullName', 'street', 'postalCode', 'city'].every(
    (field) => customer[field]?.value?.trim() && (field !== 'email' || customer.email.value.includes('@'))
  );

  if (!isValid) {
    return res.status(400).json({
      message: 'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    id: (Math.random() * 1000).toString(),
    items: orderData.items,
    customer: Object.fromEntries(Object.entries(customer).map(([key, { value }]) => [key, value])),
  };

  const orders = await fs.readFile('./data/orders.json', 'utf8');

  const allOrders = JSON.parse(orders);

  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);

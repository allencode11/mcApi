/*
    this is the entry point of the app
    in this file should be only the things that are related with express
 */

// dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

// connecting with routers
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');

// using environments
dotenv.config();

const port = process.env.PORT || 3000;

// creating the app
const app = express();

// connect to database
mongoose
  .connect(process.env.MONGO_CONN_STR, {
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());

// adding routers
app.use('/items', itemRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.post('/api/login', (req, res) => {
  const user = {
    email: 'alina.enache@gmail.com',
    name: 'alina',
    photo: '',
    password: '1234pass',
  };

  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({
      token,
    });
  });
});

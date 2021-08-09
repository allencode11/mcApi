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

// connecting with routers
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');

// using environments
dotenv.config();

const port = process.env.PORT || 8000;

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

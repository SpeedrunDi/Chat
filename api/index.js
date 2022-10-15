const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
const exitHook = require('async-exit-hook');
const config = require('./config');

const app = express();
require('express-ws')(app);

app.use(express.json());
app.use(cors());

const port = 8000;

const users = require('./app/users');

app.use('/users', users);

const run = async () => {
  await mongoose.connect(config.db.url, config.db.options);

  app.listen(port, () => {
    console.log('Started on port ' + port);
  });

  exitHook(() => {
    console.log('Mongoose disconnected')
  });
};

run().catch(e => console.error(e));
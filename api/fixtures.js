const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const User = require("./models/User");
const Message = require("./models/Message");

const run = async () => {
  await mongoose.connect(config.db.url);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [admin, user, jack] = await User.create({
    username: 'admin',
    password: 'admin',
    role: 'admin',
    token: nanoid(),
  }, {
    username: 'user',
    password: 'user',
    role: 'user',
    token: nanoid(),
  }, {
    username: 'jack',
    password: 'jack',
    role: 'user',
    token: nanoid(),
  });

  const [message1, message2, message3, message4] = await Message.create({
    text: 'Hi people',
    user: admin,
    datetime: '2022-10-16T09:39:08.578Z',
  }, {
    text: 'Hi',
    user: user,
    datetime: '2022-10-16T09:39:09.578Z',
  }, {
    text: 'Hi!',
    user: jack,
    datetime: '2022-10-16T09:39:22.578Z',
  }, {
    text: 'how are you?',
    user: admin,
    datetime: '2022-10-16T09:39:30.578Z',
  }, {
    text: 'nice',
    user: user,
    datetime: '2022-10-16T09:39:40.578Z',
  }, {
    text: 'Perfect how about you?',
    user: jack,
    datetime: '2022-10-16T09:39:50.578Z',
  }, {
    text: 'I\'m good too',
    user: admin,
    datetime: '2022-10-16T09:39:55.578Z',
  });

  await mongoose.connection.close();
};

run().catch(console.error);
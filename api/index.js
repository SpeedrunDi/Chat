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
const User = require("./models/User");
const Message = require("./models/Message");

app.use('/users', users);

const onlineConnections = {};

app.ws('/messages', async(ws, req) => {
  const token = req.query.token;

  if(!token) {
    return ws.send(JSON.stringify({
    error: 'Wrong token'
    }))
  }

  const user = await User.findOne({token: token});

  if(!user) {
    return ws.send(JSON.stringify({
      error: 'User not found'
    }));
  }

  const connectedUser = JSON.stringify({
    username: user.username,
    id: user._id
  })

  console.log('Client connected ', connectedUser);
  onlineConnections[connectedUser] = ws;

  const lastMessages = await Message.find().sort({datetime: -1}).limit(30).populate('user', 'username');
  const messages = lastMessages.reverse();
  ws.send(JSON.stringify({
    type: 'CONNECTED',
    user,
    messages,
    onlineConnections
  }));

  ws.on('close', () => {
    console.log('Client disconnected id = ', connectedUser);
    delete onlineConnections[connectedUser]
  });

  ws.on('message', async msg => {
    const newMessage = JSON.parse(msg);
    console.log(newMessage)

    switch(newMessage.type) {
      case 'POST_MESSAGE':
        Object.keys(onlineConnections).forEach(connectId => {
          const connect = onlineConnections[connectId];

          connect.send(JSON.stringify(({
            type: 'NEW_MESSAGE',
            message: {
              user: user._id,
              text: newMessage.message
            }
          })))
        });

        const messageData = {
          text: newMessage.message.text,
          user: newMessage.message.user,
          datetime: new Date().toISOString(),
          recipient: newMessage.message.recipient
        }

        const message = new Message(messageData);
        await message.save();
        break;
      default:
        console.log('Unknown message type: ', newMessage.type)
    }
    ws.send(msg)
  })
  console.log(onlineConnections);
})

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
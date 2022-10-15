const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  datetime: String,
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validateMessage = async value => {
  const pattern = /^[ \s\t\n]+/;

  if (pattern.test(value)) return value.replace(pattern, '');
};

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
    validate: [
      {validator: validateMessage}
    ]
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


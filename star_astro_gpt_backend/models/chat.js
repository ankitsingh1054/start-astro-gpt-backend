const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const chatSchema = mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  messages: [messageSchema]
});

module.exports = mongoose.model('Chat', chatSchema);

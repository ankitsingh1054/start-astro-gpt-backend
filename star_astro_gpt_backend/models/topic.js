const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Topic', topicSchema);

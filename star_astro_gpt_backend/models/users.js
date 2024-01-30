const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: () => new mongoose.Types.ObjectId().toHexString()
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  from: {
    type: String,
    enum: ['google', 'normal'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number
    // required: true
  },
  month: {
    type: Number
    // required: true
  },
  day: {
    type: Number
    // required: true
  },
  hour: {
    type: Number
    // required: true
  },
  min: {
    type: Number
    // required: true
  },
  lon: {
    type: Number
    // required: true
  },
  lat: {
    type: Number
    // required: true
  },
  tzone: {
    type: Number
    // required: true
  },
  gender: {
    type: String
    // required: true
  },
  profilePic: {
    type: String
  },
  haveData: {
    type: Boolean
  },
  partnerDetails: {
    type: mongoose.Schema.Types.Mixed
  },
  report: {
    type: [Object],
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  }
});

module.exports = mongoose.model('User', userSchema);

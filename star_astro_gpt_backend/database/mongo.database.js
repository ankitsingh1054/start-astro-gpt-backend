const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('🔗 Sucessfully connected to database!');
  } catch (error) {
    console.error(error);
    throw new Error('❗Failed to connect with database!');
  }
};

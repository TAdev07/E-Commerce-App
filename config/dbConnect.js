const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Database connection is ready');
  } catch (error) {
    console.error('Database error');
  }
};

module.exports = dbConnect;

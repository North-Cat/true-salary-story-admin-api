const config = require('config');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === 'dev'
        ? config.database.dev
        : config.database.prod;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

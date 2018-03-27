require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB Configuration

const {
  MONGO_URI: mongoURI
} = process.env;

module.exports = (function() {
  mongoose.Promise = global.Promise;
  return {
    connect() {
      mongoose.connect(mongoURI).then(() => {
        console.log('Successfully connected mongoDB');
      }).catch(e => {
        console.error(e);
      });
    }
  }
})();
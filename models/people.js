const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
   
  },
  age: {
    type: Number,
    required: true
  },
  
}

);

const people = mongoose.model('contactlist', userSchema, 'contactlist' );

module.exports = people;

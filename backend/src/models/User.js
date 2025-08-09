// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  age: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;

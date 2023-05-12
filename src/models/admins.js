const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
  account: {
    type: String,
    required: [true, '請輸入您的帳號'],
  },
  password: {
    type: String,
    required: [true, '請輸入您的密碼'],
    minlength: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

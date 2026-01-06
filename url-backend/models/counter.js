const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  serverId: { type: String, required: true, unique: true },
  currentCounter: { type: Number, required: true },
  rangeEnd: { type: Number, required: true }
});

module.exports = mongoose.model('Counter', counterSchema);
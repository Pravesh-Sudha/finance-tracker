const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('Transaction', transactionSchema);
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: [true, 'Description is required'] },
  amount: { type: Number, required: [true, 'Amount is required'], min: [0.01, 'Amount must be positive'] },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { 
    type: String, 
    enum: [
      'Food',
      'Transportation',
      'Utilities',
      'Entertainment',
      'Healthcare',
      'Shopping',
      'Income',
      'Other'
    ],
    required: true
  }
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;
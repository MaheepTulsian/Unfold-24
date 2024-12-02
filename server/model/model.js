import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  pk1: { type: String, required: true },
  pk2: { type: String, required: true }
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;

import express from 'express';
import Wallet from '../model/model.js';
import crypto from 'crypto';

const router = express.Router();

const generateEncryptionKey = (walletAddress) => {
  const salt = 'UNFOLD24'; // You can use a more secure salt
  const key = crypto.pbkdf2Sync(walletAddress, salt, 100000, 32, 'sha256');
  return key;
};

// Encryption function
const encrypt = (data, walletAddress) => {
  const encryptionKey = generateEncryptionKey(walletAddress); 
  const iv = crypto.randomBytes(16); // Generate a random IV
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Concatenate IV and encrypted data
  const result = iv.toString('hex') + encrypted;
  return result;
};

// Decryption function
const decrypt = (combined, walletAddress) => {
  const encryptionKey = generateEncryptionKey(walletAddress); 
  const iv = Buffer.from(combined.slice(0, 32), 'hex'); // First 32 hex chars (16 bytes)
  const encryptedData = combined.slice(32); // Rest is the encrypted data

  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// POST: Add a wallet
router.post('/', async (req, res) => {
  const { walletAddress, phoneNumber, pk } = req.body;

  if (!walletAddress || !phoneNumber || !pk) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const pk1 = pk.slice(0, pk.length / 2);  // First half of the pk string
    const pk2 = pk.slice(pk.length / 2);      // Second half of the pk string

    const existingWallet = await Wallet.findOne({ $or: [{ walletAddress }, { phoneNumber }] });

    if (existingWallet) {
      return res.status(400).json({ message: 'Wallet address or phone number must be unique.' });
    }

    // Encrypt pk1 and pk2 with IV included
    const encryptedPk1 = encrypt(pk1, walletAddress);
    const encryptedPk2 = encrypt(pk2, walletAddress);

    // Save encrypted keys in the database
    const wallet = new Wallet({
      walletAddress,
      phoneNumber,
      pk1: encryptedPk1,
      pk2: encryptedPk2,
    });
    await wallet.save();

    res.status(201).json({ message: 'Wallet information saved successfully.' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Wallet address or phone number must be unique.' });
    } else {
      res.status(500).json({ message: 'An error occurred.', error: error.message || error });
    }
  }
});

// GET: Get wallet by address
router.get('/:walletAddress', async (req, res) => {
  const { walletAddress } = req.params;

  try {
    const wallet = await Wallet.findOne({ walletAddress });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found.' });
    }

    // Decrypt pk1 and pk2
    const decryptedPk1 = decrypt(wallet.pk1, walletAddress);
    const decryptedPk2 = decrypt(wallet.pk2, walletAddress);

    res.status(200).json({
      walletAddress: wallet.walletAddress,
      phoneNumber: wallet.phoneNumber,
      pk1: decryptedPk1,
      pk2: decryptedPk2,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
});

// GET: Get wallet by phone number
router.get('/phone/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const wallet = await Wallet.findOne({ phoneNumber });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found.' });
    }

    // Decrypt pk1 and pk2
    const decryptedPk1 = decrypt(wallet.pk1, wallet.walletAddress);
    const decryptedPk2 = decrypt(wallet.pk2, wallet.walletAddress);

    res.status(200).json({
      walletAddress: wallet.walletAddress,
      phoneNumber: wallet.phoneNumber,
      pk1: decryptedPk1,
      pk2: decryptedPk2,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
});

export default router;

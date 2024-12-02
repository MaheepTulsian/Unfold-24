import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import walletRoutes from './routes/wallet.js';
import router from './routes/otp.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    credentials: true, // Enable credentials (e.g., cookies, authorization headers)
  })
);

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes
app.use('/api/wallet', walletRoutes);
app.use('/api/otp', router);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

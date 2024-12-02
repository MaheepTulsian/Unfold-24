import express from 'express';
import Twilio from 'twilio';  // ES module import
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Twilio client with credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const twilioClient = new Twilio(accountSid, authToken);

const router = express.Router();

// Route to send OTP
router.post('/sendOtp', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    // Send OTP using Twilio
    const verification = await twilioClient.verify.services(serviceSid).verifications.create({
      to: phone,
      channel: 'sms',
    });

    res.status(200).json({ message: 'OTP sent successfully', verificationSid: verification.sid });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
});

// Route to verify OTP
router.post('/verifyOtp', async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: 'Phone number and OTP are required' });
  }

  try {
    // Verify OTP using Twilio
    const verificationCheck = await twilioClient.verify.services(serviceSid).verificationChecks.create({
      to: phone,
      code: otp,
    });

    if (verificationCheck.status === 'approved') {
      res.status(200).json({ message: 'OTP Verified successfully!' });
    } else {
      res.status(400).json({ message: 'OTP Verification failed' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
});

export default router;

import React, { useState } from 'react';
import axios from 'axios';
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import Metamask from '../components/Metamask';
import Base from '../components/BaseWallet';
import { TextField, Button, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import Auth3d from '../assets/auth.spline';

function AuthPage() {
    const wallet = useWallet();
    const [activeStep, setActiveStep] = useState(0);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [privateKey, setPrivateKey] = useState('');

    const steps = ['Connect Wallet', 'Phone Verification', 'Enter Private Key'];

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const handlePhoneChange = (event) => setPhone(event.target.value);
    const handleOtpChange = (event) => setOtp(event.target.value);
    const handlePrivateKeyChange = (event) => setPrivateKey(event.target.value);

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/otp/sendOtp', { phone });
            if (response.status === 200) {
                setMessage('OTP sent successfully! Please enter it below.');
                setMessageType('success');
                handleNext();
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to send OTP. Please try again.');
            setMessageType('error');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/otp/verifyOtp', { phone, otp });
            if (response.status === 200) {
                setMessage('OTP verified successfully!');
                setMessageType('success');
                handleNext();
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to verify OTP. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            {/* Left section with 3D Auth component */}
            <div className="w-1/2 min-h-full flex items-center justify-center">
                <Auth3d />
            </div>
            
            {/* Right section with form */}
            <div className="w-1/2 min-h-full flex flex-col items-center justify-center">
                {/* Stepper at the top */}
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Step content */}
                <div className="w-full max-w-md mt-6">
                    {activeStep === 0 && (
                        <div className="flex flex-col items-center">
                            <ConnectButton />
                            <Metamask />
                            <Base />
                            <Typography variant="body1" className="mt-4">
                                Connect your wallet to proceed.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className="mt-4"
                            >
                                Next
                            </Button>
                        </div>
                    )}

                    {activeStep === 1 && (
                        <Box>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                value={phone}
                                onChange={handlePhoneChange}
                                className="mb-4"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSendOtp}
                            >
                                Send OTP
                            </Button>
                            {message && (
                                <Typography
                                    variant="body2"
                                    className={`mt-2 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    {message}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleBack}
                                className="mt-4"
                            >
                                Back
                            </Button>
                        </Box>
                    )}

                    {activeStep === 2 && (
                        <Box>
                            <TextField
                                fullWidth
                                label="Private Key"
                                variant="outlined"
                                value={privateKey}
                                onChange={handlePrivateKeyChange}
                                className="mb-4"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                className="mb-4"
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </Box>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;

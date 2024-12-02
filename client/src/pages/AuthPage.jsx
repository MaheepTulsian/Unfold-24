import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material'; // Import arrow icons
import { IconButton } from "@mui/material";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
import BaseWallet from '../components/BaseWallet';
import { motion } from 'framer-motion';
import Auth3d from '../assets/auth.spline';
import useWalletStore from '../store/wallet';
import { useNavigate } from 'react-router-dom';

function AuthFlow() {
    const navigate = useNavigate();
    const walletAddress = useWalletStore((state) => state.walletAddress);
    const [activeStep, setActiveStep] = useState(0);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [isOtpSent, setIsOtpSent] = useState(false); // Conditional rendering flag
    const [pk, setPk] = useState('');


    const steps = ['Connect Wallet', 'Verify OTP', 'Private Key Input'];

    const handlePhoneChange = (event) => setPhone(event.target.value);
    const handleOtpChange = (event) => setOtp(event.target.value);
    const handlePkChange = (event) => setPk(event.target.value);


    const handleSendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/otp/sendOtp', { phone });
            if (response.status === 200) {
                setMessage('OTP sent successfully! Please enter it below.');
                setMessageType('success');
                setIsOtpSent(true);
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
                setActiveStep(2);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to verify OTP. Please try again.');
            setMessageType('error');
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                        <BaseWallet />
                    </motion.div>
                );
            case 1:
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                        {!isOtpSent ? (
                            <div className='flex flex-col gap-4'>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    variant="outlined"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    sx={{
                                        '& .MuiInputLabel-root': { color: '#bbb' },
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#1f1f1f',
                                            color: '#fff',
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleSendOtp}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg mt-4"
                                >
                                    Send OTP
                                </Button>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-4'>
                                <TextField
                                    fullWidth
                                    label="OTP"
                                    variant="outlined"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    sx={{
                                        '& .MuiInputLabel-root': { color: '#bbb' },
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#1f1f1f',
                                            color: '#fff',
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleVerifyOtp}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg mt-4"
                                >
                                    Verify OTP
                                </Button>
                            </div>
                        )}
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 mb-6">
                        <TextField
                            fullWidth
                            label="Private Key"
                            variant="outlined"
                            value={pk}
                            onChange={handlePkChange}
                            sx={{
                                '& .MuiInputLabel-root': { color: '#bbb' },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#1f1f1f',
                                    color: '#fff',
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg mt-4"
                        >
                            Submit
                        </Button>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        navigate(`./${walletAddress}`);
    };
    
    

    return (
        <div className="min-h-screen w-full flex">
            <div className="w-1/2 min-h-full flex items-center justify-center">
                <Auth3d />
            </div>
            <div className="w-1/2 min-h-full flex flex-col items-center justify-center">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index} >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    className="w-full max-w-sm mx-auto p-6 rounded-lg"
                >
                    {renderStepContent(activeStep)}
                    {message && (
                        <Typography
                            variant="body2"
                            className={`text-center mt-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}
                        >
                            {message}
                        </Typography>
                    )}
                    <Box className="flex justify-between mt-6" style={{ width: "100%", display: "flex", alignItems: "center" }}>
                        <IconButton
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            style={{
                                backgroundColor: activeStep === 0 ? "#f0f0f0" : "#1976d2",
                                color: activeStep === 0 ? "#ccc" : "#fff",
                                border: "none",
                                width: "30px",
                                height: "30px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            disabled={activeStep === steps.length - 1}
                            style={{
                                backgroundColor: activeStep === steps.length - 1 ? "#f0f0f0" : "#1976d2",
                                color: activeStep === steps.length - 1 ? "#ccc" : "#fff",
                                border: "none",
                                width: "30px",
                                height: "30px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <ArrowForward />
                        </IconButton>
                    </Box>

                </Box>
            </div>
        </div>
    );
}

export default AuthFlow;
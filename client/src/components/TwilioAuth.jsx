// import { Box, TextField, Button, Snackbar } from '@mui/material';
// import { useState } from 'react';
// import { client } from 'twilio'; // Import Twilio client

// const accountSid = 'AC4ac8232eaa5f65b7fe1a508e581b0466';
// const authToken = '9ed3d3bf0cddd24e03f2f7b04087fe91'; // Replace with your actual AuthToken
// const twilioClient = client(accountSid, authToken);
// const serviceSid = 'VA51933853bcbc5f1b3b17a6932c241776'; // Replace with your service SID

// function OTPForm() {
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false); // To track if OTP has been sent
//   const [verificationStatus, setVerificationStatus] = useState(''); // To display verification status
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const handlePhoneChange = (e) => setPhone(e.target.value);
//   const handleOtpChange = (e) => setOtp(e.target.value);

//   const handleSubmit = async () => {
//     try {
//       // Send OTP
//       const verification = await twilioClient.verify.v2.services(serviceSid)
//         .verifications
//         .create({ to: phone, channel: 'sms' });
      
//       console.log(verification.sid);
//       setOtpSent(true); // Set OTP sent flag
//       setVerificationStatus('OTP sent! Please check your phone.');
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       setVerificationStatus('Error sending OTP. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       // Verify OTP
//       const verificationCheck = await twilioClient.verify.v2.services(serviceSid)
//         .verificationChecks
//         .create({ to: phone, code: otp });

//       if (verificationCheck.status === 'approved') {
//         setVerificationStatus('OTP Verified successfully!');
//       } else {
//         setVerificationStatus('OTP Verification failed. Please try again.');
//       }
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       setVerificationStatus('Error verifying OTP. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Box component="form" noValidate autoComplete="off" className="w-full max-w-sm mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
//       <div className="mb-6">
//         <TextField
//           fullWidth
//           label="Phone Number"
//           variant="outlined"
//           value={phone}
//           onChange={handlePhoneChange}
//           sx={{
//             '& .MuiInputLabel-root': { color: '#bbb' },
//             '& .MuiOutlinedInput-root': {
//               backgroundColor: '#1f1f1f',
//               color: '#fff',
//               '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
//             },
//           }}
//         />
//       </div>

//       <div className="mb-6">
//         <TextField
//           fullWidth
//           label="OTP"
//           variant="outlined"
//           value={otp}
//           onChange={handleOtpChange}
//           sx={{
//             '& .MuiInputLabel-root': { color: '#bbb' },
//             '& .MuiOutlinedInput-root': {
//               backgroundColor: '#1f1f1f',
//               color: '#fff',
//               '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
//             },
//           }}
//         />
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleVerifyOtp}
//           disabled={!otpSent || !otp}
//           className="mt-2 w-full"
//         >
//           Verify OTP
//         </Button>
//       </div>

//       <div className="mb-4">
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleSubmit}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           Send OTP
//         </Button>
//       </div>

//       {/* Snackbar for status */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         message={verificationStatus}
//       />
//     </Box>
//   );
// }

// export default OTPForm;

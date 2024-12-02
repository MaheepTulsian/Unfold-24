import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import OktoAuth from './components/Metamask';
import AuthPage from './pages/AuthPage';
import OktoWallet from './pages/OktoWallet';
import Temp from './pages/Temp'
import TestSMS from './pages/TwilioRecieve'
import Dashboard from './pages/Dashboard';

import { OktoProvider, BuildType } from 'okto-sdk-react';
import { GoogleOAuthProvider } from '@react-oauth/google';

// API Keys
const OKTO_CLIENT_API_KEY = "f840132e-e755-4a4c-a12a-5602730e7295";
const GOOGLE_CLIENT_ID = "953889624064-cr1a874b534b6jbeq142f0kph6g0a665.apps.googleusercontent.com";

function App() {
  return (
    <BrowserRouter>
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<OktoAuth />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/temp" element={<Temp />} />
            <Route path="/okto" element={<OktoWallet />} />
            <Route path="/sms" element={<TestSMS />} />
            <Route path="/walletAddress" element={<Dashboard />} />
          </Routes>
        </GoogleOAuthProvider>
      </OktoProvider>
    </BrowserRouter>
  );
}

export default App;   
import React, { useState } from 'react';
import { useOkto } from 'okto-sdk-react';
import { GoogleLogin } from '@react-oauth/google'; // Make sure to import GoogleLogin
import axios from 'axios';

const ViewWalletPage = () => {
  const { authenticate } = useOkto();
  const [authToken, setAuthToken] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch wallets
  const fetchWallets = async () => {
    setLoading(true);
    setError(null);
    try {
      const wallets = await getWallets(authToken);
      setWallets(wallets);
    } catch (e) {
      setError(e.message || 'Failed to fetch wallet');
    } finally {
      setLoading(false);
    }
  };

  // Function to call Okto API to get wallets
  const getWallets = async (authToken) => {
    const options = {
      method: 'GET',
      url: 'https://sandbox-api.okto.tech/api/v1/wallet',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      throw new Error('Error fetching wallets');
    }
  };

  // Google Login Success handler
  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    // Authenticate with Okto using the Google idToken
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        console.log('Authenticated successfully, auth token:', authResponse.auth_token);
      } else if (error) {
        console.error('Authentication error:', error);
      }
    });
  };

  return (
    <div style={{ backgroundColor: '#5166EE', padding: '20px', height: '100vh' }}>
      <h1 style={{ color: 'white', fontWeight: '800', fontSize: '30px', textAlign: 'center' }}>Get Wallet</h1>

      {!authToken ? (
        <div>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={(error) => console.error('Login Failed', error)}
          />
        </div>
      ) : (
        <div>
          <button
            onClick={fetchWallets}
            style={{
              backgroundColor: 'blue',
              color: 'white',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Get Wallet
          </button>

          {loading && <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>}

          {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

          {wallets.length > 0 && (
            <div style={{ color: 'white' }}>
              <h2>Wallet created successfully</h2>
              <ul>
                {wallets.data.wallets.map((wallet, index) => (
                  <li key={index} style={{ backgroundColor: 'blue', margin: '5px 0', padding: '10px' }}>
                    <div style={{ color: 'white' }}>
                      <strong>Wallet address:</strong> {wallet.address}
                    </div>
                    <div style={{ color: 'white' }}>
                      <strong>Network name:</strong> {wallet.networkName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewWalletPage;

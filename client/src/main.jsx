import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WalletProvider } from "@suiet/wallet-kit"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>,
)
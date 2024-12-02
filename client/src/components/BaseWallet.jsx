// import { useState, useEffect } from "react";
// import { Button, Typography } from "@mui/material";
// import useWalletStore from "../store/wallet.js";

// export default function WalletConnection() {
//   const [provider, setProvider] = useState();
//   const [account, setAccount] = useState();
//   const [chainId, setChainId] = useState();
//   const [error, setError] = useState("");

//   const setWalletAddress = useWalletStore((state) => state.setWalletAddress);

//   // Utility function to convert a number to a hex string
//   const toHex = (num) => `0x${num.toString(16)}`;

//   // Utility function to truncate an Ethereum address for readability
//   const truncateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

//   // Connect with provider
//   const connectWithProvider = async (provider) => {
//     if (!provider) {
//       setError("Provider not found!");
//       return;
//     }

//     try {
//       setProvider(provider);
//       const accounts = await provider.request({ method: "eth_requestAccounts" });
//       if (accounts) setAccount(accounts[0]);

//       const chainId = await provider.request({ method: "eth_chainId" });
//       setChainId(Number(chainId));
//     } catch (error) {
//       setError(error.message || "An error occurred while connecting.");
//     }
//   };

//   // Disconnect wallet
//   const disconnect = () => {
//     setAccount("");
//     setChainId("");
//   };

//   useEffect(() => {
//     if (provider?.on) {
//       const handleAccountsChanged = (accounts) => {
//         if (accounts.length > 0) {
//           setAccount(accounts[0]);
//         }
//       };

//       const handleChainChanged = (chainId) => {
//         setChainId(chainId);
//       };

//       provider.on("accountsChanged", handleAccountsChanged);
//       provider.on("chainChanged", handleChainChanged);

//       return () => {
//         provider.removeListener("accountsChanged", handleAccountsChanged);
//         provider.removeListener("chainChanged", handleChainChanged);
//       };
//     }
//   }, [provider]);

//   useEffect(() => {
//     if (account) {
//       setWalletAddress(account);
//       console.log("Wallet Address: ", account);
//     }
//   }, [account, setWalletAddress]);

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <div className="flex flex-row items-center space-x-4">
//         {!account ? (
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => connectWithProvider(window.ethereum)}
//           >
//             Connect Wallet
//           </Button>
//         ) : (
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={disconnect}
//           >
//             Disconnect
//           </Button>
//         )}
//       </div>

//       <div className="text-center">
//         <Typography variant="body1" className="text-lg">
//           {account ? `Account: ${truncateAddress(account)}` : "Not connected"}
//         </Typography>
//         <Typography variant="body1" className="text-lg">
//           {`Network ID: ${chainId || "No Network"}`}
//         </Typography>
//       </div>

//       {error && (
//         <Typography variant="body1" className="text-red-500">
//           {error}
//         </Typography>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import useWalletStore from "../store/wallet.js";

export default function WalletConnection() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [error, setError] = useState("");

  const setWalletAddress = useWalletStore((state) => state.setWalletAddress);

  const toHex = (num) => `0x${num.toString(16)}`;
  const truncateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const connectWithProvider = async (provider) => {
    if (!provider) {
      setError("Provider not found!");
      return;
    }

    try {
      setProvider(provider);
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (accounts) setAccount(accounts[0]);

      const chainId = await provider.request({ method: "eth_chainId" });
      setChainId(Number(chainId));
    } catch (error) {
      setError(error.message || "An error occurred while connecting.");
    }
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) setAccount(accounts[0]);
      };

      const handleChainChanged = (chainId) => {
        setChainId(chainId);
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);

      return () => {
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [provider]);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
    }
  }, [account, setWalletAddress]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {account ? (
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{
            fontSize: "1rem",
            padding: "0.8em 1.6em",
            borderRadius: "1.5em",
            background: "#1976d2",
            color: "#fff",
          }}
          onClick={() => connectWithProvider(window.ethereum)}
        >
          {truncateAddress(account)}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{
            fontSize: "1rem",
            padding: "0.8em 1.6em",
            borderRadius: "1.5em",
            //dark-gray hex code
            background: "#333",
            color: "#fff",
          }}
          onClick={() => connectWithProvider(window.ethereum)}
        >
          Connect Wallet
        </Button>
      )}

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
}

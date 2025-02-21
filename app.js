// Initialize connection to Solana
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

// Global variable for wallet provider
let walletProvider = null;

// Connect wallet function
const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            console.log('Connected', response.publicKey.toString());
            walletProvider = response;
        } catch (err) {
            console.log('Wallet connection failed', err);
        }
    } else {
        alert('Please install Phantom wallet to proceed.');
    }
};

// Countdown for Pre-Sale
const countdownTimer = () => {
    const endDate = new Date('2025-04-10T00:00:00Z').getTime();
    const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById('countdown').innerHTML = "EXPIRED";
        }
    }, 1000);
};

// Buy ONPI function (simplified, add logic to send transaction)
const buyONPI = () => {
    if (!walletProvider) {
        alert('Please connect your wallet first!');
        return;
    }

    // Implement token purchase logic here, using the connected wallet
    console.log('Purchasing ONPI...');

    // For now, just log the public key
    console.log(walletProvider.publicKey.toString());
};

// Event listeners for buttons
document.getElementById('connect-wallet-btn').addEventListener('click', connectWallet);
document.getElementById('buy-btn').addEventListener('click', buyONPI);

// Start countdown on page load
window.onload = countdownTimer;

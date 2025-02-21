// Importing required Solana adapter and wallet connection methods
const { Connection, clusterApiUrl, PublicKey, Transaction } = window.solanaWeb3;
const { WalletAdapterNetwork } = window['@solana/wallet-adapter-base'];
const { PhantomWalletAdapter, SolletWalletAdapter, SolflareWalletAdapter } = window['@solana/wallet-adapter-wallets'];
const { useWallet } = window['@solana/wallet-adapter-react-ui'];

// Initialize Solana network connection
const network = WalletAdapterNetwork.Mainnet;
const endpoint = clusterApiUrl(network);
const connection = new Connection(endpoint);

// Initialize wallet adapters
const wallets = [
    new PhantomWalletAdapter(),
    new SolletWalletAdapter(),
    new SolflareWalletAdapter()
];

// Setup wallet connection and interaction
let walletAdapter = null;

// Connect button
document.getElementById('connect-wallet').addEventListener('click', async () => {
    try {
        if (!walletAdapter) {
            walletAdapter = new PhantomWalletAdapter();
            await walletAdapter.connect();
            document.getElementById('wallet-status').textContent = `Wallet connected: ${walletAdapter.publicKey.toString()}`;
        } else {
            await walletAdapter.disconnect();
            document.getElementById('wallet-status').textContent = 'Wallet disconnected';
        }
    } catch (error) {
        document.getElementById('wallet-status').textContent = 'Connection failed';
    }
});

// Handling the purchase of tokens
document.getElementById('buy-button').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;

    if (!amount || isNaN(amount) || parseFloat(amount) < 0.03 || parseFloat(amount) > 1.5) {
        alert("Amount must be between 0.03 and 1.5 SOL");
        return;
    }

    // Your smart contract address and token details
    const smartContractAddress = new PublicKey('4dnv1yjdmYYdBKLkMokGLVNxCpyxQrD2yi6MRbtPU5DK');
    const transaction = new Transaction().add(
        // Add necessary instructions for token purchase here
    );

    try {
        const signature = await walletAdapter.sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature);
        document.getElementById('status').textContent = 'Transaction successful: ' + signature;
    } catch (error) {
        document.getElementById('status').textContent = 'Transaction failed';
    }
});

// Countdown Timer for Pre-sale
function startCountdown() {
    const endDate = new Date("2025-04-10T00:00:00Z").getTime();
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "Pre-sale has ended";
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown").innerHTML = `Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

startCountdown();

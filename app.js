document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("buyButton").addEventListener("click", buyToken);

let walletAddress = "";

function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        window.solana.connect().then(response => {
            walletAddress = response.publicKey.toString();
            document.getElementById("walletAddress").textContent = `Connected: ${walletAddress}`;
        }).catch(err => {
            console.error("Connection error:", err);
        });
    } else {
        alert("Please install Phantom Wallet.");
    }
}

function buyToken() {
    const solAmount = parseFloat(document.getElementById("amount").value);
    if (solAmount < 0.03 || solAmount > 1.5) {
        document.getElementById("status").textContent = "Amount should be between 0.03 SOL and 1.5 SOL.";
    } else {
        // Add functionality to buy ONPI here
        document.getElementById("status").textContent = `Buying ${solAmount} SOL worth of ONPI...`;
    }
}

// Countdown timer
const endDate = new Date('2025-04-10T00:00:00Z').getTime();
const countdownElement = document.getElementById("countdown");

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = endDate - now;

    if (timeLeft <= 0) {
        countdownElement.innerHTML = "Pre-sale has ended!";
        clearInterval(timer);
    } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

const timer = setInterval(updateCountdown, 1000);
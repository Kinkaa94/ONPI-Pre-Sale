// Setează cronometru
const countdownDate = new Date("April 10, 2025 23:59:59").getTime();

const countdownFunction = setInterval(function() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);

// Conectează wallet-ul
document.getElementById("connect-wallet-btn").addEventListener("click", async () => {
  if (window.solana) {
    try {
      await window.solana.connect();
      console.log("Wallet Connected: ", window.solana.publicKey.toString());
      alert("Wallet Connected");
    } catch (error) {
      console.error(error);
      alert("Failed to connect wallet");
    }
  } else {
    alert("Please install a Solana wallet extension (e.g., Phantom or Sollet)");
  }
});

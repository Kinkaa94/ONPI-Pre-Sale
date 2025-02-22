let connection, wallet, provider;
const preSaleContractAddress = "4dnv1yjdmYYdBKLkMokGLVNxCpyxQrD2yi6MRbtPU5DK";
const pricePerToken = 0.000006; // SOL
const minPurchase = 0.03; // SOL
const maxPurchase = 1.5; // SOL

async function connectWallet() {
  if ("solana" in window) {
    provider = window.solana;
    if (provider.isPhantom) {
      try {
        const response = await provider.connect();
        wallet = response.publicKey.toString();
        document.getElementById("connect-wallet").style.display = 'none';
        document.getElementById("buy-token").style.display = 'block';
        document.getElementById("status").innerText = `Wallet conectat: ${wallet}`;
      } catch (err) {
        document.getElementById("status").innerText = 'Conectarea a eșuat';
      }
    } else {
      alert('Instalează Phantom Wallet pentru a participa la pre-sale!');
    }
  } else {
    alert('Solana Wallet nu este instalat. Te rugăm să instalezi Phantom Wallet.');
  }
}

async function buyTokens() {
  const amountInSOL = prompt("Introdu suma în SOL pentru a cumpăra tokenuri ONPI (minim 0.03 SOL): ");
  const amount = parseFloat(amountInSOL);

  if (amount < minPurchase || amount > maxPurchase) {
    alert(`Suma trebuie să fie între ${minPurchase} SOL și ${maxPurchase} SOL.`);
    return;
  }

  try {
    const transaction = new solanaWeb3.Transaction();
    const transferInstruction = new solanaWeb3.SystemProgram.transfer({
      fromPubkey: wallet,
      toPubkey: new solanaWeb3.PublicKey(preSaleContractAddress),
      lamports: amount * solanaWeb3.LAMPORTS_PER_SOL, // Convertește SOL în lamports
    });

    transaction.add(transferInstruction);

    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
    const signedTransaction = await provider.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signedTransaction.serialize());

    document.getElementById("status").innerText = `Tranzacție trimisă: ${txid}`;
  } catch (err) {
    document.getElementById("status").innerText = 'Eroare la procesarea tranzacției!';
  }
}

document.getElementById("connect-wallet").addEventListener("click", connectWallet);
document.getElementById("buy-token").addEventListener("click", buyTokens);

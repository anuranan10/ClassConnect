let interval;
let timeLeft = 30;

const FIREBASE_API = "https://us-central1-classconnect-5b10f.cloudfunctions.net";

async function generateQRCode() {
  const res = await fetch(`${FIREBASE_API}/generateToken`);
  const { qrImage } = await res.json();
  document.getElementById("qr").innerHTML = `<img src="${qrImage}" width="250"/>`;
}


function startQRCodeCycle() {
  clearInterval(interval);
  timeLeft = 30;
  generateQRCode();

  interval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Expires in ${timeLeft}s`;

    if (timeLeft % 7 === 0) generateQRCode();
    if (timeLeft <= 0) clearInterval(interval);
  }, 1000);
}
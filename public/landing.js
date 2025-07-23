let interval;
let timeLeft = 30;
const FIREBASE_API = "https://us-central1-classconnect-5b10f.cloudfunctions.net";

async function generateQRCode() {
  const res = await fetch(`${FIREBASE_API}/generateToken`);
  const { qrImage, token } = await res.json();
  document.getElementById("qr").innerHTML = `<img src="${qrImage}" width="250"/>`;
  sessionStorage.setItem("sessionToken", token);
}

function startQRCodeCycle() { //qr timer starts
  clearInterval(interval);
  timeLeft = 30;
  generateQRCode();

  interval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Expires in ${timeLeft}s`;

    if (timeLeft % 7 === 0 && timeLeft > 0) generateQRCode();

    if (timeLeft <= 0) {
      clearInterval(interval);
      document.getElementById("qr").innerHTML = `<p style="color:red; font-weight:bold;">QR Code expired</p>`;
      document.getElementById("timer").textContent = "";
    }
  }, 1000);
}

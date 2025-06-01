let interval;
let timeLeft = 30;

async function generateQRCode() {
  const res = await fetch("https://3a254ac9-4201-41e3-838d-f156d6044a28-00-xtkv165zfgnh.worf.replit.dev/generate-token");
  const { qrImage } = await res.json();
  document.getElementById("qr").innerHTML = `<img src="data:image/png;base64,${qrImage}" width="250"/>`;
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

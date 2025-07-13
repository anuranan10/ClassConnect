function moveToNext(event, nextInputId) {
  if (event.key === 'Enter') {
    event.preventDefault(); // prevent default Enter submit
    if (nextInputId) {
      document.getElementById(nextInputId).focus();
    } else {
      document.getElementById('studentform').submit();// submitting the form
    }
  }
}

// real time validation
document.getElementById("firstname").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s\-]/g, "");
});

document.getElementById("lastname").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s\-]/g, "");
});

document.getElementById("studentID").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, ""); // Remove non-numeric characters
});


// connecting frontend to backend

// read sessionId from query param
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get("sessionId");

// Validate session on load
async function checkSession() {
  try {
    const res = await fetch(`https://us-central1-classconnect-5b10f.cloudfunctions.net/validateSession?sessionId=${sessionId}`);
    if (!res.ok) {
      alert("❌ QR Code expired. Please scan a new one.");
      document.querySelectorAll("input, button").forEach(el => el.disabled = true);
    }
  } catch (err) {
    console.error("❌ Error checking session:", err);
    alert("⚠️ Unable to validate session.");
    document.querySelectorAll("input, button").forEach(el => el.disabled = true);
  }
}
checkSession();

document.getElementById("studentform").addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const studentID = document.getElementById("studentID").value;

  try {
    const res = await fetch("https://us-central1-classconnect-5b10f.cloudfunctions.net/submitAttendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, studentID, sessionId }),
    });

    const message = await res.text();
    alert(message);
    if (res.ok) document.getElementById("studentform").reset();
  } catch (error) {
    alert("❌ Something went wrong!");
    console.error(error);
  }
});



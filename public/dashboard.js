const FIREBASE_API = "https://us-central1-classconnect-5b10f.cloudfunctions.net";

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector("main");

  try {
    const res = await fetch(`${FIREBASE_API}/getAttendance`);
    const data = await res.json();

    data.forEach(student => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.padding = "10px 20px";
      row.style.borderBottom = "1px solid #ccc";

      const name = document.createElement("span");
      name.textContent = `${student.firstName} ${student.lastName}`;

      const statusIcon = document.createElement("span");
      statusIcon.style.height = "15px";
      statusIcon.style.width = "15px";
      statusIcon.style.borderRadius = "50%";
      statusIcon.style.display = "inline-block";
      statusIcon.style.backgroundColor = "green";

      row.appendChild(name);
      row.appendChild(statusIcon);
      main.appendChild(row);
    });
  } catch (error) {
    console.error("❌ Error fetching attendance:", error);
  }
});
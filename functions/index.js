const functions = require("firebase-functions");
const admin = require("firebase-admin");
const QRCode = require("qrcode");
const crypto = require("crypto");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const corsHandler = cors({ origin: true });

//Attendance submission
exports.submitAttendance = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    console.log("🔵 submitAttendance CALLED");

    const { firstName, lastName, studentID } = req.body;
    console.log("📋 Data received:", firstName, lastName, studentID);

    try {
      await db.collection("attendance").add({
        firstName,
        lastName,
        studentID,
        timestamp: new Date(),
      });
      console.log("✅ Attendance saved to Firestore.");
      res.status(200).send("Attendance recorded");
    } catch (err) {
      console.error("❌ Failed to save attendance:", err);
      res.status(500).send("Failed to record attendance");
    }
  });
});


//Generate dynamic QR code
exports.generateToken = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const studentUrl = "https://classconnect-5b10f.web.app/student.html";
      const qrImage = await QRCode.toDataURL(studentUrl);
      res.json({ qrImage });
    } catch (err) {
      console.error("QR generation failed:", err);
      res.status(500).json({ message: "QR generation failed" });
    }
  });
});

//Fetch attendance records
exports.getAttendance = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const snapshot = await db
        .collection("attendance")
        .orderBy("timestamp", "desc")
        .get();
      const records = snapshot.docs.map((doc) => doc.data());
      res.status(200).json(records);
    } catch (err) {
      res.status(500).json({ message: "Error fetching attendance" });
    }
  });
});
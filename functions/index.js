const functions = require("firebase-functions");
const admin = require("firebase-admin");
const QRCode = require("qrcode");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const corsHandler = cors({ origin: true });

// Attendance submission
exports.submitAttendance = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { firstName, lastName, studentID } = req.body;
    console.log("📋 Data received:", firstName, lastName, studentID);

    try {
      const rosterDoc = await db.collection("roster").doc(studentID).get();

      if (!rosterDoc.exists) {
        console.log("❌ Student not found in roster.");
        return res.status(404).send("Student not found.");
      }

      await db.collection("attendance").doc(studentID).set({
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

// Generate dynamic QR code
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

// Fetch attendance records (with present/absent)
exports.getAttendance = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const rosterSnapshot = await db.collection("roster").get();
      const attendanceSnapshot = await db.collection("attendance").get();

      const presentIDs = new Set(
        attendanceSnapshot.docs.map(doc => doc.id)
      );

      const records = rosterSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          present: presentIDs.has(doc.id)
        };
      });

      res.status(200).json(records);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching attendance" });
    }
  });
});
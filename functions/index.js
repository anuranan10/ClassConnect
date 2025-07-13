const crypto = require("crypto");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const QRCode = require("qrcode");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const corsHandler = cors({ origin: true });

// 📌 Generate dynamic QR code with session
exports.generateToken = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const token = crypto.randomBytes(8).toString("hex");
      const expiresAt = Date.now() + 30 * 1000; // expires in 30s
      const studentUrl = `https://classconnect-5b10f.web.app/student.html?sessionId=${token}`;
      const qrImage = await QRCode.toDataURL(studentUrl);

      // save session to DB
      await db.collection("sessions").doc(token).set({ expiresAt });

      res.json({ qrImage, token });
    } catch (err) {
      console.error("QR generation failed:", err);
      res.status(500).json({ message: "QR generation failed" });
    }
  });
});


// 📌 Attendance submission, check session validity
exports.submitAttendance = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { firstName, lastName, studentID, sessionId } = req.body;
    console.log("📋 Data received:", firstName, lastName, studentID, sessionId);

    try {
      const sessionDoc = await db.collection("sessions").doc(sessionId).get();
      if (!sessionDoc.exists || sessionDoc.data().expiresAt < Date.now()) {
        return res.status(400).send("❌ QR Code expired. Please try again.");
      }

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

// 📌 Fetch attendance records (with present/absent)
exports.getAttendance = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const studentsSnapshot = await db.collection("roster").get();
      const attendanceSnapshot = await db.collection("attendance").get();

      const attendedIDs = new Set(
        attendanceSnapshot.docs.map(doc => doc.data().studentID)
      );

      const result = studentsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          firstName: data.firstName,
          lastName: data.lastName,
          studentID: data.studentID,
          present: attendedIDs.has(data.studentID),
        };
      });

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching attendance" });
    }
  });
});

// 📌 Validate session
exports.validateSession = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).send("❌ Missing sessionId");
    }

    try {
      const sessionDoc = await db.collection("sessions").doc(sessionId).get();

      if (!sessionDoc.exists || sessionDoc.data().expiresAt < Date.now()) {
        return res.status(400).send("❌ QR Code expired");
      }

      res.status(200).send("✅ Session valid");
    } catch (err) {
      console.error("❌ Error validating session:", err);
      res.status(500).send("Error validating session");
    }
  });
});

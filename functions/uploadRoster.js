const admin = require("firebase-admin");
const xlsx = require("xlsx");

const serviceAccount = require("./classconnect-5b10f-firebase-adminsdk-fbsvc-43f6035b91.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadRoster() {
  const workbook = xlsx.readFile("../studentData.xlsx"); // adjust path if needed
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const students = xlsx.utils.sheet_to_json(sheet);

  const batch = db.batch();

  students.forEach(student => {
    const ref = db.collection("roster").doc(student.studentID.toString());
    batch.set(ref, {
      firstName: student.firstName,
      lastName: student.lastName,
      studentID: student.studentID.toString()
    });
  });

  await batch.commit();
  console.log("✅ Roster uploaded to Firestore.");
}

uploadRoster().catch(console.error);

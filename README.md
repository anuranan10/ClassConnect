# ClassConnect – Smart Attendance System

**ClassConnect** is a startup-focused web application designed to streamline student attendance tracking using dynamic QR codes and real-time validation. Professors can generate secure, expiring QR codes, while students check in by scanning and submitting their credentials. All data is stored and managed through Firebase.

## Features

- **Secure Attendance**: Time-bound QR codes prevent proxy check-ins.
- **Student Interface**: Clean input form with validation and real-time error handling.
- **Professor Dashboard**: View attendance records with present/absent status.
- **Firebase Backend**: Real-time Firestore DB, Cloud Functions, and hosting.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase Cloud Functions, Firestore Database
- **QR Code Generation**: `qrcode` Node.js library
- **Deployment**: Firebase Hosting

## How It Works

1. **Professor clicks "Start QR Session"** – A unique session token is generated and encoded in a QR code.
2. **Student scans the QR code** – It redirects to a submission form with a hidden session ID.
3. **Student submits credentials** – Cloud Function verifies the session, validates the student ID, and logs the timestamp.
4. **Professor checks dashboard** – View who’s present and absent instantly.

## Outcomes

- Reduced attendance marking time by **90%**
- Processed submissions in **under 30 seconds**
- Achieved **100% accuracy** in attendance verification during prototype testing

## Future Enhancements

- Add session-based analytics (attendance rate per class)
- Integrate with Learning Management Systems (LMS)
- Add support for multiple courses and professors

## Inspiration

ClassConnect was built with the intent to help professors managing large classes eliminate manual attendance and enable smarter classroom tools.

## Contact

**Developer**: Anuranan Bharadwaj  
**Email**: [bharada3@my.erau.edu]  
**LinkedIn**: [linkedin.com/in/anuranan-bharadwaj](https://www.linkedin.com/in/anuranan-bharadwaj/)

---

> This is a prototype. The MVP is ready for trail. Further development is in progress.
# ClassConnect *(Work in Progress)*

ClassConnect is a real-time attendance tracking web application designed for classrooms and lecture halls. It allows professors to generate dynamic QR codes that students scan to mark their attendance. These QR codes refresh periodically, preventing spoofing via screenshots or repeat submissions. The backend verifies and stores each student's data securely in a cloud-based database, while professors can monitor attendance records through a dashboard.

> **Note:** This project is currently under development. Features are being actively built and improved.

---

## Features

- Form-based attendance submission by students
- MongoDB-powered backend for storing records
- Professor dashboard displaying attendance logs
- Dynamic, time-sensitive QR codes to prevent cheating
- In progress: Student-side QR scanner & validation logic

---

## Technologies Used

**Frontend:**
- HTML5 / CSS3
- JavaScript (vanilla)
- Google Fonts (Poppins)

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas (cloud database)
- Mongoose
- QRCode (Node package for QR image generation)
- UUID / Crypto (for token generation)
- CORS & JSON middleware

**Hosting/Dev Tools:**
- Replit (Backend API Hosting)
- VSCode (Frontend Development)
- Live Server (Preview frontend)

import admin from 'firebase-admin';
// import { initializeApp } from 'firebase/app';
// import { getAuth } from "fireabse/auth";
import { FIREBASE_CONFIG } from "./secrets.js";

const serviceAccount = JSON.parse(Buffer.from(FIREBASE_CONFIG, 'base64').toString('utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// const firebaseConfig = {
//     apiKey: "AIzaSyDWWH7f5vdhHmdmat3qrPCQGnDPrcYexnY",
//     authDomain: "societymanagement-9ccff.firebaseapp.com",
//     projectId: "societymanagement-9ccff",
//     storageBucket: "societymanagement-9ccff.appspot.com",
//     messagingSenderId: "379429786461",
//     appId: "1:379429786461:web:948f4ad17c283edb300eb4",
//     measurementId: "G-HTB5CHF9EL"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth(firebaseApp);

export default admin;

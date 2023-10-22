import admin from 'firebase-admin';
import { FIREBASE_CONFIG } from "./secrets.js";

const serviceAccount = JSON.parse(Buffer.from(FIREBASE_CONFIG, 'base64').toString('utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;

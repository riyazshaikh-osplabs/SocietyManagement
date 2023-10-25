import admin from "../setup/firebase.js";
import logger from "../setup/logger.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../setup/firebaseSignin.js";

const signUpFirebase = async (userId, email, password, isAdmin = false) => {
    try {
        const user = await admin.auth().createUser({
            uid: userId.toString(),
            email,
            password
        });

        await admin.auth().setCustomUserClaims(user.uid, {
            admin: isAdmin
        })
    } catch (error) {
        logger.error(error);
        logger.debug(`Failed to signup in firebase`);
    }
}

const signInFirebase = async (email, password) => {
    try {
        const auth = getAuth(app);
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        logger.debug(`Error in signinFirebase`);
        logger.error(error);
    }
}

export {
    signUpFirebase,
    signInFirebase
}
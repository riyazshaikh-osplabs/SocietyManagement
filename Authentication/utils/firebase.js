import admin from "../setup/firebase.js"
import logger from "../setup/logger.js";

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
    const user = await admin.auth().signInWithEmailAndPassword(email, password);
    logger.log('user signin', user);
    return user;
}

export {
    signUpFirebase,
    signInFirebase
}
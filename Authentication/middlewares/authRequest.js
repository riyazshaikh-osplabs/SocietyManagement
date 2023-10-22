import bcrypt from "bcrypt";

const ValidateClaims = (isAdmin) => {
    try {

    } catch (error) {
        logger.error(error);
        logger.debug(`Error in validating claims`);
    }
}

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export { ValidateClaims, encryptPassword }
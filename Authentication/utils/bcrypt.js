import bcrypt from "bcrypt";

const encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export {
    encryptPassword,
    validatePassword
}
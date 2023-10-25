import moment from "moment"
import { User } from "../../models/index.js";

const signUp = async (firstName, lastName, password, email, mobile, roomNumber, role, address, isAdmin = false, isDeleted = false, activationStatus = true, transaction) => {
    const userFields = {
        firstName: firstName == null ? '' : firstName,
        lastName: lastName == null ? '' : lastName,
        password: password == null ? '' : password,
        email: email == null ? '' : email,
        mobile: mobile == null ? '' : mobile,
        roomNumber: roomNumber == null ? '' : roomNumber,
        role: role == null ? '' : role,
        address: address == null ? '' : address,
        createdOn: moment().format('YYYY-MM-DD'),
        isAdmin: isAdmin == null ? '' : isAdmin,
        isDeleted: isDeleted == null ? '' : isDeleted,
        activationStatus: activationStatus == null ? '' : activationStatus
    };

    const user = await User.create(userFields, { transaction });
    return user;
}

/** getUserFromEmail takes email, isAdmin, isDeleted, activationStatus */
const getUserFromEmail = async (email, isAdmin = false, isDeleted = false, activationStatus = true) => {
    const adminCondition = isAdmin == null ? '' : isAdmin;
    const deleteCondition = isDeleted == null ? '' : isDeleted;
    const activationStatusCondition = activationStatus == null ? '' : activationStatus;

    const user = User.findOne({
        attributes: ['userId', "activationStatus", 'password', 'isDeleted', 'isAdmin', 'email', 'mobile', 'lastName', 'firstName', 'address', 'role', 'lastLoggedInOn'],
        where: {
            email: email,
            ...adminCondition,
            ...deleteCondition,
            ...activationStatusCondition
        }
    })
    return user;
}

export { signUp, getUserFromEmail }
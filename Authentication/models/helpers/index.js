import moment from "moment"
import { Building, Floor, User } from "../../models/index.js";
import logger from "../../setup/logger.js";
import UserForgotPassword from "../UserForgotPassword.js";
import { Op } from "sequelize";

/** signup takes firstName, lastName, password, email, mobile, roomNumber, role, address, isAdmin, isDeleted, activationStatus, transaction */
const signUp = async (firstName, lastName, password, email, mobile, buildingWing, roomNumber, role, address, isAdmin = false, isDeleted = false, activationStatus = true, transaction) => {
    const userFields = {
        firstName: firstName == null ? null : firstName,
        lastName: lastName == null ? null : lastName,
        password: password == null ? null : password,
        email: email == null ? null : email,
        mobile: mobile == null ? null : mobile,
        buildingWing: buildingWing == null ? null : buildingWing,
        roomNumber: roomNumber == null ? null : roomNumber,
        role: role == null ? null : role,
        address: address == null ? null : address,
        createdOn: moment().format('YYYY-MM-DD'),
        isAdmin: isAdmin == null ? null : isAdmin,
        isDeleted: isDeleted == null ? null : isDeleted,
        activationStatus: activationStatus == null ? null : activationStatus
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

/** updateLastLoggedIn takes userId, transaction */
const updateLastLoggedIn = async (userId, transaction) => {
    const currentTime = moment();
    await User.update({ lastLoggedInOn: currentTime }, { where: { userId: userId }, transaction });
}

/** getUserById takes userId, isAdmin, isDeleted, activationStatus */
const getUserById = async (userId, isAdmin, isDeleted, activationStatus) => {
    const isAdminCondition = isAdmin == null ? {} : { isAdmin: isAdmin };
    const deleteCondition = isDeleted == null ? {} : { isDeleted: isDeleted };
    const activationStatusCondition = activationStatus == null ? {} : { activationStatus: activationStatus };

    const user = await User.findOne({
        attributes: ['userId', 'isAdmin', 'email', 'firstName'],
        where: {
            userId: userId,
            ...isAdminCondition,
            ...deleteCondition,
            ...activationStatusCondition
        }
    });
    return user;
}

/** getUserByRoomNumber takes roomNumber, buildingWing */
const getUserByRoomNumber = async (roomNumber, buildingWing) => {
    const roomNumberCondition = roomNumber == null ? null : roomNumber;
    const buildingWingCondition = buildingWing == null ? null : buildingWing;

    const room = await User.findOne({
        attributes: ['buildingWing', 'isAdmin', 'userId', 'roomNumber', 'email', 'firstName', 'role'],
        include: [
            {
                model: Building,
            },
            {
                model: Floor,
            }
        ],
        where: {
            roomNumber: roomNumberCondition,
            buildingWing: buildingWingCondition
        }
    });
    return room;
}

/** isValidRoomNumber takes roomNumber, buildingWing */
const isValidRoomNumber = async (roomNumber, buildingWing) => {
    const roomNumberCondition = roomNumber == null ? null : roomNumber;
    const buildingWingCondition = buildingWing == null ? null : buildingWing;

    const floorExists = await Floor.findOne({
        attributes: ['floorId', 'roomNumber', 'floorNumber'],
        include: [{
            model: Building,
            where: {
                buildingWing: buildingWingCondition
            }
        }],
        where: {
            roomNumber: roomNumberCondition
        }
    })
    return !!floorExists;
}

/** resetPasswordInDb takes userId, newPassword */
const resetPasswordInDb = async (userId, newPassword) => {
    const userIdCondition = userId == null ? null : { userId: userId };

    const user = await User.update(
        { password: newPassword },
        {
            where: {
                ...userIdCondition,
            }
        }
    )
    logger.log(`rowsUpdated ${user}`);
    return user;
}

/** updateUpdatedBy takes userId, updatedBy, transaction */
const updateUpdateBy = async (userId, updatedBy, transaction) => {
    const currentTime = moment();

    await User.update(
        {
            updatedOn: currentTime,
            updatedBy: updatedBy
        },
        {
            where: { userId: userId }
        }, transaction
    )
}

/** saveEmailToken takes userId, emaitToken, transaction */
const saveEmailToken = async (userId, emailToken, transaction) => {
    const tokenExpiry = moment().add({
        minutes: 10
    })

    await UserForgotPassword.create({
        userId: userId,
        emailToken: emailToken,
        expiryOn: tokenExpiry,
        isActive: true
    })
}

/** isEmailTokenValid takes emailToken */
const isEmailTokenValid = async (emailToken) => {
    const currentTime = moment();
    const userToken = await UserForgotPassword.findOne({
        where: {
            emailToken: emailToken,
            expiryOn: { [Op.gt]: currentTime },
            isActive: true
        }
    });
    if (!userToken) return false;

    logger.log(`userToken`, userToken);
    return userToken?.userId;
}

/** useEmailToken takes userId, emailToken, transaction */
const useEmailToken = async (userId, emailToken, transaction) => {
    await UserForgotPassword.update(
        { isActive: false },
        { where: { userId: userId, emailToken: emailToken } }, transaction)
}

export {
    signUp,
    getUserFromEmail,
    updateLastLoggedIn,
    getUserById,
    getUserByRoomNumber,
    isValidRoomNumber,
    resetPasswordInDb,
    updateUpdateBy,
    saveEmailToken,
    isEmailTokenValid,
    useEmailToken
}
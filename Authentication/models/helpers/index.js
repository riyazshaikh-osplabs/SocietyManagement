import moment from "moment"
import { Building, Floor, Role, User } from "../../models/index.js";
import logger from "../../setup/logger.js";
import UserForgotPassword from "../UserForgotPassword.js";
import { Op } from "sequelize";
import UserOtp from "../UserOtp.js";

/** signup takes firstName, lastName, password, email, mobile, roomNumber, role, address, isAdmin, isDeleted, activationStatus, transaction */
const signUp = async (firstName, lastName, password, email, mobile, buildingWing, roomNumber, role, isAdmin = false, isDeleted = false, activationStatus = true, transaction) => {
    const userFields = {
        firstName: firstName == null ? null : firstName,
        lastName: lastName == null ? null : lastName,
        password: password == null ? null : password,
        email: email == null ? null : email,
        mobile: mobile == null ? null : mobile,
        buildingWing: buildingWing == null ? null : buildingWing,
        roomNumber: roomNumber == null ? null : roomNumber,
        role: role == null ? null : role,
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
    await User.update({ lastLoggedInOn: currentTime }, { where: { userId: userId } }, { transaction });
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
        }, { transaction }
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
    }, { transaction })
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
        { where: { userId: userId, emailToken: emailToken } }, { transaction })
}

/** saveOtp takes userId, otp, transaction */
const saveOtp = async (userId, otp, transaction) => {
    const expiryTime = moment().add({
        minutes: 2
    });

    await UserOtp.create({
        otp: otp,
        expiryOn: expiryTime,
        userId: userId,
        isActive: true
    }, { transaction })
}

/** verifyUserOtp takes userId, otp */
const verifyUserOtp = async (userId, otp) => {
    const currentTime = moment();
    const userIdCondition = userId == null ? null : { userId: userId };

    const result = await UserOtp.findOne({
        where: {
            otp: otp,
            expiryOn: { [Op.gt]: currentTime },
            isActive: true,
            ...userIdCondition
        }
    })
    return !!result;
}

/** userOtp takes userId, otp, transaction */
const useOtp = async (userId, otp, transaction) => {
    const userIdCondition = userId == null ? null : { userId: userId };

    await UserOtp.destroy({ where: { otp: otp, ...userIdCondition } }, { transaction });
}

/** updateBookingStatus takes userId, roomNumber, transaction*/
const updateBookingStatus = async (userId, roomNumber, transaction) => {
    const userIdCondition = userId == null ? null : { userId: userId };
    const [updatedRowsCount, updatedRows] = await Floor.update(
        { isAlloted: true },
        {
            where: {
                roomNumber: roomNumber,
            },
            include: [
                {
                    model: User,
                    where: userIdCondition,
                },
            ],
            returning: true,
            transaction,
        }
    );
    logger.debug('updatedRowsCount', updatedRowsCount, 'updatedRows', updatedRows);
}

const getUserByBookingStatus = async (buildingId) => {
    const buildingIdCondition = buildingId == null ? null : { buildingId: buildingId }
    const allottedUsers = await Floor.findAll({
        attributes: ['floorId', 'isAlloted', 'roomNumber'],
        where: buildingIdCondition
    });
    logger.log(`alloteduser ${JSON.stringify(allottedUsers)}`)
    return allottedUsers;
    // return allottedUsers.map(user => ({
    //     isAlloted: user?.isAlloted,
    //     roomNumber: user?.roomNumber
    // }));
}

const getBuildingWings = async () => {
    const wings = await Building.findAll({
        attributes: ['buildingId', 'buildingWing', 'buildingFloor']
    });

    return wings.map(wing => ({
        buildingId: wing?.buildingId,
        buildingWing: wing?.buildingWing,
        buildingFloor: wing?.buildingFloor
    }))
}

const getRoles = async () => {
    const roles = await Role.findAll({
        attributes: ['roleId', 'role']
    })
    logger.debug(`roles: ${JSON.stringify(roles, null, 2)}`);
    const allRoles = roles.filter(role => role.role !== 'Admin');
    return allRoles;
    // return {
    //     Chairman: allRoles[1],
    //     Treasurer: allRoles[2],
    //     Resident: allRoles[3],
    //     Staff: allRoles[4],
    //     Guest: allRoles[5]
    // }
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
    useEmailToken,
    saveOtp,
    verifyUserOtp,
    useOtp,
    updateBookingStatus,
    getUserByBookingStatus,
    getBuildingWings,
    getRoles
}
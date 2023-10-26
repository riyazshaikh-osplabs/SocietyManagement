import Role from "./Role.js";
import User from "./User.js";

User.belongsTo(Role, { foreignKey: 'role' });
Role.hasMany(User, { foreignKey: 'role' });

export {
    Role,
    User
}
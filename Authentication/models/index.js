import Role from "./Role.js";
import User from "./User.js";
import Building from "./Building.js";
import Floor from "./Floor.js";

User.belongsTo(Role, { foreignKey: 'role' });
User.hasOne(Building, { foreignKey: 'buildingWing', sourceKey: 'buildingWing' });
User.hasMany(Floor, { foreignKey: 'roomNumber', sourceKey: 'roomNumber' });

Role.hasMany(User, { foreignKey: 'role' });

Floor.belongsTo(User, { foreignKey: 'roomNumber', targetKey: 'roomNumber' });
Floor.belongsTo(Building, { foreignKey: 'buildingId', targetKey: 'buildingId' });

Building.belongsTo(User, { foreignKey: 'buildingWing', targetKey: 'buildingWing' });
Building.hasMany(Floor, { foreignKey: 'buildingId', sourceKey: 'buildingId' });

export {
    Role,
    User,
    Building,
    Floor
}
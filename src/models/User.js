import { Sequelize, DataTypes } from "sequelize";
import database from "../../config/dbConfig.js";

const Users = database.define(
  "users",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false},
    phone: { type: DataTypes.STRING, allowNull: false, unique: true},
    picturePath: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    changePasswordToken: { type: DataTypes.STRING, allowNull: true },
    accountActivationToken: { type: DataTypes.STRING, allowNull: true },
    isValid: { type: DataTypes.ENUM("0","1"), allowNull: false, defaultValue: "0" },
    avatar: { type: DataTypes.TEXT, defaultValue: null },
    role: { type: DataTypes.ENUM("DELEVIRY_AGENT","CUSTOMER","ADMIN"), defaultValue: "USER" },
    deletedAt: { type: DataTypes.DATE, defaultValue: null },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    blockedAt: { type: DataTypes.DATE, defaultValue: null },

  },
  {
    freezeTableName: true,
  }
);

// (async () => {
//   try {
//     await database.sync({ force: true });
//     console.log('The table for the User model was just (re)created!');
//   } catch (error) {
//     console.error('Error creating table:', error);
//   }
// })();

export default Users;
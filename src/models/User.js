import { Sequelize } from "sequelize";
import database from "../../config/dbConfig.js";

const { DataTypes } = Sequelize;
const Users = database.define(
  "users",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    adresse: { type: DataTypes.STRING , allowNull: true},
    city: { type: DataTypes.STRING , allowNull: true},
    country: { type: DataTypes.STRING , allowNull: true},
    changePasswordToken: { type: DataTypes.STRING, allowNull: true },
    accountActivationToken: { type: DataTypes.STRING, allowNull: true },
    isValid: { type: DataTypes.ENUM("0","1"), allowNull: false , defaultValue : "0" },
    avatar: { type: DataTypes.TEXT('long'), defaultValue: DataTypes.NULL },
    role: { type: DataTypes.ENUM("USER", "ADMIN"), defaultValue: "USER" },
    deletedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NULL },
  },
  {
    freezeTableName: true,
  }
);

// (async () => {
//   await database.sync({ force: true });
//   console.log('The table for the User model was just (re)created!');
//   // Code here
// })();


export default Users;

import { Sequelize, DataTypes } from "sequelize";
import database from "../../config/dbConfig.js";
import Users from "./User.js";

const Packages = database.define(
  "packages",
  {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    senderId: { 
      type: DataTypes.INTEGER,
      references: { model: Users, key: 'id' }
    },
    receiverId: { 
      type: DataTypes.INTEGER,
      references: { model: Users, key: 'id' }
    },
    pickupPointId: {
        type: DataTypes.INTEGER,
        references: { model: PickupPoint, key: 'id' },
        allowNull: false
      },
      deliveryPointId: {
        type: DataTypes.INTEGER,
        references: { model: PickupPoint, key: 'id' },
        allowNull: false
      },
    picturePath: { 
      type: DataTypes.STRING 
    },
    quantity: { 
      type: DataTypes.INTEGER 
    },
    object: { 
      type: DataTypes.STRING 
    },
    size: { 
      type: DataTypes.ENUM("s", "m", "l", "xl", "xxl"), 
      defaultValue: "m", 
      allowNull: false 
    },
    weight: { 
      type: DataTypes.FLOAT, 
      allowNull: false 
    },
    state: { 
      type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"), 
      allowNull: false 
    },
  },
  {
    freezeTableName: true,
    timestamps: true, // manages createdAt and updatedAt
    paranoid: true // handle deletedAt 
  }
);

// Associations
Users.hasMany(Packages, { as: 'Sender', foreignKey: 'senderId' });
Users.hasMany(Packages, { as: 'Receiver', foreignKey: 'receiverId' });
Packages.belongsTo(Users, { as: 'Sender', foreignKey: 'senderId' });
Packages.belongsTo(Users, { as: 'Receiver', foreignKey: 'receiverId' });

// Sync the model
(async () => {
  try {
    await database.sync({ alter: true }); 
    console.log('The table for the Package model was just (re)created!');
  } catch (error) {
    console.error('Error creating table:', error);
  }
})();

export default Packages;

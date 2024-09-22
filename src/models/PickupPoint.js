import { DataTypes } from "sequelize";
import database from "../../config/dbConfig.js";
import Packages from "./Package.js";

const PickupPoint = database.define(
  "pickup_points",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false }
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid : true
  }
);

PickupPoint.hasMany(Packages, { as: 'PickupLocation', foreignKey: 'pickupPointId' });
PickupPoint.hasMany(Packages, { as: 'DeliveryLocation', foreignKey: 'deliveryPointId' });

Packages.belongsTo(PickupPoint, { as: 'PickupLocation', foreignKey: 'pickupPointId' });
Packages.belongsTo(PickupPoint, { as: 'DeliveryLocation', foreignKey: 'deliveryPointId' });


// Sync the model
(async () => {
    try {
      await database.sync({ alter: true }); 
      console.log('The table for the Package model was just (re)created!');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  })();

export default PickupPoint;

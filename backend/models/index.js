const { Sequelize, DataTypes } = require('sequelize');
const cfg = {
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'store_ratings',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false
};
const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg);

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING(100), allowNull:false },
  email: { type: DataTypes.STRING(150), allowNull:false, unique:true },
  address: { type: DataTypes.STRING(500) },
  password: { type: DataTypes.STRING(200), allowNull:false },
  role: { type: DataTypes.ENUM('admin','user','owner'), defaultValue: 'user' }
});

const Store = sequelize.define('Store', {
  name: { type: DataTypes.STRING(150), allowNull:false },
  email: { type: DataTypes.STRING(150) },
  address: { type: DataTypes.STRING(500) }
});

const Rating = sequelize.define('Rating', {
  value: { type: DataTypes.INTEGER, allowNull:false, validate:{ min:1, max:5 } }
});

// Associations
User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

User.hasMany(Store, { foreignKey: 'ownerId' });
Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

module.exports = { sequelize, User, Store, Rating };

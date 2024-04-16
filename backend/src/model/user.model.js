const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();
 
const sequelize = new Sequelize(
  process.env.DATABASE_NAME, 
  process.env.DATABASE_USER, 
  process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
  port: process.env.DATABASE_PORT || 3306 // Default to 3306 if DATABASE_PORT is not set
});
 
class User extends Model {}
 
User.init({
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'client'
  }
}, {
  sequelize,
  modelName: 'User'
  // Optionally, you can add the following option to force the table to drop and recreate:
  // , { force: true }
});
 
sequelize.sync().then(() => {
  console.log('Database and tables created!');
});

module.exports = User;

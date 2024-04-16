const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME, 
  process.env.DATABASE_USER, 
  process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
  port: process.env.DATABASE_PORT || 3306
});

class Product extends Model {}

Product.init({
  product_id: {  // This is the new field
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
    
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  oracle_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mana_cost: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmc: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  type_line: {
    type: DataTypes.STRING,
    allowNull: false
  },
  oracle_text: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  colors: {
    type: DataTypes.JSON,
    allowNull: true
  },
  color_identity: {
    type: DataTypes.JSON,
    allowNull: true
  },
  set_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  set: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rarity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_uris: {
    type: DataTypes.JSON,
    allowNull: true
  },
  prices: {
    type: DataTypes.FLOAT,
    defaultValue: () => (Math.random() * (25 - 1.5) + 1.5).toFixed(2),
    allowNull: false
  },
  released_at: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: () => Math.floor(Math.random() * 100) + 1,
    allowNull: false
  },
  is_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: () => Math.random() < 0.5,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Product'
});

sequelize.sync().then(() => {
  console.log('Database and tables created!');
});

module.exports = Product;

const { Sequelize, Model, DataTypes } = require('sequelize');
const User = require('./user.model');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT || 3306
});

class Carrito extends Model {}

// Define a structure for embedded product details including the price
const ProductDetail = {
    name: DataTypes.STRING,
    mana_cost: DataTypes.STRING,
    cmc: DataTypes.FLOAT,
    type_line: DataTypes.STRING,
    oracle_text: DataTypes.TEXT,
    colors: DataTypes.JSON,
    color_identity: DataTypes.JSON,
    set_name: DataTypes.STRING,
    set: DataTypes.STRING,
    rarity: DataTypes.STRING,
    image_uris: DataTypes.JSON,
    price: DataTypes.FLOAT
};

Carrito.init({
    carrito_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    products: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        get() {
            const rawData = this.getDataValue('products');
            return rawData ? JSON.parse(rawData) : [];
        },
        set(value) {
            this.setDataValue('products', JSON.stringify(value));
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'completed'),
        defaultValue: 'active',
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Carrito',
});

sequelize.sync().then(() => {
    console.log('Database and tables created!');
});

module.exports = Carrito;

const { Sequelize, Model, DataTypes } = require('sequelize');
const User = require('./user.model');
const Product = require('./product.model');


require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT || 3306 // Default to 3306 if DATABASE_PORT is not set
  });

  class Order  extends Model {}
  
Order.init({
    order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull:false,
        references:{
            model: User,
            key:'user_id'
        }
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Product,
          key: 'product_id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.FLOAT,
        // Remove allowNull if you're calculating and not storing it
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
}, {
    sequelize,
    modelName: 'Order',
    hooks: {
        beforeCreate: (order, options) => {
            order.total_amount = order.price * order.quantity;
        }
    }
});

sequelize.sync().then(() => {
    console.log('Database and tables created!');
  });

module.exports = Order;
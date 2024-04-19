const express = require('express');
const morgan = require('morgan');
const { initializeCardDatabase } = require('../router/initializeCardDatabase');  // Adjust the path

const app = express();
const cors = require('cors');

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is Express');
});

// Attempt to initialize the card database only if needed
initializeCardDatabase().then(() => {
    console.log('Card database check completed.');
}).catch(err => {
    console.error('Error during card database initialization:', err);
});

// API routes
const routerProduct = require("../router/product.router");
const routerUser = require("../router/user.router");
const routerOrder = require("../router/order.router");
const routerCarrito = require("../router/carrito.router");

app.use("/api/v1", routerProduct);
app.use("/api/v1", routerUser);
app.use("/api/v1", routerOrder);
app.use("/api/v1", routerCarrito);

module.exports = app;

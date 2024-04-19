const router = require('express').Router();
const Order = require("../model/order.model");

// Get all orders
router.get("/orders", async (req, res) => {
   const orders = await Order.findAll();
   res.status(200).json({
    ok:  true,
    status: 200,
    body: orders
   });
});

// Get a single user by user_id
router.get('/orders/:order_id', async  (req,res)=>{
    const id = req.params.order_id;
    const order = await Order.findOne({
        where: {
            order_id: id,
        }
    });

    if (!order) {
        return res.status(404).json({
            ok: false,
            status: 404,
            message: 'Order not found'
        });
    }

    res.status(200).json({
        ok : true,
        status: 200,
        body: order
    });
});

// Create a new order
router.post("/orders", async (req, res) => {
    const { user_id, product_id, quantity, price, status } = req.body;

    try {
        // Create the order
        const newOrder = await Order.create({
            user_id,
            product_id,
            quantity,
            price,
            status
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Order created",
            body: newOrder
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error creating order",
            error: error.message
        });
    }
});

// Update an order by order_id
router.put("/orders/:order_id", async (req, res) => {
    const id = req.params.order_id;
    const { user_id, product_id, quantity, price, status } = req.body;

    try {
        // Find the order to update
        const orderToUpdate = await Order.findOne({ where: { order_id: id } });

        // Si no se encuentra la orden
        if (!orderToUpdate) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Order not found"
            });
        }

        // Actualizar propiedades de la orden si se proporcionan nuevos valores
        orderToUpdate.user_id = user_id || orderToUpdate.user_id;
        orderToUpdate.product_id = product_id || orderToUpdate.product_id;
        orderToUpdate.quantity = quantity || orderToUpdate.quantity;
        orderToUpdate.price = price || orderToUpdate.price;
        orderToUpdate.status = status || orderToUpdate.status;

        // Guardar los cambios en la base de datos
        await orderToUpdate.save();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Order updated",
            body: orderToUpdate
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error updating order",
            error: error.message
        });
    }
});

// Delete an order by order_id
router.delete("/orders/:order_id", async (req, res) => {
    const id = req.params.order_id;

    try {
        const orderToDelete = await Order.findOne({ where: { order_id: id } });

        if (!orderToDelete) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Order not found"
            });
        }

        await orderToDelete.destroy();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Order deleted"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error deleting order",
            error: error.message
        });
    }
});

module.exports = router;
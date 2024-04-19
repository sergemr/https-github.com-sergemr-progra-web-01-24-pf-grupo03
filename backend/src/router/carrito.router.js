const router = require('express').Router();
const Carrito = require("../model/carrito.model");
const { Op } = require('sequelize');

// Obtener todos los carritos
router.get("/carritos", async (req, res) => {
    try {
        const carritos = await Carrito.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: carritos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al recuperar los carritos",
            error: error.message
        });
    }
});

router.get("/carritos/user/:user_id", async (req, res) => {
    const userId = req.params.user_id;
    try {
        const carritos = await Carrito.findAll({
            where: {
                user_id: userId,
                status: {
                    [Op.or]: ['active', 'inactive'] // Fetch carts that are either active or inactive
                }
            },
            order: [['createdAt', 'DESC']] // Orders the carts by creation date descending
        });
        if (carritos.length === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Carritos activos o inactivos no encontrados para el usuario proporcionado"
            });
        }
        res.status(200).json({
            ok: true,
            status: 200,
            body: carritos // Return an array of carritos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al recuperar los carritos",
            error: error.message
        });
    }
});


// Obtener carrito por ID
router.get("/carritos/:carrito_id", async (req, res) => {
    const id = req.params.carrito_id;
    try {
        const carrito = await Carrito.findOne({
            where: { carrito_id: id }
        });
        if (!carrito) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Carrito no encontrado"
            });
        }
        res.status(200).json({
            ok: true,
            status: 200,
            body: carrito
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al recuperar el carrito",
            error: error.message
        });
    }
});

// Eliminar carritos por user_id
router.delete("/carritos/user/:user_id", async (req, res) => {
    const userId = req.params.user_id;
    try {
        const deletedCarritos = await Carrito.destroy({
            where: { user_id: userId }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: `${deletedCarritos} carrito(s) eliminado(s) para el usuario con ID ${userId}`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al eliminar los carritos del usuario",
            error: error.message
        });
    }
});

router.post("/carritos", async (req, res) => {
    const { user_id, products } = req.body;

    try {
        // Check for an existing active cart
        const activeCart = await Carrito.findOne({
            where: {
                user_id: user_id,
                status: 'active'
            }
        });

        if (activeCart) {
            // Handle as needed: return an error or deactivate the existing cart
            // For example, setting the existing cart to inactive:
            await activeCart.update({ status: 'inactive' });
        }

        // Create a new cart
        const newCarrito = await Carrito.create({
            user_id,
            products,
            status: 'active' // Explicitly set the new cart as active
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Carrito creado",
            body: newCarrito
        });
    } catch (error) {
        console.error("Error al crear el carrito: ", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al crear el carrito",
            error: error.message
        });
    }
});


// Actualizar carrito por ID
router.put("/carritos/:carrito_id", async (req, res) => {
    const id = req.params.carrito_id;
    const updateData = req.body;
    try {
        const carritoToUpdate = await Carrito.findOne({
            where: { carrito_id: id }
        });
        if (!carritoToUpdate) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Carrito no encontrado"
            });
        }
        await carritoToUpdate.update(updateData);
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Carrito actualizado",
            body: carritoToUpdate
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al actualizar el carrito",
            error: error.message
        });
    }
});

// Eliminar carrito por ID
router.delete("/carritos/:carrito_id", async (req, res) => {
    const id = req.params.carrito_id;
    try {
        const carritoToDelete = await Carrito.findOne({
            where: { carrito_id: id }
        });
        if (!carritoToDelete) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Carrito no encontrado"
            });
        }
        await carritoToDelete.destroy();
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Carrito eliminado"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al eliminar el carrito",
            error: error.message
        });
    }
});

module.exports = router;

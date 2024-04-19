const router = require('express').Router()

const Products = require("../model/product.model")

router.get("/products", async (req, res) => {
    const products = await Products.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: products
    })
})

// Endpoint to fetch a product by product_id
router.get("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    if (!id) {
        return res.status(400).json({
            ok: false,
            message: 'Product ID is required'
        });
    }
    try {
        const product = await Products.findOne({
            where: {
                product_id: id,
            }
        });
        if (!product) {
            return res.status(404).json({
                ok: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            ok: true,
            body: product
        });
    } catch (error) {
        console.error('Failed to fetch product', error);
        res.status(500).json({
            ok: false,
            message: 'Failed to fetch product due to an internal error'
        });
    }
});

router.post("/products", async (req, res) => {
    const dataProducts = req.body
    await Products.sync()
    const createProduct = await Products.create({
        product_name: dataProducts.product_name,
        price: dataProducts.price,
        quantity: dataProducts.quantity,
        is_stock: dataProducts.is_stock
    })
    res.status(200).json({
        ok:true,
        status: 200,
        message: "Created Product",
    })
})

router.put("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const { product_name, price, quantity, is_stock } = req.body;

    try {
        const productToUpdate = await Products.findOne({ where: { product_id: id } });

        if (!productToUpdate) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Product not found"
            });
        }

        productToUpdate.product_name = product_name || productToUpdate.product_name;
        productToUpdate.price = price || productToUpdate.price;
        productToUpdate.quantity = quantity || productToUpdate.quantity;
        productToUpdate.is_stock = is_stock || productToUpdate.is_stock;

        await productToUpdate.save();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Product updated",
            body: productToUpdate
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error updating product",
            error: error.message
        });
    }
});

// Delete product by id
router.delete("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;

    try {
        const productToDelete = await Products.findOne({ where: { product_id: id } });

        if (!productToDelete) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Product not found"
            });
        }

        await productToDelete.destroy();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Product deleted"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error deleting product",
            error: error.message
        });
    }
});

module.exports = router;
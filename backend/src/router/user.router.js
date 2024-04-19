const router = require('express').Router();
const User = require("../model/user.model"); // Assuming you have a User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = "supersecurekey123QWERTY";

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // More resilient token extraction

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        if (decoded.exp <= Math.floor(Date.now() / 1000)) {
            return res.status(401).json({ error: "Token has expired" });
        }

        req.userId = decoded.userId;
        next();
    });
};

// Public Routes
// Login route (does not require token)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const expirationTime = 600; // Token valid for 10 minutes
            const token = jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: expirationTime });
            res.status(200).json({ message: "Acceso permitido", user, token });
        } else {
            res.status(401).json({ error: "Usuario o contraseña incorrectos." });
        }
    } catch (error) {
        console.error("Error autenticando usuario", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Create a new user
router.post("/users", async (req, res) => {
    const { username, password, email, is_active, role } = req.body;

    try {
        const hassPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hassPassword,
            email,
            is_active,
            role
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "User created",
            body: newUser
        });
    } catch (error) {
        console.error("Error creating user", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error creating user",
            error: error.message
        });
    }
});

// Get a single user by user_id
router.get("/users/:user_id", async (req, res) => {
    const id = req.params.user_id;
    const user = await User.findOne({
        where: {
            user_id: id,
        },
    });

    if (!user) {
        return res.status(404).json({
            ok: false,
            status: 404,
            message: "User not found"
        });
    }

    res.status(200).json({
        ok: true,
        status: 200,
        body: user
    });
});


//router.use(verifyToken)

// Get all users
router.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: users
    });
});


// Update a user by user_id
router.put("/users/:user_id", async (req, res) => {
    const id = req.params.user_id;
    const { username, password, email, is_active, role } = req.body;

    try {
        const userToUpdate = await User.findOne({ where: { user_id: id } });

        if (!userToUpdate) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "User not found"
            });
        }

        userToUpdate.username = username || userToUpdate.username;
        userToUpdate.password = password || userToUpdate.password;
        userToUpdate.email = email || userToUpdate.email;
        userToUpdate.is_active = is_active !== undefined ? is_active : userToUpdate.is_active;
        userToUpdate.role = role || userToUpdate.role;

        await userToUpdate.save();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "User updated",
            body: userToUpdate
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error updating user",
            error: error.message
        });
    }
});

// Delete a user by user_id
router.delete("/users/:user_id", async (req, res) => {
    const id = req.params.user_id;

    try {
        const userToDelete = await User.findOne({ where: { user_id: id } });

        if (!userToDelete) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "User not found"
            });
        }

        await userToDelete.destroy();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "User deleted"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error deleting user",
            error: error.message
        });
    }
});

module.exports = router;

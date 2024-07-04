const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import User model
const Order = require('../models/order'); // Import Order model

// POST /api/createuser
router.post('/createuser', [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('location').not().isEmpty().withMessage('Location is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, location } = req.body;

    try {
        // Check if user with the same username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds

        // Create a new user instance with hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            location
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: savedUser._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with a secret key

        // Respond with the token and user details
        res.status(201).json({ token, user: savedUser });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/loginuser
router.post('/loginuser', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user with the provided email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with a secret key

        // Respond with the token and user details
        res.json({ token, user });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/orderdata
router.post('/orderdata', async (req, res) => {
    const { order_date, order_data, email } = req.body;

    if (!order_date || !order_data || !email) {
        return res.status(400).json({ error: 'Order date, order data, and email are required' });
    }

    try {
        let order = await Order.findOne({ email });

        if (!order) {
            order = new Order({
                email,
                order_data: [{ order_date, order_data }]
            });
        } else {
            order.order_data.push({ order_date, order_data });
        }

        await order.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/orders?email=useremail
router.get('/orders', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email query parameter is required' });
    }

    try {
        const orders = await Order.find({ email });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }

        console.log('Fetched orders:', orders); // Log the orders data

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;

const express = require('express');
const app = express();
const port = 5000;
const { mongoconnect, getFoodItems } = require('./db'); // Assuming these functions are correctly implemented in './db'
const cors = require('cors');
const Order = require('./models/order'); 
// Connect to MongoDB
mongoconnect();

// Middleware to enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from localhost:3000
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type'],
}));

// Middleware to parse JSON bodies
app.use(express.json());


app.get('/api/orders', async (req, res) => {
    const userEmail = req.query.email;

    if (!userEmail) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const orders = await Order.find({ email: userEmail });
        console.log(orders);
        
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Example route to fetch food items
app.get('/api/fooditems', async (req, res) => {
    try {
        const foodItems = await getFoodItems(); // Implement this function to fetch food items from MongoDB
        console.log(foodItems);
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch food items' });
    }
});

// Example usage of user creation route
app.use('/api', require('./routes/createuser'));

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

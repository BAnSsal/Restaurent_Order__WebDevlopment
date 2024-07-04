const mongoose = require('mongoose');

const mongourl = 'mongodb+srv://ishantbansal9876:TEj8B0IdSGTePalE@cluster0.0jpjcn0.mongodb.net/database2?retryWrites=true&w=majority&appName=Cluster0';

const mongoconnect = async () => {
    try {
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Success: Connected to MongoDB');
    } catch (error) {
        console.error('Error: Unable to connect to MongoDB', error);
        process.exit(1); // Exit process with failure
    }
};

const getFoodItems = async () => {
    try {
        const collection = mongoose.connection.db.collection('collection2');
        const foodItems = await collection.find({}).toArray();
        return foodItems;
    } catch (error) {
        console.error('Error: Unable to fetch food items', error);
        throw error;
    }
};

module.exports = { mongoconnect, getFoodItems };

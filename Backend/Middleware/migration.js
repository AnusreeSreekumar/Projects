import mongoose from 'mongoose';
import { Player } from '../Models/playerSet.js'; // Adjust the path according to your project structure

mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        addHistoryFieldToPlayers();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const addHistoryFieldToPlayers = async () => {
    try {
        // Update all players to include dbHistory field as an empty array if it doesn't exist
        await Player.updateMany(
            { dbHistory: { $exists: false } }, // Match players without dbHistory
            { $set: { dbHistory: [] } }       // Add dbHistory field with an empty array
        );

        console.log('dbHistory field added to all existing players');
        mongoose.disconnect(); // Disconnect from database after operation
    } catch (error) {
        console.error('Error adding dbHistory field:', error);
        mongoose.disconnect();
    }
};

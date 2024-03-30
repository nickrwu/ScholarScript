const { ObjectId } = require('mongodb');
const client = require('../database.js');
const DATABASE = "hackprinceton";
const ESSAY = "essays";

exports.uploadEssay = async (essay) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const collection = db.collection(ESSAY);
        
        const result = await collection.insertOne(essay);
        console.log(`An essay was inserted with the _id: ${result.insertedId}`);
        
        return {
            _id: result.insertedId,
            ...essay
        };
    } catch (error) {
        console.error("Error inserting essay into database:", error);
        throw new Error("Failed to insert essay into database");
    } finally {
        await client.close();
    }
};

exports.uploadEssayHandler = async (req, res) => {
    const { text, userId } = req.body;
    if (!text || !userId) {
        return res.status(400).send('Essay text and user ID are required.');
    }

    try {
        const essay = {
            text,
            user: new ObjectId(userId),
            category: [],
        };

        const insertedEssay = await exports.uploadEssay(essay);
        res.status(201).send(insertedEssay);
    } catch (error) {
        console.error('Error uploading essay:', error);
        res.status(500).send('An error occurred while uploading the essay.');
    }
};

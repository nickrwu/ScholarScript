const { ObjectId } = require('mongodb');
const { generateText } = require('./open_ai');
const client = require('./database.js');
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

exports.deleteEssay = async (essayId) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const collection = db.collection(ESSAY);
        
        const result = await collection.deleteOne({ _id: new ObjectId(essayId) });
        
        if (result.deletedCount === 0) {
            console.log(`No essay found with ID: ${essayId}`);
            return false;
        } else {
            console.log(`Deleted essay with ID: ${essayId}`);
            return true;
        }
    } catch (error) {
        console.error(`Error deleting essay with ID ${essayId}:`, error);
        throw error;
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

exports.combineEssays = async (req, res) => {
    const { essayIds, scholarshipId } = req.body;

    if (!essayIds || !scholarshipId) {
        return res.status(400).send('Essay IDs and scholarship ID are required.');
    }

    try {
        await client.connect();
        const db = client.db(DATABASE);

        // Fetch essays
        const essays = await db.collection(ESSAY).find({
            _id: { $in: essayIds.map(id => new ObjectId(id)) }
        }).toArray();

        // Fetch scholarship
        const scholarship = await db.collection(SCHOLARSHIPS).findOne({ _id: new ObjectId(scholarshipId) });

        // Combine essay texts
        const combinedText = essays.map(essay => essay.text).join('\n');

        //OpenAI
        const prompt = `Refine the following text to align with the scholarship's categories. Ensure that the new essay is not over 500 words. Return only the refined text. Categories: ${scholarship.category.join(', ')}\n\n${combinedText}`;
        const refinedText = await generateText(prompt);

        res.status(200).send({ combinedText: refinedText });
    } catch (error) {
        console.error('Error combining essays:', error);
        res.status(500).send('An error occurred while combining the essays.');
    } finally {
        await client.close();
    }
};

exports.deleteEssayHandler = async (req, res) => {
    const { essayId } = req.body;

    if (!essayId) {
        return res.status(400).send('Essay ID is required.');
    }

    try {
        await client.connect();
        const db = client.db(DATABASE);

        
        const success = await this.deleteEssay(essayId)

        if (success) {
            res.status(200).send({ message: `Deleted essay with ID: ${essayId}` });
        } else {
            res.status(404).send({ message: `Essay not found with ID: ${essayId}` });
        }
    } catch (error) {
        console.error('Error deleting essay:', error);
        res.status(500).send({ message: 'An error occurred while deleting the essay.' });
    }
};

//mark scholarship as applied, 
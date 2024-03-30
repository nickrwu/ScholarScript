const { ObjectId } = require('mongodb');
const { generateText } = require('./open_ai');
const client = require('./database.js');
const DATABASE = "hackprinceton";
const APPLIED = "applied";

exports.startApplication = async (application) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const collection = db.collection(APPLIED);
        
        const result = await collection.insertOne(application);
        console.log(`An application was inserted with the _id: ${result.insertedId}`);
        
        return {
            _id: result.insertedId,
            ...essay
        };
    } catch (error) {
        console.error("Error inserting app into database:", error);
        throw new Error("Failed to insert app into database");
    } finally {
        await client.close();
    }
};

exports.startApplicationHandler = async (req, res) => {
    const { scholarshipId, userId } = req.body;
    if (!scholarshipId || !userId) {
        return res.status(400).send('Scholarship ID and user ID are required.');
    }

    try {
        const application = {
            scholarship: new ObjectId(scholarshipId),
            user: new ObjectId(userId),
            status: 0,
        };

        const startedApplication = await exports.startApplication(application);
        res.status(201).send(startedApplication);
    } catch (error) {
        console.error('Error starting application:', error);
        res.status(500).send('An error occurred while starting the application.');
    }
};

exports.deleteApplication = async (applicationId) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const collection = db.collection(APPLIED);
        
        const result = await collection.deleteOne({ _id: new ObjectId(applicationId) });
        
        if (result.deletedCount === 0) {
            console.log(`No application found with ID: ${applicationId}`);
            return false;
        } else {
            console.log(`Deleted application with ID: ${applicationId}`);
            return true;
        }
    } catch (error) {
        console.error(`Error deleting application with ID ${applicationId}:`, error);
        throw error;
    } finally {
        await client.close();
    }
};

exports.deleteApplicationHandler = async (req, res) => {
    const { applicationId } = req.body;

    if (!applicationId) {
        return res.status(400).send('Application ID is required.');
    }

    try {
        const success = await exports.deleteApplication(applicationId);

        if (success) {
            res.status(200).send({ message: `Deleted application with ID: ${applicationId}` });
        } else {
            res.status(404).send({ message: `Application not found with ID: ${applicationId}` });
        }
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).send({ message: 'An error occurred while deleting the application.' });
    }
};


exports.finishApplication = async (applicationId) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const collection = db.collection(APPLIED);
        
        const result = await collection.updateOne(
            { _id: new ObjectId(applicationId) },
            { $set: { status: 1 } }
        );
        
        if (result.modifiedCount === 0) {
            console.log(`No application found or updated for ID: ${applicationId}`);
            return false;
        } else {
            console.log(`Finished application with ID: ${applicationId}`);
            return true;
        }
    } catch (error) {
        console.error(`Error finishing application with ID ${applicationId}:`, error);
        throw error;
    } finally {
        await client.close();
    }
};

exports.finishApplicationHandler = async (req, res) => {
    const { applicationId } = req.body;

    if (!applicationId) {
        return res.status(400).send('Application ID is required.');
    }

    try {
        const success = await exports.finishApplication(applicationId);

        if (success) {
            res.status(200).send({ message: `Finished application with ID: ${applicationId}` });
        } else {
            res.status(404).send({ message: `Application not found or already completed for ID: ${applicationId}` });
        }
    } catch (error) {
        console.error('Error finishing application:', error);
        res.status(500).send({ message: 'An error occurred while finishing the application.' });
    }
};


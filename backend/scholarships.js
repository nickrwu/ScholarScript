const { ObjectId } = require('mongodb');
const client = require('./database.js');
const DATABASE = "hackprinceton";
const SCHOLARSHIPS = "scholarships";
const { getApplicantStatus } = require('./applications');

exports.getAllScholarships = async (userId) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const scholarshipsCollection = db.collection(SCHOLARSHIPS);

        const scholarships = await scholarshipsCollection.find({}).toArray();
        
        for (let scholarship of scholarships) {
            scholarship.applicationStatus = await getApplicantStatus(userId, scholarship._id.toString());
        }

        await client.close();

        return scholarships;
    } catch (error) {
        console.error("Error fetching all scholarships:", error);
        throw error;
    } finally {
        await client.close();
    }
};

exports.getAllScholarshipsHandler = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).send('User ID is required.');
    }

    try {
        const scholarships = await exports.getAllScholarships(userId);
        res.status(200).json(scholarships);
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        res.status(500).send('An error occurred while fetching scholarships.');
    }
};

exports.getScholarshipDetails = async (userId, scholarshipId) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const scholarshipsCollection = db.collection(SCHOLARSHIPS);

        const scholarship = await scholarshipsCollection.findOne({ _id: new ObjectId(scholarshipId) });
        
        if (scholarship) {
            scholarship.applicationStatus = await getApplicantStatus(userId, scholarshipId);
        }

        await client.close();

        return scholarship;
    } catch (error) {
        console.error("Error fetching scholarship details:", error);
        throw error;
    } finally {
        await client.close();
    }
};

exports.getScholarshipDetailsHandler = async (req, res) => {
    const { userId, scholarshipId } = req.body;
    if (!userId || !scholarshipId) {
        return res.status(400).send('User ID and scholarship ID are required.');
    }

    try {
        const scholarshipDetails = await exports.getScholarshipDetails(userId, scholarshipId);
        if (scholarshipDetails) {
            res.status(200).json(scholarshipDetails);
        } else {
            res.status(404).send('Scholarship not found.');
        }
    } catch (error) {
        console.error('Error fetching scholarship details:', error);
        res.status(500).send('An error occurred while fetching scholarship details.');
    }
};
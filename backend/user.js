const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { generateText } = require('./open_ai');
const client = require('./database.js');

const DATABASE = "hackprinceton";

exports.getUser = async (userId) => {
    console.log(`${userId}`)
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const collection = db.collection('users');

        const user = await collection.findOne({ _id: ObjectId(userId) });
        console.log(`Found user with ID: ${userId}`);

        return user;
    } catch (error) {
        console.error(`Error retrieving user with ID ${userId}:`, error);
        throw new Error("Failed to retrieve user from database");
    } finally {
        await client.close();
    }
};

exports.createUser = async (user) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const collection = db.collection('users');

        const result = await collection.insertOne(user);
        console.log(`A user was inserted with the _id: ${result.insertedId}`);

        return {
            _id: result.insertedId,
            ...user
        };
    } catch (error) {
        console.error("Error inserting user into database:", error);
        throw new Error("Failed to insert user into database");
    } finally {
        await client.close();
    }
};

exports.deleteUser = async (userId) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const collection = db.collection('users');

        const result = await collection.deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
            console.log(`No user found with ID: ${userId}`);
            return false;
        } else {
            console.log(`Deleted user with ID: ${userId}`);
            return true;
        }
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        throw error;
    } finally {
        await client.close();
    }
};

exports.updateUser = async (userId, updatedUser) => {
    try {
        await client.connect();
        const db = client.db(DATABASE);
        const collection = db.collection('users');

        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedUser }
        );

        if (result.matchedCount === 0) {
            console.log(`No user found with ID: ${userId}`);
            return false;
        } else {
            console.log(`Updated user with ID: ${userId}`);
            return true;
        }
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    } finally {
        await client.close();
    }
};

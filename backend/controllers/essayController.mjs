import Essay from '../models/essaySchema.mjs';
import User from '../models/userSchema.mjs';

// Upload Essay
const uploadEssay = async (req, res) => {
    try {
        const { title, text, category, user } = req.body;
        const newEssay = new Essay({ title, text, category, user: user.$oid });

        await newEssay.save();

        // Update the essay array for the user
        const userId = user.$oid;
        const userObj = await User.findById(userId);
        
        userObj.essays.push(newEssay);
        await userObj.save();

        res.status(201).json({ success: true, message: 'Essay uploaded successfully.' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while uploading the essay. Error: ' + err });
    }
};

// Delete Essay
const deleteEssay = async (req, res) => {
    try {
        const { essayId, user } = req.body;
        const essay = await Essay.findById(essayId);
        if (!essay) {
            return res.status(404).json({ success: false, error: 'Essay not found.' });
        }
        if (essay.user.toString() !== user._id.toString()) {
            return res.status(403).json({ success: false, error: 'Unauthorized access to essay.' });
        }
        await Essay.findByIdAndDelete(essayId);
        res.status(200).json({ success: true, message: 'Essay deleted successfully.' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while deleting the essay. Error: ' + err });
    }
};

// Combine Essays
const combineEssays = async (req, res) => {
    try {
        const { user, essays } = req.body;
        const combinedEssay = essays.reduce((acc, essay) => {
            return acc + essay.text;
        }, '');

        const newEssay = new Essay({ title: 'Combined Essay', text: combinedEssay, user });

        await newEssay.save();

        res.status(201).json({ success: true, message: 'Essays combined successfully.' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while combining the essays. Error: ' + err });
    }
};

// Get All Essays
const getAllEssays = async (req, res) => {
    try {
        const { user } = req.body;
        const userId = user.$oid;
        const essays = await Essay.find({ user: userId });
        res.status(200).json({ success: true, essays });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while fetching the essays. Error: ' + err });
    }
};

// Get Essay Detail
const getEssayDetail = async (req, res) => {
    try {
        const { essayId } = req.params;
        const { user } = req.body;

        const essay = await Essay.findById(essayId);

        if (!essay) {
            return res.status(404).json({ success: false, error: 'Essay not found.' });
        }

        if (essay.user.toString() !== user._id.toString()) {
            return res.status(403).json({ success: false, error: 'Unauthorized access to essay.' });
        }

        res.status(200).json({ success: true, essay });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while fetching the essay detail. Error: ' + err });
    }
};

// Export the controller functions
export default {
    uploadEssay,
    deleteEssay,
    combineEssays,
    getAllEssays,
    getEssayDetail
};
import Scholarship from '../models/scholarshipSchema.mjs';

// Get All Scholarships
const getAll = async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        res.status(200).json({ success: true, scholarships });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while fetching the scholarships. Error: ' + err });
    }
};

// Get Scholarship Details
const getScholarshipDetails = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        res.status(200).json({ success: true, scholarship });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while fetching the scholarship details. Error: ' + err });
    }
};

// Create Scholarship Details
const createScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.create(req.body)
        res.status(201).json({ success: true, scholarship });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while creating the scholarship. Error: ' + err });
    }
};

// Export the controller functions
export default {
    getAll,
    getScholarshipDetails,
    createScholarship
};
import User from '../models/userSchema.mjs';
// Get User by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while fetching the user. Error: ' + err });
    }
};

// Register User
const registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ success: true, user: newUser });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while registering the user. Error: ' + err });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while deleting the user. Error: ' + err });
    }
};

// Export the controller functions
export default {
    getUserById,
    registerUser,
    deleteUser
};
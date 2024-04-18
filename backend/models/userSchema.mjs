import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    essays: [mongoose.Schema.Types.ObjectId],
});

const User = mongoose.model('User', userSchema);

export default User;

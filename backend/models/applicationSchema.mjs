import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    scholarship: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId,
    status: Number,
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;

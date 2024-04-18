import mongoose from 'mongoose';

const essaySchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    category: [String],
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { collection: 'essays' });

const Essay = mongoose.model('Essay', essaySchema);

export default Essay;

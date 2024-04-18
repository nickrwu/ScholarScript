import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    deadline: String,
    category: [String],
    amount: String,
    winners: Number
}, { collection: 'scholarships' });

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

export default Scholarship;

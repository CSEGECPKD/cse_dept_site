import mongoose from 'mongoose';

const magazineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        index: true,
    },
    date: {
        type: Date,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    pdfUrl: {
        type: String,
        required: true,
    },
    frontPageUrl: {
        type: String,
        required: true,
    },
});

const Magazine =
    mongoose.models.Magazine || mongoose.model('Magazine', magazineSchema);

export default Magazine;

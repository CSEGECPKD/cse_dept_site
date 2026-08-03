import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

const Certificate =
    mongoose.models.Certificate ||
    mongoose.model('Certificate', certificateSchema);

export default Certificate;

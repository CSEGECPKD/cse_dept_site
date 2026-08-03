import mongoose from 'mongoose';

const posterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Poster = mongoose.models.Poster || mongoose.model('Poster', posterSchema);

export default Poster;

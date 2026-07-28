import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        enum: ["Online", "Offline", "Hybrid"],
        default: "Offline"
    },
    posters: [{
        type: String,
        required: true
    }],
    regLinks: [{
        type: String,
        required: true
    }]
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;

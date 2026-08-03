import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    pdfUrl: {
        type: String,
        required: true,
    },
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;

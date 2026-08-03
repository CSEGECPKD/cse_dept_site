import mongoose from 'mongoose';

const syllabusSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    yearOfScheme: {
        type: String,
        required: true,
    },
    sem: {
        type: String,
        required: true,
    },
    syllabus: {
        type: String,
        required: true,
    },
    pdfUrl: {
        type: String,
        required: true,
    },
});

const Syllabus =
    mongoose.models.Syllabus || mongoose.model('Syllabus', syllabusSchema);

export default Syllabus;

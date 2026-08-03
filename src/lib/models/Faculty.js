import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    employeeType: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: '',
    },
});

const Faculty =
    mongoose.models.Faculty || mongoose.model('Faculty', facultySchema);

export default Faculty;

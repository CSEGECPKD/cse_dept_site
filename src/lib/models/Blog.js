import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    authorPosition: {
        type: String,
        required: true
    },
    authorImage: {
        type: String,
        required: true
    },
    authorLinkedin: {
        type: String,
        required: true
    }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;

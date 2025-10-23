import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    heading : {type : String},
    blogText : {type : String},
    },
        {timestamps : true}
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
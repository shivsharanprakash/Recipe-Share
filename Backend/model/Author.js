import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    social: {
        twitter: String,
        linkedin: String,
        website: String
    }
});

const Author = mongoose.model("Author", AuthorSchema);
export default Author;

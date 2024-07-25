import mongoose from "mongoose";

const CusineSchema = mongoose.Schema({
    title: String,
    image: String,
    description: String,
    author: String,
    link: String,
});

const Cusine = mongoose.model("Cusine", CusineSchema);

export default Cusine;

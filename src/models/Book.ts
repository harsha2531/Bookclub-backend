import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    status: { type: String, default: "Available" }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);

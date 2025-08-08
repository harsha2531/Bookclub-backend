import mongoose from "mongoose";

const readerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
}, { timestamps: true });

export default mongoose.model("Reader", readerSchema);

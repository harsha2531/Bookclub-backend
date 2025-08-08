import mongoose from "mongoose";

const lendingSchema = new mongoose.Schema({
    readerId: { type: mongoose.Schema.Types.ObjectId, ref: "Reader" },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    lendDate: Date,
    dueDate: Date,
    returnDate: Date
}, { timestamps: true });

export default mongoose.model("Lending", lendingSchema);

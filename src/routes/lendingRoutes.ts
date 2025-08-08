import { Router } from "express";
import Lending from "../models/Lending";
import Book from "../models/Book";
import auth from "../middleware/auth";

const router = Router();

// Get all lendings
router.get("/", auth, async (_, res) => {
    res.json(await Lending.find());
});

// Lend a book
router.post("/", auth, async (req, res) => {
    const { readerId, bookId } = req.body;
    const lendDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(lendDate.getDate() + 14); // 14 days loan

    const lending = await Lending.create({
        readerId,
        bookId,
        lendDate,
        dueDate,
    });

    await Book.findByIdAndUpdate(bookId, { status: "Lent" });

    res.json(lending);
});

// Return a book
router.put("/:id/return", auth, async (req, res) => {
    const lending = await Lending.findById(req.params.id);
    if (!lending) return res.status(404).json({ message: "Not found" });

    lending.returnDate = new Date();
    await lending.save();

    await Book.findByIdAndUpdate(lending.bookId, { status: "Available" });

    res.json(lending);
});

export default router;

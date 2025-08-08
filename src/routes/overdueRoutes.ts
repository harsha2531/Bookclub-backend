import { Router } from "express";
import Lending from "../models/Lending";
import Reader from "../models/Reader";
import Book from "../models/Book";
import nodemailer from "nodemailer";
import auth from "../middleware/auth";

const router = Router();

// Get overdue readers
router.get("/", auth, async (_, res) => {
    const now = new Date();
    const overdueLendings = await Lending.find({
        dueDate: { $lt: now },
        returnDate: { $exists: false },
    });

    const result = [];
    for (const lend of overdueLendings) {
        const reader = await Reader.findById(lend.readerId);
        const book = await Book.findById(lend.bookId);

        let existing = result.find((r) => r.readerId == lend.readerId);
        if (!existing) {
            existing = {
                readerId: lend.readerId,
                readerName: reader?.name,
                email: reader?.email,
                books: [],
            };
            result.push(existing);
        }
        existing.books.push({ title: book?.title, dueDate: lend.dueDate });
    }

    res.json(result);
});

// Send email notification
router.post("/:readerId/notify", auth, async (req, res) => {
    const reader = await Reader.findById(req.params.readerId);
    if (!reader) return res.status(404).json({ message: "Reader not found" });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: reader.email,
        subject: "Overdue Books Notification",
        text: "You have overdue books. Please return them as soon as possible.",
    });

    res.json({ message: "Email sent" });
});

export default router;

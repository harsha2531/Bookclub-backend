import { Request, Response } from "express";
import Lending from "../models/Lending";
import Reader from "../models/Reader";
import Book from "../models/Book";
import { sendEmail } from "../utils/email";

export const getOverdue = async (_: Request, res: Response) => {
    const now = new Date();
    const overdueLendings = await Lending.find({
        dueDate: { $lt: now },
        returnDate: { $exists: false },
    });

    const result: any[] = [];
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
};

export const notifyOverdue = async (req: Request, res: Response) => {
    const reader = await Reader.findById(req.params.readerId);
    if (!reader) return res.status(404).json({ message: "Reader not found" });

    await sendEmail(
        reader.email,
        "Overdue Books Notification",
        "You have overdue books. Please return them as soon as possible."
    );

    res.json({ message: "Email sent" });
};

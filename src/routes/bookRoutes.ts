import { Router } from "express";
import Book from "../models/Book";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, async (_, res) => {
    res.json(await Book.find());
});

router.post("/", auth, async (req, res) => {
    res.json(await Book.create(req.body));
});

router.put("/:id", auth, async (req, res) => {
    res.json(await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", auth, async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

export default router;

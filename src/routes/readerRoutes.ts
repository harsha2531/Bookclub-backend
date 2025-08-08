import { Router } from "express";
import Reader from "../models/Reader";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, async (_, res) => {
    res.json(await Reader.find());
});

router.post("/", auth, async (req, res) => {
    res.json(await Reader.create(req.body));
});

router.put("/:id", auth, async (req, res) => {
    res.json(await Reader.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", auth, async (req, res) => {
    await Reader.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

export default router;

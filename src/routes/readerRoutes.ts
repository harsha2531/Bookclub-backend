import { Router } from "express";
import {
    getReaders,
    addReader,
    updateReader,
    deleteReader,
} from "../controllers/readerController";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, getReaders);
router.post("/", auth, addReader);
router.put("/:id", auth, updateReader);
router.delete("/:id", auth, deleteReader);

export default router;

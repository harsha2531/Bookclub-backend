import { Router } from "express";
import { getBooks, addBook, updateBook, deleteBook } from "../controllers/bookController";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, getBooks);
router.post("/", auth, addBook);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, deleteBook);

export default router;

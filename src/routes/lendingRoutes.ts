import { Router } from "express";
import {
    getLendings,
    lendBook,
    returnBook,
} from "../controllers/lendingController";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, getLendings);
router.post("/", auth, lendBook);
router.put("/:id/return", auth, returnBook);

export default router;

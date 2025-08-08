import { Router } from "express";
import {
    getOverdue,
    notifyOverdue,
} from "../controllers/overdueController";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, getOverdue);
router.post("/:readerId/notify", auth, notifyOverdue);

export default router;

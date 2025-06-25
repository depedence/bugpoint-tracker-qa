import { Router } from "express";
import { addBug, getBugs } from "../controllers/bugsController";

const router = Router()

router.get('/', getBugs)
router.post('/', addBug)

export default router

import { Router } from "express";
import { addBug, delBug, getBugs } from "../controllers/bugsController";

const router = Router()

router.get('/', getBugs)
router.post('/', addBug)
router.delete('/', delBug)

export default router

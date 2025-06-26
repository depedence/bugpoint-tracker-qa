import { Router } from "express";
import { addBug, delBug, editBug, getBugs } from "../controllers/bugsController";

const router = Router()

router.get('/', getBugs)
router.post('/', addBug)
router.delete('/', delBug)
router.patch('/', editBug)

export default router

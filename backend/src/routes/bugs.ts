import { Router } from "express";
import { getBugs } from "../controllers/bugsController";

const router = Router()

router.get('/', getBugs)

export default router

import { Request, Response } from "express";
import { readBugs } from "../utils/file";

export function getBugs(req: Request, res: Response) {
    const bugs = readBugs()
    res.json(bugs)
}

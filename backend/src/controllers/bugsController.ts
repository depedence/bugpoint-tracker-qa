import { Request, Response } from "express";
import { readBugs, writeBugs } from "../utils/file";
import { Bug } from "../models/bug";
import { v4 as uuidv4 } from "uuid";

export function getBugs(req: Request, res: Response) {
    const bugs = readBugs()
    res.json(bugs)
}

export function addBug(req: Request, res: Response) {
    const { title, description, status, priority } = req.body

    // Проверка: все поля должны быть
    if (!title || !description || !status || !priority) {
        return res.status(400).json({ error: "Invalid request" })
    }

    // Создание бага
    const newBug: Bug = {
        id: uuidv4(),    // Генерирует уникальный id
        title,
        description,
        status,
        priority,
        createdAt: new Date().toISOString() // Текущая дата
    }

    const bugs = readBugs() // Читаем старые
    bugs.push(newBug)   // Добавляем новый
    writeBugs(bugs) // Сохраняем

    return res.status(201).json(newBug) // 201 - создан
}

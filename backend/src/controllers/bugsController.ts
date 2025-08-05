import { Request, Response } from 'express';
import { readBugs, writeBugs } from '../utils/file';
import { Bug } from '../models/bug';
import { v4 as uuidv4 } from 'uuid';

export function getBugs(req: Request, res: Response) {
    const bugs = readBugs();
    res.json(bugs);
}

export function addBug(req: Request, res: Response): void {
    const { title, description, status, priority } = req.body;

    // Проверка: все поля должны быть
    if (!title || !description || !status || !priority) {
        res.status(400).json({ error: 'Invalid request' });
    }

    // Создание бага
    const newBug: Bug = {
        id: uuidv4(), // Генерирует уникальный id
        title,
        description,
        status,
        priority,
        createdAt: new Date().toISOString(), // Текущая дата
    };

    const bugs = readBugs(); // Читаем старые
    bugs.push(newBug); // Добавляем новый
    writeBugs(bugs); // Сохраняем

    res.status(201).json(newBug); // 201 - создан
}

export const delBug = (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ error: 'Invalid request' });
        return;
    }

    const bugs = readBugs();
    const bugIndex = bugs.findIndex((bug) => bug.id === id);

    if (bugIndex === -1) {
        res.status(404).json({ error: 'Bug not found' });
        return;
    }

    bugs.splice(bugIndex, 1);
    writeBugs(bugs);

    res.status(200).json({ message: 'Bug deleted successfully' });
};

export function editBug(req: Request, res: Response): void {
    const { id, ...updates } = req.body;

    if (!id) {
        res.status(400).json({ error: 'id was not found' });
    }

    try {
        const bugs: Bug[] = readBugs();
        const bugIndex = bugs.findIndex((bug) => bug.id === id);

        if (bugIndex === -1) {
            res.status(400).json({ error: 'Bug not found' });
        }

        const updatedBug = {
            ...bugs[bugIndex],
            ...updates,
            id: bugs[bugIndex].id, // Защита от изменения id
            createdAt: bugs[bugIndex].createdAt, // Защита от изменения даты
        };

        bugs[bugIndex] = updatedBug;

        // Проверка записи
        writeBugs(bugs);
        console.log('bug updated!'); // Лог для отладки

        res.status(200).json(updatedBug);
    } catch (error) {
        console.error('error update: ', error);
        res.status(500).json({ error: 'Iternal server error' });
    }
}

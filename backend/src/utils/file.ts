import fs from 'fs';
import path from 'path';
import { Bug } from '../models/bug';

const bugsPath = path.join(__dirname, '../../data/bugs.json');

// Чтение багов
export function readBugs(): Bug[] {
    const fileData = fs.readFileSync(bugsPath, 'utf-8');
    return JSON.parse(fileData);
}

// Запись багов
export function writeBugs(bugs: Bug[]): void {
    fs.writeFileSync(bugsPath, JSON.stringify(bugs, null, 2), 'utf-8');
    console.log('file bugs.json is already updated'); // Временный лог для отладки
}

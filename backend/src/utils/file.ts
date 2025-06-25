import fs from 'fs'
import path from 'path'
import { Bug } from '../models/bug'

const bugsPath = path.join(__dirname, '../../data/bugs.json')

export function readBugs(): Bug[] {
    const fileData = fs.readFileSync(bugsPath, 'utf-8')
    return JSON.parse(fileData)
}

import express from 'express'
import cors from 'cors'
import bugsRouter from './routes/bugs'

const app = express()
const PORT = 5000

// Middleware
app.use(cors()) // Разрешает доступ с фронта
app.use(express.json()) // Позволяет читать JSON в теле запроса
app.use('/api/bugs', bugsRouter)

// Примерный маршрут
app.get('/', (req, res) => {
    res.send('Bugpoint Tracker API is running!')
})

// Старт сервера
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

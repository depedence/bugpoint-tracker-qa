import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

// Middleware
app.use(cors()) // Разрешает доступ с фронта
app.use(express.json()) // Позволяет читать JSON в теле запроса

// Примерный маршрут
app.get('/', (req, res) => {
    res.send('Bugpoint Tracker API is running!')
})

// Старт сервера
app.listen(PORT, () => {
    console.log(`Server is runnint at http://localhost:${PORT}`)
})

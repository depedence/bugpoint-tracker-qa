import express from 'express'
import cors from 'cors'
import bugsRouter from './routes/bugs'

const app = express()
const PORT = 5000

// Middleware
app.use(express.json())  // Позволяет читать JSON в теле запроса

// Логирование запросов
app.use((req, res, next) => {
  console.log('----- НОВЫЙ ЗАПРОС -----')
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  console.log('Headers:', req.headers)
  console.log('Body:', req.body) // Будет работать благодаря express.json()
  next()
})

// Разрешает доступ с фронта
app.use(cors({
    origin: 'http://localhost:4000', // URL фронта
    methods: ['GET', 'POST', 'DELETE']  // Какие методы разрешены
}))

app.use('/api/bugs', bugsRouter)    // Подключение роутера

// Проверочный маршрут
app.get('/', (req, res) => {
    res.send('Bugpoint Tracker API is running!')
})

process.on('uncaughtException', (err) => {
    console.error('💥 SERVER DOWN:', err)
})

// Старт сервера
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

process.stdin.resume()

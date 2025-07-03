import express from 'express';
import cors from 'cors';
import bugsRouter from './routes/bugs';
import morgan from 'morgan';

const app = express();
const PORT = 5000;

app.use(morgan('dev')); // Кастомные логи в консоль

// Middleware
app.use(express.json()); // Позволяет читать JSON в теле запроса

// Разрешает доступ с фронта
app.use(cors());

app.use('/api/bugs', bugsRouter); // Подключение роутера

// Проверочный маршрут
app.get('/', (req, res) => {
  res.send('Bugpoint Tracker API is running!');
});

process.on('uncaughtException', (err) => {
  console.error('💥 SERVER DOWN:', err);
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

process.stdin.resume();

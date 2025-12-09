import express from 'express';
import hotelsRoutes from './routes/hotels.js';
import bookingRotes from './routes/booking.js';
import auth from './routes/auth.js';
import favorites from './routes/favorites.js';
import reviews from './routes/reviews.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // фронтенд, который делает запросы
    credentials: true,
}));

app.use('/api/hotels', hotelsRoutes);

app.use('/api/booking', bookingRotes);

app.use('/api/auth', auth);

app.use('/api/favorites', favorites);

app.use('/api/reviews', reviews);

const PORT = 3234
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));

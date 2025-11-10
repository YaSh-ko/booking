import express from 'express';
import hotelsRoutes from './routes/hotels.js';
import bookingRotes from './routes/booking.js';
import auth from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/hotels', hotelsRoutes);

app.use('/api/booking', bookingRotes);

app.use('/api/auth', auth);

const PORT = 3234
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
import express from 'express';
import hotelsRoutes from './routes/hotels.js';
import bookingRotes from './routes/booking.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/hotels', hotelsRoutes);

app.use('/api/booking', bookingRotes);

const PORT = 3234
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
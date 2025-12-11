import supabase from '../connect.js';

export const getHotels = async (req, res) => {
  try {
    const { city, checkIn, checkOut, type } = req.query;
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('city', city)
      .eq('type', type);

    if (error) {
      // 500 - только для внутренних ошибок БД
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Ошибка базы данных' });
    }

    if (!data || data.length === 0) {
      // 404 - нет отелей по запросу
      console.log('Ничего не найдено');
      return res.status(404).json({ error: 'Отели не найдены' });
    }

    // 200 - успех
    console.log(data);
    res.json(data);
  } catch (error) {
    // 500 - непредвиденные ошибки сервера
    console.error('Server error:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

export const getInfobyID = async (req, res) => {
  try {
    const { id, checkIn, checkOut } = req.query;

    const { data: hotel, error } = await supabase
      .from('hotels')
      .select('*, rooms(*)')
      .eq('id', parseInt(id))
      .single();

    if (error) {
      // 500 - только для внутренних ошибок БД
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Ошибка базы данных' });
    }

    if (!hotel) {
      // 404 - нет отелей по запросу
      return res.status(404).json({ error: 'Данные не найдены' });
    }

    if (!checkIn || !checkOut) {
      return res.json(hotel);
    }

    const roomIds = hotel.rooms.map((room) => room.id);

    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('room_id')
      .in('room_id', roomIds)
      .lt('check_in', checkOut)
      .gt('check_out', checkIn);

    if (bookingError) {
      console.error(bookingError);
    }

    const bookedRoomIds = new Set(bookings?.map((b) => b.room_id) || []);

    hotel.rooms = hotel.rooms.filter((room) => !bookedRoomIds.has(room.id));

    // 200 - успех
    console.log(hotel);
    res.json(hotel);
  } catch (error) {
    // 500 - непредвиденные ошибки сервера
    console.error('Server error:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

export const searchHotels = async (req, res) => {
  try {
    const { city, min_price, max_price, sort = 'rating', order = 'desc' } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'Параметр city обязателен' });
    }

    let query = supabase
      .from('hotels')
      .select('id, name, city, type, img, price, rating, adress')
      .eq('city', city);

    // Фильтры по цене
    if (min_price) query = query.gte('price', parseInt(min_price, 10));
    if (max_price) query = query.lte('price', parseInt(max_price, 10));

    // Сортировка
    const validSort = ['price', 'rating', 'popularity'].includes(sort) ? sort : 'rating';
    const validOrder = order === 'asc'; // true → asc, false → desc

    query = query.order(validSort, { ascending: validOrder });

    // Выполняем запрос БЕЗ .range() — получаем все записи
    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Ошибка базы данных' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Отели не найдены' });
    }

    // Просто возвращаем массив отелей
    res.json({
      hotels: data,
    });
  } catch (err) {
    console.error('SearchHotels server error:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

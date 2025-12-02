import supabase from "../connect.js";

export const getHotels = async (req, res) => {
  try {
    const { city, checkIn, checkOut, type } = req.query
    
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('city', city)
      .eq('type', type);

    if (error) {
      // 500 - только для внутренних ошибок БД
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Ошибка базы данных' })
    }

    if (!data || data.length === 0) {
      // 404 - нет отелей по запросу
      console.log("Ничего не найдено");
      return res.status(404).json({ error: 'Отели не найдены' })
    }

    // 200 - успех
    console.log(data);
    res.json(data)
    
  } catch (error) {
    // 500 - непредвиденные ошибки сервера
    console.error('Server error:', error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

export const getInfobyID = async(req, res) => {
  try {
    const { id } = req.query

    const {data, error} = await supabase
      .from('hotels')
      .select('*, rooms(*)')
      .eq('id', parseInt(id))
      .single();

    if (error) {
      // 500 - только для внутренних ошибок БД
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Ошибка базы данных' })
    }

    if (!data || data.length === 0) {
      // 404 - нет отелей по запросу
      return res.status(404).json({ error: 'Данные не найдены' })
    }
    
    // 200 - успех
    console.log(data);
    res.json(data)
    
  } catch (error) {
    // 500 - непредвиденные ошибки сервера
    console.error('Server error:', error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

export const searchHotels = async (req, res) => {
  try {
    const {
      city,
      min_price,
      max_price,
      sort = 'rating',
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'Параметр city обязателен' });
    }

    const offset = (page - 1) * limit;

    let query = supabase
      .from('hotels')
      .select('id, name, city, type, img, price, rating, adress', { count: 'exact' }) // ← ИСПРАВЛЕНО!
      .eq('city', city);

    // Цена
    if (min_price) query = query.gte('price', parseInt(min_price, 10));
    if (max_price) query = query.lte('price', parseInt(max_price, 10));

    // Сортировка
    const validSort = ['price', 'rating', 'popularity'].includes(sort) ? sort : 'rating';
    const validOrder = order === 'asc';

    query = query.order(validSort, { ascending: validOrder });

    // Пагинация
    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Ошибка базы данных' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Отели не найдены' });
    }

    res.json({
      hotels: data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });

  } catch (err) {
    console.error('SearchHotels server error:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};
import supabase from "../connect.js";

export const getHotels = async (req, res) => {
  try {
    const { city, checkIn, checkOut, guests } = req.query
    
    console.log(city);
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('city', city)
      .gte('guests', parseInt(guests));

    if (error) {
      // 500 - только для внутренних ошибок БД
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Ошибка базы данных' })
    }

    // if (!data || data.length === 0) {
    //   // 404 - нет отелей по запросу
    //   return res.status(404).json({ error: 'Отели не найдены' })
    // }

    // 200 - успех
    res.json(data)
    
  } catch (error) {
    // 500 - непредвиденные ошибки сервера
    console.error('Server error:', error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}
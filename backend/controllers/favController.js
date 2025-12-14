import supabase from '../connect.js';

export const toggleFavorite = async (req, res) => {
  try {
    // Тело запроса Id отеля и Id пользователя
    const { hotel_id } = req.body;
    const userId = req.user.id;

    // проверка наличия id
    if (!hotel_id) {
      return res.status(400).json({ error: 'Поле hotel_id и user_id обязательны' });
    }

    // конвертируем id в int
    const hotelId = parseInt(hotel_id, 10);

    // и проверяем являются ли они числами
    if (isNaN(hotelId)) {
      return res.status(400).json({ error: 'ID должны быть числами' });
    }

    // ищем в favorites об отеле для проверки на уникальность вдруг этот пользователь
    // уже добавлял его к себе в избранное
    const { data: existing, error: checkError } = await supabase
      .from('favorites')
      .select('id')
      .eq('hotel_id', hotelId)
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle();

    if (checkError) {
      console.error('Ошибка проверки:', checkError);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    // Удаление
    if (existing) {
      const { data: favorites, error: favoritesError } = await supabase
        .from('favorites')
        .delete()
        .eq('hotel_id', hotelId)
        .eq('user_id', userId);

      // ошибака удаления отеля из избранного
      if (favoritesError) {
        console.error('Favorites error: ', favoritesError);
        return res.status(400).json({ error: 'Ошибка при удалении из избранных' });
      }

      // успешное удаление отеля из избранного
      return res.status(200).json({
        message: 'Отель удален из избранного!',
        isFavorite: false,
      });
    }

    // вставка id отеля и id пользователя в таблицу favorites и добавление текущей даты
    // тем самым добавляем отель в избранные пользователя
    const { data: favorites, error: favoritesError } = await supabase
      .from('favorites')
      .insert({
        hotel_id: hotelId,
        user_id: userId,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    // ошибака добавления отеля в избранные
    if (favoritesError) {
      console.error('Favorites error: ', favoritesError);
      return res.status(400).json({ error: 'Ошибка при добавлении в избранные' });
    }

    // успешное добавление отеля в избранное
    return res.status(201).json({
      message: 'Отель добавлен в избранное!',
      isFavorite: true,
    });

    // обработка ошибки сервера
  } catch (error) {
    console.error('Server error: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

// controllers/favoriteController.js

export const myFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const hotel_id = req.query.hotel_id;

    if (!hotel_id) {
      return res.status(400).json({ error: 'hotel_id обязателен' });
    }

    const hotelId = parseInt(hotel_id, 10);
    if (isNaN(hotelId)) {
      return res.status(400).json({ error: 'hotel_id должен быть числом' });
    }

    // Ищем, есть ли запись с этим user_id + hotel_id
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('hotel_id', hotelId)
      .maybeSingle(); // важно: может вернуть null, если ничего нет

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    const isFavorite = !!data;

    return res.json({ isFavorite });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

export const GetFavorite = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: fav, error } = await supabase
      .from('favorites')
      .select(
        `
        id,
        created_at,
        hotel_id,
        hotels (
          id,
          name,
          description,
          city,
          rating,
          type,
          img,
          price,
          amenities,
          adress
        )
      `,
      )
      .eq('user_id', userId);

    console.log('Избранное', fav);
    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(fav);
  } catch (error) {
    console.error('Server error: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

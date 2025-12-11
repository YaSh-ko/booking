import supabase from "../connect.js";

export const toggleFavorite = async (req, res) => {
  try {
    // Тело запроса Id отеля и Id пользователя
    const { hotel_id } = req.body;
    const userId = req.user.id;

    // проверка наличия id
    if (!hotel_id ) {
      return res.status(400).json({ error: 'Поле hotel_id и user_id обязательны'});
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
      .eq('user_id', userId)
      
      // ошибака удаления отеля из избранного
      if (favoritesError) {
        console.error('Favorites error: ', favoritesError);
        return res.status(400).json({ error: 'Ошибка при удалении из избранных' });
      }

      // успешное удаление отеля из избранного  
      return res.status(200).json({
        message: 'Отель удален из избранного!',
        isFavorite: false
      });
    }

    // вставка id отеля и id пользователя в таблицу favorites и добавление текущей даты 
    // тем самым добавляем отель в избранные пользователя
    const { data: favorites, error: favoritesError } = await supabase 
      .from('favorites')
      .insert({
        hotel_id: hotelId,
        user_id: userId,
        created_at: new Date().toISOString() 
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

export const myFavorite = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: fav, error } = await supabase
      .from('favorites')
      .select('hotel_id')
      .eq('user_id', userId)
    

    if(error) {
      console.error('error: ', Error);
      return res.status(400).json({ error: 'Ошибка получения избранных' });
    };

    if(!fav) {
       console.error('error: ', Error);
       return res.status(400).json({ error: 'Данные отсутствуют'})
    };

    //успех 200;
    console.log(fav);
    res.json(fav);

  } catch (error) {
    console.error('Server error: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

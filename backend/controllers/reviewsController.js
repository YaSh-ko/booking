import supabase from "../connect.js";

export const addReview = async (req, res) => {
  try {
    const { hotel_id, rating, comment } = req.body;
    const userId = req.user.id;

    if (!hotel_id || !rating) {
      return res.status(400).json({ error: 'Поля hotel_id и rating обязательны'})
    }

    const hotelId = parseInt(hotel_id, 10);

    if (isNaN(hotelId)) {
      return res.status(400).json({ error: 'ID должны быть числами' });
    }

    const { data: existing, error } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', userId)
      .eq('hotel_id', hotelId)
      .maybeSingle();

    if (error) {
      console.error('Ошибка проверки: ', error);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    if (existing) {
      return res.status(200).json({
        message: 'Вы уже добавляли отзыв!'
      })
    }

    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .insert({
        hotel_id: hotelId,
        user_id: userId,
        comment: comment,
        rating: rating,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

      if (reviewsError) {
      console.error('Reviews error: ', reviewsError);
      return res.status(400).json({ error: 'Ошибка при добавлении отзыва' });
      }

      return res.status(201).json({
        message: 'Отзыв успешно добавлен!',
      })

  } catch (error) {
    console.error('Server error: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

export const deleteReview = async (req, res) => {
  try {
    const { hotel_id } = req.body;
    const userId = req.user.id;

    if (!hotel_id) {
      return res.status(400).json({ error: 'Поля hotel_id обязательный'})
    }

    const hotelId = parseInt(hotel_id, 10);

    if (isNaN(hotelId)) {
      return res.status(400).json({ error: 'ID должны быть числами' });
    }

    const { data: reviews, error: reviewsError } = await supabase 
      .from('reviews')
      .delete()
      .eq('hotel_id', hotelId)
      .eq('user_id', userId)

    if (reviewsError) {
      console.error('Reviews error: ', reviewsError);
      return res.status(400).json({ error: 'Ошибка при удалении отзыва' });
      }

    return res.status(201).json({
      message: 'Отзыв успешно удален!',
    })

  } catch (error) {
    console.error('Server error: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}
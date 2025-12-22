import supabase from "../connect.js";

export const addReview = async (req, res) => {
  try {
    const { hotel_id, rating, comment } = req.body;
    const userId = req.user.id;

    if (!hotel_id || !rating) {
      return res
        .status(400)
        .json({ error: "Поля hotel_id и rating обязательны" });
    }

    const hotelId = parseInt(hotel_id, 10);

    if (isNaN(hotelId)) {
      return res.status(400).json({ error: "ID должны быть числами" });
    }

    const { data: existing, error } = await supabase
      .from("reviews")
      .select("id")
      .eq("user_id", userId)
      .eq("hotel_id", hotelId)
      .maybeSingle();

    if (error) {
      console.error("Ошибка проверки: ", error);
      return res.status(500).json({ error: "Ошибка сервера" });
    }

    if (existing) {
      return res.status(200).json({
        message: "Вы уже добавляли отзыв!",
      });
    }

    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .insert({
        hotel_id: hotelId,
        user_id: userId,
        comment: comment,
        rating: rating,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (reviewsError) {
      console.error("Reviews error: ", reviewsError);
      return res.status(400).json({ error: "Ошибка при добавлении отзыва" });
    }

    const { data: avgData, error: avgError } = await supabase
      .from("reviews")
      .select("rating")
      .eq("hotel_id", hotelId);

    if (avgError) {
      console.error("Ошибка получения оценок:", avgError);
    }

    let newRating = 0;

    if (avgData && avgData.length > 0) {
      const sum = avgData.reduce((acc, curr) => acc + curr.rating, 0);
      newRating = sum / avgData.length;
      newRating = Math.round(newRating * 10) / 10;
    }

    const { error: updateError } = await supabase
      .from("hotels")
      .update({ rating: newRating })
      .eq("id", hotelId);

    if (updateError) {
      console.error("Ошибка обновления рейтинга:", updateError);
      return res
        .status(500)
        .json({ error: "Ошибка обновления рейтинга отеля" });
    }

    return res.status(201).json({
      message: "Отзыв успешно добавлен!",
      newHotelRating: newRating,
    });
  } catch (error) {
    console.error("Server error: ", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { hotel_id } = req.body;
    const userId = req.user.id;

    if (!hotel_id) {
      return res.status(400).json({ error: "Поля hotel_id обязательный" });
    }

    const hotelId = parseInt(hotel_id, 10);

    if (isNaN(hotelId)) {
      return res.status(400).json({ error: "ID должны быть числами" });
    }

    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .delete()
      .eq("hotel_id", hotelId)
      .eq("user_id", userId);

    if (reviewsError) {
      console.error("Reviews error: ", reviewsError);
      return res.status(400).json({ error: "Ошибка при удалении отзыва" });
    }

    return res.status(201).json({
      message: "Отзыв успешно удален!",
    });
  } catch (error) {
    console.error("Server error: ", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const getReview = async (req, res) => {
  try {
    const { hotel_id } = req.query;

    let query = supabase
      .from("reviews")
      .select(
        "id, hotel_id, rating, comment, created_at, user_id, users(name), hotels(name)"
      );

    if (hotel_id) {
      const hotelId = parseInt(hotel_id, 10);
      if (isNaN(hotelId)) {
        return res.status(400).json({ error: "hotel_id должен быть числом" });
      }
      query = query.eq("hotel_id", hotelId);
    } else {
      query = query.order("created_at", { ascending: false }).limit(3);
    }

    const { data, error } = await query;

    if (error) {
      // 500 - только для внутренних ошибок БД
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Ошибка базы данных" });
    }

    res.status(200).json(data || []);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

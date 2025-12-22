import Stripe from "stripe";
import supabase from "../connect.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const createBooking = async (req, res) => {
  try {
    const { room_id, check_in, check_out } = req.body;
    const user_id = req.user.id;

    if (!room_id || !check_in || !check_out) {
      return res
        .status(400)
        .json({ error: "room_id, check_in, check_out обязательны" });
    }

    const roomId = parseInt(room_id, 10);
    if (isNaN(roomId)) {
      return res.status(400).json({ error: "room_id должен быть числом" });
    }

    // ВАЛИДАЦИЯ ДАТ
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      return res.status(400).json({ error: "Неверный формат даты" });
    }

    if (checkInDate < today || checkOutDate <= checkInDate) {
      return res
        .status(400)
        .json({ error: "Заезд должен быть в будущем и раньше выезда" });
    }

    // ПОЛУЧАЕМ КОМНАТУ
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    if (roomError || !room) {
      return res.status(404).json({ error: "Комната не найдена" });
    }

    // ПРОВЕРКА ПЕРЕСЕЧЕНИЙ
    const { data: overlappingBookings } = await supabase
      .from("bookings")
      .select("id")
      .eq("room_id", roomId)
      .lt("check_in", check_out)
      .gt("check_out", check_in);

    if (overlappingBookings?.length > 0) {
      return res.status(400).json({ error: "Комната занята в выбранные даты" });
    }

    // РАСЧЁТ
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const total_price = room.price_per_night * nights;

    // ВСТАВКА
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        user_id,
        room_id: roomId,
        hotel_id: room.hotel_id,
        check_in,
        check_out,
        total_price,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (bookingError) {
      console.error("Booking error:", bookingError);
      return res.status(500).json({ error: "Ошибка при сохранении брони" });
    }

    // ОТВЕТ
    return res.status(201).json({
      message: "Бронь успешно создана!",
      booking: {
        id: booking.id,
        hotel_id: room.hotel_id,
        room_number: room.room_number,
        room_type: room.room_type,
        check_in,
        check_out,
        nights,
        total_price,
        price_per_night: room.price_per_night,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { booking_id } = req.body;
    const user_id = req.user.id;

    if (!booking_id) {
      return res.status(400).json({ error: "booking_id обязателен" });
    }

    const bookingId = parseInt(booking_id, 10);
    if (isNaN(bookingId)) {
      return res.status(400).json({ error: "booking_id должен быть числом" });
    }

    // 1. Ищем бронь
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("id, room_id, check_in")
      .eq("id", bookingId)
      .eq("user_id", user_id)
      .single();

    // Если не нашли или не своя бронь
    if (fetchError || !booking) {
      return res.status(404).json({
        error: "Бронь не найдена или вы не можете её отменить",
      });
    }

    // 2. УДАЛЯЕМ бронь
    const { error: deleteError } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId);

    if (deleteError) {
      console.error("Ошибка удаления брони:", deleteError);
      return res.status(500).json({ error: "Не удалось отменить бронь" });
    }

    // Успех!
    return res.status(200).json({
      message: "Бронь успешно отменена!",
      cancelled_booking_id: bookingId,
    });
  } catch (error) {
    console.error("Server error при отмене брони:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const myBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("hotel_id, room_id")
      .eq("user_id", userId)
      .order("id", { ascending: false });

    if (bookingsError) {
      console.error("Supabase error (bookings):", bookingsError);
      return res.status(500).json({ error: "Ошибка получения бронирований" });
    }

    if (!bookings || bookings.length === 0) {
      return res.json([]);
    }

    const hotelIds = [
      ...new Set(bookings.map((b) => b.hotel_id).filter(Boolean)),
    ];
    const roomIds = [
      ...new Set(bookings.map((b) => b.room_id).filter(Boolean)),
    ];

    let hotels = [];
    let rooms = [];

    if (hotelIds.length > 0) {
      const { data: hotelsData, error: hotelsError } = await supabase
        .from("hotels")
        .select(
          "id, name, description, city, rating, type, img, price, amenities, adress"
        )
        .in("id", hotelIds);

      if (hotelsError) {
        console.error("Supabase error (hotels):", hotelsError);
        return res.status(500).json({ error: "Ошибка получения отелей" });
      }
      hotels = hotelsData || [];
    }

    if (roomIds.length > 0) {
      const { data: roomsData, error: roomsError } = await supabase
        .from("rooms")
        .select(
          "id, hotel_id, room_number, room_type, price_per_night, capacity, image_url"
        )
        .in("id", roomIds);

      if (roomsError) {
        console.error("Supabase error (rooms):", roomsError);
        return res.status(500).json({ error: "Ошибка получения номеров" });
      }
      rooms = roomsData || [];
    }

    const enrichedBookings = bookings.map((booking) => {
      const hotel = hotels.find((h) => h.id === booking.hotel_id) || null;
      const room = rooms.find((r) => r.id === booking.room_id) || null;

      return {
        ...booking,
        hotel,
        room,
      };
    });

    res.json(enrichedBookings);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const Payment = async (req, res) => {
  try {
    const { amount, currency = "rub", name, email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      receipt_email: email,
      description: `Оплата бронирования дял ${name}`,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

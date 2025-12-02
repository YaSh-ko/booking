import supabase from "../connect.js";

export const createBooking = async (req, res) => {
  try {
    const { room_id, check_in, check_out } = req.body;  
    const user_id = req.user.id;

    if (!room_id || !check_in || !check_out) {
      return res.status(400).json({ error: 'room_id, check_in, check_out обязательны' });
    }

    const roomId = parseInt(room_id, 10);
    if (isNaN(roomId)) {
      return res.status(400).json({ error: 'room_id должен быть числом' });
    }

    // ВАЛИДАЦИЯ ДАТ
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      return res.status(400).json({ error: 'Неверный формат даты' });
    }

    if (checkInDate < today || checkOutDate <= checkInDate) {
      return res.status(400).json({ error: 'Заезд должен быть в будущем и раньше выезда' });
    }

    // ПОЛУЧАЕМ КОМНАТУ
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('*') 
      .eq('id', roomId)
      .single();

    if (roomError || !room) {
      return res.status(404).json({ error: 'Комната не найдена' });
    }

    if (!room.is_available) {
      return res.status(400).json({ error: 'Комната уже забронирована' });
    }

    // ПРОВЕРКА ПЕРЕСЕЧЕНИЙ 
    const { data: overlappingBookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('room_id', roomId)
      .lt('check_in', check_out)
      .gt('check_out', check_in);

    if (overlappingBookings?.length > 0) {
      return res.status(400).json({ error: 'Комната занята в выбранные даты' });
    }

    // РАСЧЁТ
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const total_price = room.price_per_night * nights;

    // ВСТАВКА
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id,
        room_id: roomId,
        hotel_id: room.hotel_id,     
        check_in,
        check_out,
        total_price,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Booking error:', bookingError);
      return res.status(500).json({ error: 'Ошибка при сохранении брони' });
    }

    // БЛОКИРУЕМ КОМНАТУ
    await supabase
      .from('rooms')
      .update({ is_available: false })
      .eq('id', roomId);

    // ОТВЕТ
    return res.status(201).json({
      message: 'Бронь успешно создана!',
      booking: {
        id: booking.id,
        hotel_id: room.hotel_id,  
        room_number: room.room_number,
        room_type: room.room_type,
        check_in,
        check_out,
        nights,
        total_price,
        price_per_night: room.price_per_night
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { booking_id } = req.body;
    const user_id = req.user.id; 

    if (!booking_id) {
      return res.status(400).json({ error: 'booking_id обязателен' });
    }

    const bookingId = parseInt(booking_id, 10);
    if (isNaN(bookingId)) {
      return res.status(400).json({ error: 'booking_id должен быть числом' });
    }

    // 1. Ищем бронь 
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('id, room_id, check_in')
      .eq('id', bookingId)
      .eq('user_id', user_id)
      .single();

    // Если не нашли или не своя бронь
    if (fetchError || !booking) {
      return res.status(404).json({
        error: 'Бронь не найдена или вы не можете её отменить'
      });
    }

    // 2. УДАЛЯЕМ бронь
    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);

    if (deleteError) {
      console.error('Ошибка удаления брони:', deleteError);
      return res.status(500).json({ error: 'Не удалось отменить бронь' });
    }

    // 3. Освобождаем комнату
    await supabase
      .from('rooms')
      .update({ is_available: true })
      .eq('id', booking.room_id);

    // Успех!
    return res.status(200).json({
      message: 'Бронь успешно отменена!',
      cancelled_booking_id: bookingId
    });

  } catch (error) {
    console.error('Server error при отмене брони:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};
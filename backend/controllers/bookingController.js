import supabase from "../connect.js";

export const createBooking = async (req, res) => {
  try {
    const {user_id, room_id, check_in, check_out} = req.body

    if (!user_id || !room_id || !check_in || !check_out) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      return res.status(400).json({ error: 'Неверный формат даты' });
    }

    if (checkInDate < today || checkOutDate <= checkInDate) {
      return res.status(400).json({ error: 'Неверные даты: заезд должен быть в будущем и раньше выезда' });
    }

    const {data: room, error: roomError} = await supabase
      .from('rooms')
      .select('*')
      .eq('id', room_id)
      .single();

    if (roomError || !room) {
      return res.status(404).json({ error: 'Комната не найдена' });
    }

    if (!room.is_available) {
      return res.status(400).json({ error: 'Комната уже забронирована' });
    }
    
    const {data: overlappingBookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('room_id', room_id)
      .lt('check_in', check_out)
      .gt('check_out', check_in);

    if (overlappingBookings && overlappingBookings.length > 0) {
      return res.status(400).json({ error: 'Комната занята в выбранные даты' })
    }

    // Расчёт количества ночей и цены
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const total_price = room.price_per_night * nights;

    const {data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({user_id,
        room_id,
        check_in: check_in,
        check_out: check_out, 
        total_price,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (bookingError) {
      console.error('Booking error:', bookingError);
      return res.status(500).json({ error: 'Ошибка при сохранении брони' });
    }

    // Опционально: блокируем комнату
    await supabase
      .from('rooms')
      .update({ is_available: false })
      .eq('id', room_id);

    // Успешный ответ
    res.status(201).json({
      message: 'Бронь успешно создана!',
      booking: {
        id: booking.id,
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
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}
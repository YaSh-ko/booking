import supabase from '../connect.js'

export const getHotels = async (req, res) =>{
  const {city, checkIn, checkOut, guests} = req.query
  let query = supabase.from('hotels').select('*');
  if (city) {
    query = query.eq('city', city);
  }

  if(checkIn) {
    query = query.eq('checkIn', checkIn);
  }

  if(checkOut) {
    query = query.eq('checkOut', checkOut);
  }

  if(guests) {
    query = query.gte('guests', parseInt(guests));
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  res.json(data)
}
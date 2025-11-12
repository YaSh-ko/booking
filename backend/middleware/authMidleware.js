import supabase from "../connect.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies['auth-token'];

  if(!token) {
    return res.status(400).json({ error: 'Не авторизован'})
  }

  const {data: {user}, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    res.clearCookie('auth-token');
    return res.status(401).json({error: 'Сессия истекла'})
  }

  req.user = user;
  next();
}
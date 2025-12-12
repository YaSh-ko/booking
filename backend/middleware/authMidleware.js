import supabase from "../connect.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies['auth-token'];

  if (!token) {
    return res.status(401).json({ error: 'Не авторизован' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.clearCookie('auth-token');
      return res.status(401).json({ error: 'Сессия истекла' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Middleware error:', err.message);
    res.clearCookie('auth-token');
    return res.status(401).json({ error: 'Ошибка авторизации' });
  }
};
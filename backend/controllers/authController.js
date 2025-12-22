import supabase from "../connect.js";

export const sendCode = async (req, res) => {
  try{
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email обязателен'});
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Неверный формат email'});
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Имя обязательно'});
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ error: 'Имя должно содержать минимум 2 символа'});
    }

    const {data, error} = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { name }
      }
    });

    await supabase
      .from('users')
      .upsert({
        email: email,
        name: name.trim()
      }, { onConflict: 'email'});

    return res.json({ message: 'Код отправлен на почту'});
  }
  catch (error) {
    console.error('Server error: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email и код обязательны' });
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Неверный формат email' });
    }

    if (code.length !== 6 || !/^\d+$/.test(code)) {
      return res.status(400).json({ error: 'Код должен состоять из 6 цифр' });
    }

    const {data, error} = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email'
    });

    if (!data.session) {
      return res.status(400).json({ error: 'Неверный код'});
    }

    const {session, user} = data;

    const { data: tempUser } = await supabase
      .from('users')
      .select('name')
      .eq('email', user.email)
      .single();

    const finalName = tempUser?.name || 'User';

    res.cookie('auth-token', session.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const {error: dbError} = await supabase
      .from('users')
      .upsert({
        user_uuid: user.id,
        email: user.email,
        name: finalName
      }, {onConflict: 'email'
      });

    if (dbError) {
      console.error('Ошибка upsert в users: ', dbError);
    }

    return res.json({
      user: {
        user_uuid: user.id,
        email: user.email,
        name: finalName
      }
    });
  }
  catch (error) {
    console.error('Server error: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('auth-token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });

    return res.json({ message: 'Выход выполнен '})
  }
  catch (error) {
    console.error('Server error: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

export const me = async (req, res) => {
  try {
    const authUser = req.user;

    const {data: profile, error } = await supabase
      .from('users')
      .select('name')
      .eq('user_uuid', authUser.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Ошибка профиля: ', error);
    }
    return res.json({
      user: {
        user_uuid: authUser.id,
        email: authUser.email,
        name: profile?.name || 'User'
      }
    });
  }
  catch (error) {
    console.error('Server error: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

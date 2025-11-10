import supabase from "../connect.js";

export const sendCode = async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email обязателен'});
  }

  if (!name) {
    return res.status(400).json({ error: 'Имя обязательно'});
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

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  

  if (!email || !code || code.length !== 6) {
    return res.status(400).json({ error: 'Неверный код или email' });
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
    }, {onConflict: 'user_uuid' 
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
};

export const logout = (req, res) => {
  res.clearCookie('auth-token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });

  return res.json({ message: 'Выход выполнен '});
};

export const me = async (req, res) => {
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
};
import { useAuth } from '../../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';
import './modal.scss';
import { Loader } from '../loader/Loader';
import { useUserContext } from '../../context/userContext';

export function Modal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [isSentCode, setIsSentCode] = useState(false);
  const [localError, setLocalError] = useState('');
  const modalRef = useRef();
  const { sendCode, verifyCode, isLoading, error: apiError, clearError } = useAuth();
  const { login } = useUserContext();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (localError) setLocalError('');
    if (apiError) clearError();
  };

  const handleSubmit = async (e, resent = false) => {
    e.preventDefault();

    try {
      if (!isSentCode || resent) {
        if (!email.trim() || !name.trim()) {
          setLocalError('Заполните имя и email');
          return;
        }

        await sendCode(email, name);
        setIsSentCode(true);
      } else {
        const user = await verifyCode(email, code);
        login(user);
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <h2 className="modal__title">Вход</h2>

        {(apiError || localError) && (
          <div className="modal__error">
            {apiError || localError}
            <button
              className="modal__error-close"
              onClick={() => {
                if (apiError) clearError();
                if (localError) setLocalError('');
              }}
            >
              ×
            </button>
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="modal__form">
            <input
              type="text"
              name="name"
              value={name}
              className="modal__input"
              placeholder="Введите имя"
              onChange={handleInputChange(setName)}
              disabled={isSentCode}
            />

            <input
              type="email"
              value={email}
              className="modal__input"
              placeholder="Введите email"
              onChange={handleInputChange(setEmail)}
              disabled={isSentCode}
            />

            {isSentCode && (
              <input
                placeholder="Введите код"
                value={code}
                onChange={handleInputChange(setCode)}
                className="modal__input"
              />
            )}

            {isSentCode && (
              <div className="modal__actions">
                <button type="button" onClick={() => setIsSentCode(false)}>
                  Вернуться назад
                </button>
                <button type="button" onClick={(e) => handleSubmit(e, true)}>
                  Отправить код еще раз
                </button>
              </div>
            )}

            <button type="submit" className="modal__button">
              {isSentCode ? 'Войти' : 'Отправить код'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

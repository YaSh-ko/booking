import { useAuth } from '../../hooks/useAuth';
import { useRef, useState, useEffect, useCallback } from 'react';
import './modal.scss';
import { Loader } from '../loader/Loader';
import { useUserContext } from '../../context/userContext';
import { useClickOutside } from '../../hooks/useClickOutside';

export function Modal({ open, onClose, modalType }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [isSentCode, setIsSentCode] = useState(false);
  const [localError, setLocalError] = useState('');
  const { sendCode, verifyCode, isLoading, error: apiError, clearError } = useAuth();
  const { login, logout } = useUserContext();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const modalRef = useClickOutside(handleClose, open);

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
        const data = await verifyCode(email, code);
        login(data.user);
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      {modalType === 'auth' ? (
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
                autoComplete="email"
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
      ) : (
        <div className="modal" ref={modalRef}>
          <h2 className="modal__title">Вы уверены что хотите выйти? </h2>

          <div className="modal__exit-buttons-group">
            <button
              className="modal__button modal__button--gray"
              onClick={() => onClose()}
            >
              Вернуться
            </button>
            <button
              className="modal__button"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

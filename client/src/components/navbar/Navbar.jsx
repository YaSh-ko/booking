import { Link } from 'react-router-dom';
import './navbar.scss';
import { useEffect, useState } from 'react';
import { Modal } from '../modal/Modal';
import { useUserContext } from '../../context/userContext';
import { FavoriteButton } from '../favoriteButton/FavoriteButton';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOPen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useUserContext();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  useEffect(() => console.log(user?.name), [user?.name]);
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img
              src="/navbar/logo.png"
              alt="Логотип компании"
              className="header__logo-img"
            />
          </Link>
        </div>

        <nav className={`navbar ${isMenuOpen ? 'navbar--vertical' : ''}`}>
          <ul className="navbar__menu">
            <li className="navbar__item">
              <Link to="/" className="navbar__link">
                Главная
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/about" className="navbar__link">
                О нас
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/contacts" className="navbar__link">
                Контакты
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/help" className="navbar__link">
                Помощь
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          {user ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {isUserMenuOPen && (
                <nav className="user-menu">
                  <ul className="user-menu__list">
                    <li className="user-menu__item user-name">
                      <span>{user.name}</span>
                    </li>

                    <li className="user-menu__item user-menu__link">
                      <Link to="/hotels/favorites">Избранное</Link>
                    </li>
                    <li className="user-menu__item user-menu__link">
                      <Link>Бронирования</Link>
                    </li>
                    <li className="user-menu__item user-menu__button">
                      <button
                        className="header__signin-btn user-menu__exit-btn"
                        onClick={() => setIsExitModalOpen(true)}
                      >
                        Выйти
                      </button>
                    </li>
                  </ul>
                </nav>
              )}

              <div className="user-actions">
                <Link to="/hotels/favorites" className="user-actions__button ">
                  <img src="/navbar/favorites.png" alt="" />
                </Link>
                <Link className="user-actions__button">
                  <img src="/navbar/bookings.png" alt="" />
                </Link>
                <button
                  className="user-actions__button"
                  disabled={isMenuOpen}
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                >
                  <img src="/navbar/prfoile.png" alt="" />
                </button>
              </div>
            </div>
          ) : (
            <button className="header__signin-btn" onClick={() => setIsModalOpen(true)}>
              Войти
            </button>
          )}

          <button
            className="header__open-menu-btn"
            disabled={isUserMenuOPen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <img
              loading="lazy"
              src="/navbar/menu.png"
              alt=""
              className="header__open-menu-icon"
            />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          modalType={'auth'}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isExitModalOpen && (
        <Modal
          modalType={'exit'}
          open={isExitModalOpen}
          onClose={() => setIsExitModalOpen(false)}
        />
      )}
    </header>
  );
};

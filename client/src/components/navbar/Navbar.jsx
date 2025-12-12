import { Link } from 'react-router-dom';
import './navbar.scss';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from '../modal/Modal';
import { useUserContext } from '../../context/userContext';
import { FavoriteButton } from '../favoriteButton/FavoriteButton';
import { useClickOutside } from '../../hooks/useClickOutside';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOPen, setIsUserMenuOpen] = useState(false);
  const { user } = useUserContext();
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
                  <svg
                    fill="currentColor"
                    width="22px"
                    height="22px"
                    viewBox="0 0 52 52"
                    data-name="Layer 1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M43.62,52a2,2,0,0,1-1.09-.33L26,40.83,9.47,51.67a2,2,0,0,1-2,.09,2,2,0,0,1-1-1.76V2a2,2,0,0,1,2-2H43.62a2,2,0,0,1,2,2V50a2,2,0,0,1-1,1.76A2,2,0,0,1,43.62,52ZM26,36.44a2.1,2.1,0,0,1,1.1.32L41.62,46.3V4H10.38V46.3L24.9,36.76A2.1,2.1,0,0,1,26,36.44Z" />
                  </svg>
                </Link>
                <Link className="user-actions__button user-actions__button--bookings">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <path
                      d="M15.694 13.7H15.703M15.694 16.7H15.703M11.995 16.7H12.004M8.294 13.7H8.303M8.294 16.7H8.303"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <path
                      d="M11.45 13.7L11.95 13.7L12.85 13.7"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Link>
                <button
                  className="user-actions__button user-actions__button--profile"
                  disabled={isMenuOpen}
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                >
                  <img width={'32px'} src="/navbar/prfoile.png" alt="" />
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

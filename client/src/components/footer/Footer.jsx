import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__column footer__brand">
          <img
            src="/navbar/logo.png"
            loading="lazy"
            alt="Логотип компании"
            className="footer__logo-img"
          />
          <p>Мы помогаем находить лучшие места для отдыха по всему Миру</p>
        </div>

        <div className="footer__column">
          <h4>Компания</h4>
          <ul>
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
        </div>

        <div className="footer__column">
          <h4>Разделы</h4>
          <ul>
            <li>Поиск</li>
            <li>Популярные направления</li>
            <li>Недавнее</li>
            <li>Отзывы</li>
          </ul>
        </div>

        <div className="footer__column footer__contacts">
          <div className="footer__contact-item">
            <span>✉️</span> Info@yap.travel
          </div>
          <div className="footer__contact-item">
            <span>📞</span> +7 (999) 753 - 33 - 99
          </div>
        </div>
      </div>

      <div className="footer__bottom">2025 YAP. Все права защищены</div>
    </footer>
  );
};

export default Footer;

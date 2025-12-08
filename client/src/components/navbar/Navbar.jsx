import { Link } from "react-router-dom";
import './navbar.scss'
import { useState } from "react";
import { Modal } from "../modal/Modal";
export const Header = ()=> {

    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [isModalOpen, setIsModalOpen ] = useState(false);

    return (
        <header className="header">
            <div className="header__container">

                <div className="header__logo">
                    <Link to="/">
                        <img src="/navbar/logo.png" alt="Логотип компании" className="header__logo-img" />
                    </Link>
                </div>

                <nav className={`navbar ${isMenuOpen ? "navbar--vertical" : ""}`}>
                    <ul className="navbar__menu">
                        <li className="navbar__item"><Link to="/" className="navbar__link">Главная</Link></li>
                        <li className="navbar__item"><Link to="/about" className="navbar__link">О нас</Link></li>
                        <li className="navbar__item"><Link to="/contacts" className="navbar__link">Контакты</Link></li>
                        <li className="navbar__item"><Link to="/help" className="navbar__link">Помощь</Link></li>
                    </ul>
                </nav>

                <div className="header__actions">

                    <button className='header__signin-btn' onClick={()=>setIsModalOpen(true)}>Войти</button>
                    <button 
                        className="header__open-menu-btn"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}>
                        <img src="/navbar/menu.png" alt="" className="header__open-menu-icon" />
                    </button>
                </div>

            </div>

            {isModalOpen && <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}/>}
        </header>

    )
}
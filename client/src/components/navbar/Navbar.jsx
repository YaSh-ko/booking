import { Link } from "react-router-dom";
import './navbar.scss'
export const Navbar = ()=> {
    return (
        <nav className="nav">
            <div className="nav-container">
                    <Link to ='/' className='nav-logo'>
                        <img 
                            src="./public/navbar/logo.png" 
                            alt="" 
                            style={{ width: '70px', height: '70px' }}
                        />
                    </Link>
                    <ul className="nav-menu">
                        <li className="nav-menu_item">
                            <Link to='/' className='nav-menu_item-link'>Главная</Link>
                        </li>
                        <li className="nav-menu_item">
                            <Link to='/' className='nav-menu_item-link'>О нас</Link>
                        </li>
                        <li className="nav-menu_item">
                            <Link to='/' className='nav-menu_item-link'>Контакты</Link>
                        </li>
                        <li className="nav-menu_item">
                            <Link to='/' className='nav-menu_item-link'>Помощь</Link>
                        </li>
                    </ul>   

                    <Link className="nav-btn">
                        <button class='nav-btn-item'>Войти</button>
                    </Link>
            </div>
        </nav>
    )
}
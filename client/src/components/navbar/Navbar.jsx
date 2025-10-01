import { Link } from "react-router-dom";

export const Navbar = ()=> {
    return (
        <nav className="navbar">
            <div className="nav-container">
                    <Link to ='/' className='nav-logo'>
                    </Link>

                    <ul className="nav-menu">
                        <li className="nav-item">
                            <Link to='/' className='nav-link'>Главная</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/' className='nav-link'>О нас</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/' className='nav-link'>Контакты</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/' className='nav-link'>Войти</Link>
                        </li>
                    </ul>   
            </div>
        </nav>
    )
}
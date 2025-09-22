import './Header.css'
import { useNavigate, useLocation} from 'react-router-dom'
import { useEffect, useState, useContext } from "react";
import { AppContext } from '../../../AppContext';

export default function Header() {

    // Категории
    const navigate = useNavigate();
    const location = useLocation();
    const {token, setToken} = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const [categories, setCategory] = useState([]);
    const { request } = useContext(AppContext);

    useEffect(() => {
        request("/api/shop/allCategories")
            .then(data => setCategory(data))
            .catch(console.error);
    }, []);
    // Категории

    return <>
        <div className='head'>
            <div className='head-top'>
                <div>LOGO</div>
                <nav>
                    <ul className='nav'>
                        <li className={`li ${location.pathname === '/' ? 'active' : ''}`} 
                            onClick={() => navigate('/')}>
                            Крамниця
                        </li>
                        <li className={`li ${location.pathname === '/Support' ? 'active' : ''}`} >
                            Бібліотека
                        </li>
                        <li className={`li ${location.pathname === '/Support' ? 'active' : ''}`} >
                            Чат
                        </li>
                    </ul> 
                </nav>
                <div>BUTTONS</div>
            </div>

            <div className="head-bottom">
                <div className='input-category'>
                    <input type="text" placeholder="Пошук у Крамниці..." className='input-header'/>
                    <i className="bi bi-search search"></i>
                    <div className='catalog-news'>
                        <div className='pointer'>Каталог</div>
                        <div className='pointer'>Новини</div>
                    </div>
                </div>
                <button><i className='bi bi-suit-heart'></i></button>
                <button><i className='bi bi-cart3'></i></button>
            </div>

        </div>
    </>;
}
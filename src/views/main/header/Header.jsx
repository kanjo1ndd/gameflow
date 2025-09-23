import './Header.css'
import { useNavigate, useLocation} from 'react-router-dom'
import { useEffect, useState, useContext } from "react";
import { AppContext } from '../../../AppContext';

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const {token, setToken} = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);

    // Категории
    const [categories, setCategory] = useState([]);
    const { request } = useContext(AppContext);

    useEffect(() => {
        request("/api/shop/allCategories")
            .then(data => setCategory(data))
            .catch(console.error);
    }, []);
    // Категории

    // Игры в поиске
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);

        useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (!searchTerm.trim()) {
                setSearchResults([]);
                return;
            }

            request("/api/shop/allProducts")
                .then(products => {
                    const filtered = products.filter(p =>
                        p.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    setSearchResults(filtered.slice(0, 3));
                })
                .catch(console.error);
            }, 300); 

            return () => clearTimeout(delayDebounce);
        }, [searchTerm]);
    // Игры в поиске

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
                {token == null ? <>
                    <button className='button-sign-in' onClick={() => navigate('/SignIn')}>Увійти</button>
                </> : <>
                    <button title={token} onClick={() => {setToken(null); navigate('/');}}>Sign out</button>
                </>}
            </div>

            {location.pathname !== '/SignIn' && (
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
            )}

        </div>
    </>;
}
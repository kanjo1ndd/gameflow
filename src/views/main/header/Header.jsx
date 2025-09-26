import './Header.css'
import { useNavigate, useLocation} from 'react-router-dom'
import { useEffect, useState, useContext } from "react";
import { AppContext } from '../../../AppContext';

export default function Header() {
    
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const [userData, setUserData] = useState({});
    const { request, token } = useContext(AppContext);

    useEffect(() => {
        if(token == null) {
            setUserData({});
        }
        else {
            request("/api/user/profile")
            .then(setUserData)
            .catch(err => {
                console.error(err);
                setUserData({});
            });
        }
    }, [token]);

    return <>
        <div className='head'>
            <div className='head-top'>
                <div>LOGO</div>
                <nav>
                    <ul className='nav'>
                        <li className={`li ${location.pathname === '/' || location.pathname === '/Catalog' ? 'active' : ''}`} 
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
                    <div className='right-part-head'>
                        <button><i className='bi bi-gear'></i></button>
                        <button><i className='bi bi-bell'></i></button>
                        <div className='avatar-head'
                            onClick={() => setIsMenuOpen((prev) => !prev)} >
                                <img className='profile-img-head' src={userData.avatarUrl && userData.avatarUrl !== 'https://localhost:7202/Admin/Image/'
                                    ? userData.avatarUrl : '/unknownUser.jpg'}/>
                        </div>
                        {isMenuOpen && (
                            <div className="avatar-menu">
                                <ul>
                                    <li className='nickname'>{userData.userName ?? 'Nickname'}</li>
                                    <li><span>Пошук користувачів</span></li>
                                    <li><span>Мої друзі</span></li>
                                    <li><span>Мої значки</span></li>
                                    <li><span>Мої скріншоти</span></li>
                                    <li><span>Моє бажане</span></li>
                                    <li><span>Мої обговорення</span></li>
                                    <li><span>Мої відео</span></li>
                                    <li><span>Мої гайди</span></li>
                                    <li><span>Мої рецензії</span></li>
                                    <li className='exit' title={token} onClick={() => {setToken(null); navigate('/');}}>Вийти з акаунту</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </>}
            </div>

            {location.pathname !== '/SignIn' && location.pathname !== '/SignUp' && (
                <div className="head-bottom">
                    <div className='input-category'>
                        <input type="text" placeholder="Пошук у Крамниці..." className='input-header'/>
                        <i className="bi bi-search search"></i>
                        <div className='catalog-news'>
                            <div className={`pointer ${ location.pathname === '/Catalog' ? 'active' : '' }`}
                                onClick={() => navigate('/Catalog')}>Каталог</div>
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
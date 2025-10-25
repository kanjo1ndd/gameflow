import './Header.css'
import './mobileHeader.css'
import { useNavigate, useLocation} from 'react-router-dom'
import { useEffect, useState, useContext } from "react";
import { AppContext } from '../../../AppContext';

export default function Header() {
    
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
    const location = useLocation();

    const [userData, setUserData] = useState({});
    const { request, token, setToken } = useContext(AppContext);

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
                <div className='logo'><img className='logo-image' src="/logo.png" alt="Logo" /></div>
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
                <div className='burger-menu' onClick={() => setIsBurgerMenuOpen((prev) => !prev)}><img src="/mdi_menu.png" alt="Menu" /></div>

                <div className='all-right-part-head'>
                    {token == null ? <>
                        <button className='button-sign-in' onClick={() => navigate('/SignIn')}>Увійти</button>
                    </> : <>
                        <div className='right-part-head'>
                            <button  onClick={() => navigate('/Settings')}><i className='bi bi-gear'></i></button>
                            <button><i className='bi bi-bell'></i></button>
                            <div className='avatar-head' onClick={() => setIsMenuOpen((prev) => !prev)}><img className='profile-img-head' src={userData.avatarUrl && userData.avatarUrl !== 'https://localhost:7202/Admin/Image/'
                                        ? userData.avatarUrl : '/unknownUser.jpg'}/>
                            </div>
                            {isMenuOpen && (
                                <div className="avatar-menu">
                                    <ul>
                                        <li className='nickname' onClick={() => navigate('/Profile')}>{userData.userName ?? 'Nickname'}</li>
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
            </div>
            {isBurgerMenuOpen && (
                <div className='burger-menu-open'>
                    {token == null ? <>
                        </> : <>
                            <div className='mobile-right-part-head'>
                                <div className='burger-avatar-head' onClick={() => setIsMenuOpen((prev) => !prev)} ><img className='burger-profile-img-head' src={userData.avatarUrl && userData.avatarUrl !== 'https://localhost:7202/Admin/Image/'
                                            ? userData.avatarUrl : '/unknownUser.jpg'}/>
                                </div>
                                <button><i className='bi bi-bell'></i></button>
                                <button><i className='bi bi-gear' ></i></button>
                                
                                {isMenuOpen && (
                                    <div className="avatar-menu">
                                        <ul>
                                            <li className='nickname' onClick={() => navigate('/Profile')}>{userData.userName ?? 'Nickname'}</li>
                                            <li><span>Пошук користувачів</span></li>
                                            <li><span>Мої друзі</span></li>
                                            <li><span>Мої значки</span></li>
                                            <li><span>Мої скріншоти</span></li>
                                            <li><span>Моє бажане</span></li>
                                            <li><span>Мої обговорення</span></li>
                                            <li><span>Мої відео</span></li>
                                            <li><span>Мої гайди</span></li>
                                            <li><span>Мої рецензії</span></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>}
                        <div className='burger-menu-bottom'>
                        <ul className='burger-menu-list'>
                            <li className={`li ${location.pathname === '/' || location.pathname === '/Catalog' ? 'active' : ''}`} 
                                        onClick={() => navigate('/')}>
                            <button className={`burger-menu-button ${location.pathname === '/' || location.pathname === '/Catalog' ? 'active' : ''}`}>Крамниця</button> 
                            </li>
                            <li className={`li ${location.pathname === '/Support' ? 'active' : ''}`} >
                            <button className={`burger-menu-button ${location.pathname === '/Support' ? 'active' : ''}`} onClick={() => navigate('/Support')}>Бібліотека</button>
                            </li>
                            <li className={`li ${location.pathname === '/Chat' ? 'active' : ''}`} >
                            <button className={`burger-menu-button ${location.pathname === '/Chat' ? 'active' : ''}`} onClick={() => navigate('/Chat')}>Чат</button>
                            </li>
                        </ul>
                        {token == null && (
                        <button className='burger-button-sign-in' onClick={() => navigate('/SignIn')} >Увійти</button>
                        )}
                        {token != null && (
                        <button className='burger-button-sign-out' title={token} onClick={() => { setToken(null); setIsBurgerMenuOpen(prev => !prev); navigate('/'); }}>Вийти</button>
                        )}
                    </div>
                </div>
            )}

            {location.pathname !== '/SignIn' && location.pathname !== '/SignUp' && location.pathname !== '/Profile' && location.pathname !== '/Settings' && (
                <div className="head-bottom">
                    <div className='input-category'>
                        <input type="text" placeholder="Пошук у Крамниці..." className='input-header'/>
                        <img className='search' src="/mdi_search.png" alt="" />
                        <div className='catalog-news'>
                            <img  className='chevron'onClick={() => setIsSupportMenuOpen((prev) => !prev)}  src="/mdi_chevron-down.png" alt="" />
                            <div className={`pointer ${ location.pathname === '/Catalog' ? 'active' : '' }`}
                                onClick={() => navigate('/Catalog')}>Каталог</div>
                            <div className='pointer'>Новини</div>
                        </div>
                        {isSupportMenuOpen && (
                        <div className='support-menu'>
                            <div className={`home-mobile ${location.pathname === '/' || location.pathname === '/Catalog' ? 'active' : ''}`} onClick={() => navigate('/')}>Головна</div>
                            <div className={`pointer-mobile ${ location.pathname === '/Catalog' ? 'active' : '' }`}
                                onClick={() => navigate('/Catalog')}>Каталог</div>
                            <div className='pointer-mobile'>Новини</div>
                        </div>
                        )}
                    </div>
                    <button ><img className='heart' src="/mdi_heart-outline.png" alt="" /></button>
                    <button ><img className='cart' src="/mdi_cart-outline.png" alt="" /></button>
                </div>
            )}

        </div>
    </>;
}
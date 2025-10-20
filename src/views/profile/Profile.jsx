import Footer from '../main/footer/Footer';
import Header from '../main/header/Header';
import { useEffect, useState, useContext } from "react";
import { AppContext } from '../../AppContext';
import './Profile.css'

export default function Profile() {

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
        <Header />
        <div className='content-profile'>
            <div className='head-image-profile' />
            <div className='left-block-right-menu-profile'>
                <div className='left-block-profile'>
                    <div className='block-info-profile'>
                        <img className='image-profile' src={userData.avatarUrl && userData.avatarUrl !== 'https://localhost:7202/Admin/Image/'
                            ? userData.avatarUrl : '/unknownUser.jpg'}/>
                        <div className='block-username'>
                            {userData.userName ?? 'Nickname'}
                            <div className='text-online'>онлайн</div>
                        </div>
                        <button className='button-edit-profile'><i class="bi bi-pencil" /> Редагувати профіль</button>
                    </div>
                    <div className='description-profile'>
                        У пошуках нових пригод! Кожен новий рівень – це можливість пережити незабутні моменти та здобути новий досвід.
                    </div>
                    <MainPartProfile />
                </div>
                <MenuProfile />
            </div>
        </div>
        <Footer />
    </>;
}

export function MenuProfile() {

    const menuItems = [
        { id: 1, title: "Головна", count: null },
        { id: 2, title: "Значки", count: 100 },
        { id: 3, title: "Ігри", count: 100 },
        { id: 4, title: "Бажане", count: 100 },
        { id: 5, title: "Обговорення", count: 100 },
        { id: 6, title: "Скріншоти", count: 100 },
        { id: 7, title: "Відео", count: 100 },
        { id: 8, title: "Гайди", count: 100 },
        { id: 9, title: "Рецензії", count: 100 },
    ];

    const [activeId, setActiveId] = useState(1);

    const friends = [1, 2];

    return <>
        <div>
            <div className='right-menu-block'>
                <div className='level-profile'>Рівень
                    <svg class="hex" viewBox="0 0 100 100">
                        <polygon points="50,3 97,27 97,73 50,97 3,73 3,27"
                            fill="none"
                            stroke="rgba(111, 151, 255, 1)"
                            stroke-width="3" />
                        <text x="50" y="65" font-size="40" text-anchor="middle" fill="#ffffffff" font-weight="bold">99</text>
                    </svg>
                </div>
                <div className="profile-menu">
                    {menuItems.map((item) => (
                        <div key={item.id} className={`menu-item ${item.id === activeId ? "active" : ""}`}
                            onClick={() => setActiveId(item.id)}>
                            <span className="menu-title">{item.title}</span>
                            {item.count !== null && <span className="menu-badge">{item.count}</span>}
                        </div>
                    ))}
                </div>
            </div>
            <div className='right-menu-block-friends'>
                <div className='menu-item'>
                    <span className="menu-title">Друзі</span>
                    <span className="menu-badge">10</span>
                </div>
                {friends.map((_, index) => (
                    <div className='block-profile-friend' key={index}>
                        <div className='avatar-nickname-friend'>
                            <div className='image-profile-friend'></div>
                            Nickname
                        </div>
                        <svg className="hex-friend" viewBox="0 0 100 100">
                            <polygon points="50,3 97,27 97,73 50,97 3,73 3,27"
                                fill="none"
                                stroke="rgba(255, 189, 111, 1)"
                                strokeWidth="6" />
                            <text x="50" y="65" fontSize="40" textAnchor="middle" fill="#ffffffff" fontWeight="bold">99</text>
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export function MainPartProfile() {
    return <>
        <div className='block-icons'>
            <div className='title-block'>Галерея значків</div>
            <div className='block-for-icons-count'>
                <div className='block-count-icons'>
                    <div className='count-icons'>5</div>
                    Значків
                </div>
                <div className='block-for-icons'>
                    <div className='image-icon' />
                    <div className='image-icon' />
                    <div className='image-icon' />
                    <div className='image-icon' />
                    <div className='image-icon' />
                </div>
            </div>
        </div>
    </>
}
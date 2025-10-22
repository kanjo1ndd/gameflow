import Footer from '../main/footer/Footer';
import Header from '../main/header/Header';
import { useEffect, useState, useContext } from "react";
import { AppContext } from '../../AppContext';
import './Profile.css'
import { AllButtonComments } from '../buttonComments/ButtonComments';

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

    const items = [
        { count: 1234, label: 'Ігор' },
        { count: 121, label: 'DLC' },
        { count: 2564, label: 'Бажаних' }
    ];

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

        <div className='block-icons'>
            <div className='title-block'>Колекція ігор</div>
            <div className='block-for-count-games'>
                {items.map((item, index) => (
                    <div className='block-count-icons' key={index}>
                        <div className='count-icons'>{item.count}</div>
                        {item.label}
                    </div>
                ))}
            </div>
            <div className='block-for-image-games'>
                <div className='image-game'/>
                <div className='image-game'/>
                <div className='image-game'/>
                <div className='image-game'/>
            </div>
        </div>

        <div className='block-icons'>
            <div className='title-block'>Галерея обговорень</div>
            <div className='block-for-all-discussions'>
                <div className='block-main-discussions'>
                    <HeadInBlocks />
                    <div className='title-discussions'>Title</div>
                    <div className='text-discussions'>
                        Я грав у Nuka world dlc, коли потрапив у дитяче королівство, все було добре, поки я не потрапив до Освальда в кінотеатрі, усе було добре, поки я не помер, це спричинило початок квестів Освальда, і я завершив розважальний будинок, але коли я повернувся в theater «Катсцена» Освальда знову почалася, і тепер я не можу вбити його чи почати квест знову. чи варто мені просто перезавантажувати попереднє збереження та почати все спочатку?
                    </div>
                    <div className='image-discussion' />
                    <AllButtonComments />
                </div>
                <div className='block-discussions'>
                    <HeadInBlocks />
                    <div className='title-discussions'>Title</div>
                    <div className='text-discussions'>
                        Який з них вам більше сподобався? Яка гра на вашу думку краща?
                    </div>
                    <AllButtonComments />
                </div>
                <div className='block-next-discussions'>+ 5</div>
            </div>
        </div>

        <div className='block-icons'>
            <div className='title-block'>Галерея скріншотів</div>
            <div className='block-for-image-screenshots'>
                <div className='main-image-screenshot' />
                <div className='image-screenshot' />
                <div className='image-screenshot' />
                <div className='last-image-screenshot'>+ 5</div>
            </div>
        </div>

        <div className='block-icons'>
            <div className='title-block'>Галерея відео</div>
            <div className='block-for-image-screenshots'>
                <div className='main-image-screenshot' />
                <div className='image-screenshot' />
                <div className='image-screenshot' />
                <div className='last-image-screenshot'>+ 5</div>
            </div>
        </div>

        <div className='block-icons'>
            <div className='title-block'>Галерея рецензій</div>
            <div className='block-for-all-discussions'>
                <div className='block-main-comment'>
                    <div className='image-comment' />
                    <div className='title-comment'>Title <i className="bi bi-three-dots" /></div>
                    <RatingStarsProfile />
                    <div className='description-comment'>
                        Посланий шукати зниклого мільярдера на віддаленому острові, ви опинитеся в пеклі, заповненому канібалами. Створюйте, будуйте та боріться за виживання, поодинці чи з друзями, у цьому жахливому новому симуляторі виживання у відкритому світі.
                    </div>
                    <div className='comments-date-reaction'>
                        <AllButtonComments />
                        <div className='date-comments'>21.02.2023</div>
                    </div>
                </div>
                <div className='block-comment'>
                    <div className='image-comment' />
                    <div className='title-comment'>Title <i className="bi bi-three-dots" /></div>
                    <RatingStarsProfile />
                    <div className='description-comment'>
                        Приміряйте на себе роль вбивці чудовищ і відправляйтесь у шлях: від ролевих приєднань до карткових боїв. Оставте свій слід у світі «Ведьмака».
                    </div>
                    <div className='comments-date-reaction'>
                        <AllButtonComments />
                        <div className='date-comments'>21.02.2023</div>
                    </div>
                </div>
                <div className='block-next-discussions'>+ 5</div>
            </div>
        </div>

        <div className='block-icons'>
            <div className='title-block'>Галерея гайдів</div>
            <div className='block-for-all-discussions'>
                <div className='block-main-discussions'>
                    <HeadInBlocks />
                    <div className='block-guide'>
                        <div className='image-guide' />
                        <div className='title-description-guide'>
                            <div className='title-discussions'>Title</div>
                            <div className='description-guide'>
                                У цьому посібнику я покажу, як отримати повний набір силової броні X-01, це досить легко, і це найміцніша силова броня в грі.
                            </div>
                        </div>
                    </div>
                    <AllButtonComments />
                </div>
                <div className='block-discussions'>
                    <HeadInBlocks />
                    <div className='block-guide'>
                        <div className='image-guide' />
                        <div className='next-title-description-guide'>
                            <div className='title-discussions'>Title</div>
                            <div className='description-guide'>
                                Це посібник для початківців Requiem, як я, щоб спростити вибір збірки.
                            </div>
                        </div>
                    </div>
                    <AllButtonComments />
                </div>
                <div className='block-next-discussions'>+ 5</div>
            </div>
        </div>
    </>
}

export function HeadInBlocks() {
    return <>
        <div className='block-name-date-game'>
            <div className='name-date-game'>
                <div className='name-avatar-game'><div className='image-avatar-game' />Game123</div>
                <div className='date-game'>25.02.2024</div>
            </div>
            <div>
                <i className="bi bi-three-dots" />
            </div>
        </div>
    </>
}

export function RatingStarsProfile({ rating = 5 }) {
    return (
        <div className="rating-block-profile">
            <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                    <i
                        key={i}
                        className={`bi bi-star-fill ${i < Math.round(rating) ? "active" : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}
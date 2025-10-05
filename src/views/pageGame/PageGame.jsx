import Footer from "../main/footer/Footer";
import Header from "../main/header/Header";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './PageGame.css'
import '../filters/Filters.css'

export default function PageGame() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Спочатку популярні");

    const sortOptions = [
        "Спочатку популярні",
        "Спочатку нові",
        "За оцінкою",
        "За кількістю коментарів",
        "Спочатку позитивні",
        "Спочатку негативні",
    ];

    const handleSelect = (option) => {
        setSelectedSort(option);
        setIsMenuOpen(false);
    };

    return <>
        <Header />
        <div className="content-page-game">
            <HeaderPageGame />
            <div className="left-block-right-menu">
                <div className="left-block-game-page">
                    <div className="name-game-page">Name</div>
                    <div className="main-image-page-game" />
                    <div className="showcase-game-page">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="showcase-image-game-page" />
                        ))}
                    </div>
                    <div className="category-game-page">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="text-category-game-page">
                            рпг
                            </div>
                        ))}
                        <div className="text-category-game-page">
                            <i className="bi bi-chevron-down" />
                        </div>
                    </div>
                    <div className="pre-description">
                        Cyberpunk 2077 — пригодницький бойовик і рольова гра з відкритим світом. Дія відбувається у темному майбутньому Найт-Сіті, небезпечного мегаполіса, одержимого владою, гламуром і ненаситною модифікацією тіла.
                    </div>
                    <div className="chevron-down">
                        <i className="bi bi-chevron-down"/>
                    </div>
                    <div className="name-game-page">Комплекти</div>
                    <div className="set-game-page">
                        <div className="name-set-game-page">Name game</div>
                        <div className="block-set-game-page">
                            Cyberpunk 2077 — пригодницький рольовий екшн у відкритому світі мегаполісу Найт-Сіті, де у ролі кіберпанкового найманця ви боротиметеся за виживання. Гра вдосконалена і має новий безкоштовний вміст. Налаштуйте персонажа й ігровий стиль, виконуючи завдання, нарощуючи репутацію і відкриваючи апгрейди. Будуючи взаємини і здійснюючи вибір, ви формуєте сюжет і світ навколо. Тут народжуються легенди. Якою буде ваша?                  
                            <div className="contents-text">Вміст:</div>
                            <nav className="contents-set-game-page">
                                <li>Cyperpunk</li>
                                <li>Something</li>
                                <li>Something</li>
                                <li>Something</li>
                            </nav>
                        </div>
                        <div className="price-button-game-page">
                            <div className="price-game-page">9 999₴</div>
                            <button className="button-basket">У кошик</button>
                        </div>
                    </div>
                    <div className="set-game-page">
                        <div className="name-set-game-page">Name game</div>
                        <div className="block-set-game-page">
                            <div className="contents-text">Вміст:</div>
                            <nav className="contents-set-game-page">
                                <li>Cyperpunk</li>
                                <li>Something</li>
                            </nav>
                        </div>
                        <div className="price-button-game-page">
                            <div className="price-game-page">9 999₴</div>
                            <button className="button-basket">У кошик</button>
                        </div>
                    </div>
                    <div className="button-name-game-page"><div className="name-game-pages">Інші DLC</div> <div className="text-dls">Усі DLC 
                        <i className="bi bi-chevron-right"></i></div>
                    </div>
                    <div className="dlc-set-game-page">
                        <div className="block-dlc-game-page">
                            <div>Cyberpunk 2077 Bonus Content</div> <div>9 999₴</div>
                        </div>
                        <div className="block-dlc-game-page">
                            <div>Cyberpunk 2077 REDmod</div> <div>9 999₴</div>
                        </div>
                        <div className="block-dlc-game-page">
                            <div>Cyberpunk 2077: Ілюзія свободи</div> <div>9 999₴</div>
                        </div>
                        <div className="price-button-game-page">
                            <div className="price-game-page">9 999₴</div>
                            <button className="button-basket">Додати в кошик усі DLC</button>
                        </div>
                    </div>
                    <div className="button-name-game-page"><div className="name-game-pages">Рецензії</div> <button className="button-comment">Написати рецензію</button></div>
                    <div className="block-sort-game-page">
                        <div className='sorting-text'> Сортування:
                            <div className={`list-sorting-text ${isMenuOpen ? "active" : ""}`}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}> {selectedSort} <i className="bi bi-chevron-down" /></div>
                        </div>

                        {isMenuOpen && (
                        <div className="sorting-menu">
                            {sortOptions.map((option) => (
                                <div
                                    key={option}
                                    className={`sorting-option ${
                                    option === selectedSort ? "active" : ""
                                    }`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                        )}

                    </div>
                    <div className="block-comments">
                        <div></div>
                    </div>
                </div>
                <MenuGamePage />
            </div>
        </div>
        <Footer />
    </>;
}

export function HeaderPageGame() {

    const location = useLocation();
    const navigate = useNavigate();

    return <>
        <div className="header-block-game">
            <div 
                className={`text-block-game ${location.pathname === "/Game" ? "active" : ""}`}
                onClick={() => navigate("/Game")}>
                    Про гру
            </div>
            <div 
                className={`text-block-game ${location.pathname === "/Game/Characteristics" ? "active" : ""}`}
                onClick={() => navigate("/Game/Characteristics")}>
                    Характеристики
            </div>
            <div className="text-block-game">Спільнота</div>
        </div>
    </>
}

export function MenuGamePage() {
    return <>
        <div className="block-menu-game-page">
            <div className="rating-game-menu">5.0 <RatingStars /></div>
            <div className="right-image-game-menu" />
            <div className="price-game-menu">1 099₴</div>
            <button className="button-buy-game-menu">Купити</button>
            <div className="buttons-game-menu">
                <button className="button-add-cart-game-menu">Додати у кошик</button>
                <button className="button-favorites-game-menu"><i className='bi bi-suit-heart' /></button>
            </div>
            <div className="block-repost-report">
                <div className="repost-game-menu"><i className="bi bi-upload" />Репост</div>
                <div className="report-game-menu"><i className="bi bi-exclamation-square" />Поскаржитись</div>
            </div>
            <div className="block-info-game-menu">
                <div className="info-game-menu">Дата виходу<div className="text-info-game-menu">10.12.2020</div></div>
                <div className="info-game-menu">Розробник<div className="text-info-game-menu">CD PROJEKT RED</div></div>
                <div className="info-game-menu">Видавець<div className="text-info-game-menu">Zubarik Inc</div></div>
                <div className="info-game-menu">Платформи<div><i className="bi bi-windows" /> <i className="bi bi-apple" /></div></div>
            </div>
            <div className="block-want-this-game">
                <div className="text-number-friends">Друзів бажають цю гру:<div className="number-friends">3</div></div>
                <div className="block-with-friends">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="block-friend"><div className="image-friend"/>Nick</div>
                    ))}
                </div>
            </div>
            <div className="block-want-this-game">
                <div className="text-number-friends">Друзів мають цю гру:<div className="number-friends">5</div></div>
                <div className="block-with-friends">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="block-friend"><div className="image-friend"/>Nick</div>
                    ))}
                </div>
            </div>
        </div>
    </>;
}

export function RatingStars({ rating = 5 }) {
    return (
        <div className="rating-block">
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
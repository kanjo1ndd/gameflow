import Footer from "../main/footer/Footer";
import Header from "../main/header/Header";
import './PageGame.css'

export default function PageGame() {
    return <>
        <Header />
        <div className="content-page-game">
            <HeaderPageGame />
            <div>
                <div className="name-game-page">Name</div>
                <div className="main-image-page-game" />
                <div className="showcase-game-page">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="showcase-image-game-page" />
                    ))}
                </div>
                <div className="category-game-page">
                    <div className="text-category-game-page">
                        екшн
                    </div>
                    <div className="text-category-game-page">
                        рпг
                    </div>
                    <div className="text-category-game-page">
                        <i className="bi bi-chevron-down"/>
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
                <div className="name-game-page">Інші DLC</div>
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
            </div>
            <div>
                <div />
            </div>
        </div>
        <Footer />
    </>;
}

export function HeaderPageGame() {
    return <>
        <div className="header-block-game">
            <div className="text-block-game">Про гру</div>
            <div className="text-block-game">Характеристики</div>
            <div className="text-block-game">Спільнота</div>
        </div>
    </>;
}
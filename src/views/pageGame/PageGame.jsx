import Footer from "../main/footer/Footer";
import Header from "../main/header/Header";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../AppContext";
import './PageGame.css'
import '../main/content/Content.css'
import '../filters/Filters.css'
import './CarouselGame.jsx'
import './CarouselGame.css'
import './mobilePageGame.css'
import { GameActive } from "./CarouselGame.jsx";


export default function PageGame() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const { request } = useContext(AppContext);

    useEffect (() => {
        request("/api/shop/product/" + id)
        .then(data => setProduct(data))
        .catch(j => console.error(j));
    }, [id]);

    if (!product) return <div>Loading...</div>;

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
                    <div className="name-game-page">{product.name}</div>
                    <GameActive Gameimages={product.imagesCsv ? product.imagesCsv.split(',').map((url) => (
                        <img className="main-image-page-game" src={url} alt={product.name} />
                    )) : []} lenImg={product.imagesCsv ? product.imagesCsv.split(',').length : 0} />
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
                        {product.description}
                    </div>
                    <div className="chevron-down">
                        <i className="bi bi-chevron-down"/>
                    </div>
                    <div className="name-game-page">Комплекти</div>
                    <div className="set-game-page">
                        <div className="name-set-game-page">{product.name}</div>
                        <div className="block-set-game-page">
                            {product.description}                 
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
                        <div className="name-set-game-page">{product.name}</div>
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
                <MenuGamePage product={product} />
            </div>
        </div>
        <Footer />
    </>;
}

export function HeaderPageGame() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return <>
        <div className="header-block-game">
            <div 
                className={`text-block-game ${location.pathname === `/Game/${id}` ? "active" : ""}`}
                onClick={() => navigate(`/Game/${id}`)}>
                    Про гру
            </div>
            <div 
                className={`text-block-game ${location.pathname === `/Game/${id}/Characteristics` ? "active" : ""}`}
                onClick={() => navigate(`/Game/${id}/Characteristics`)}>
                    Характеристики
            </div>
            <div className="text-block-game">Спільнота</div>
        </div>
    </>
}

export function MenuGamePage({ product }) {

    const [isFavorite, setIsFavorite] = useState(false);

    const hasDiscount = product.action && product.action.amount > 0;

    const discountedPrice = hasDiscount
        ? Math.round(product.price - (product.price * product.action.amount) / 100)
        : product.price;

    return <>
        <div className="block-menu-game-page">
            <div className="rating-game-menu">5.0 <RatingStars /></div>
            <div className="right-image-game-menu" />
            <div className="price-game-menu">
                {product.price !== "-" && (
                    hasDiscount ? (
                        <>
                        <div className='discount-game-menu'>-{product.action.amount}%</div>
                        <div>{discountedPrice}₴</div>
                        <div className="old-price-discount">{product.price}₴</div>
                        </>
                    ) : (
                        <span>{product.price}₴</span>
                    )
                )}
            </div>
            <button className="button-buy-game-menu">Купити</button>
            <div className="buttons-game-menu">
                <button className="button-add-cart-game-menu">Додати у кошик</button>
                <button className="button-favorites-game-menu"
                    onClick={() => setIsFavorite(prev => !prev)}>
                    <i className={isFavorite ? "bi bi-suit-heart-fill" : "bi bi-suit-heart"}
                        style={{ color: isFavorite ? "#ee73b0fd" : "#fff", transition: "color 0.3s" }} />
                </button>
            </div>
            <div className="block-repost-report">
                <div className="repost-game-menu"><i className="bi bi-upload" />Репост</div>
                <div className="report-game-menu"><i className="bi bi-exclamation-square" />Поскаржитись</div>
            </div>
            <div className="block-info-game-menu">
                <div className="info-game-menu">Дата виходу<div className="text-info-game-menu">{product.releaseDate?.slice(0, 10)}</div></div>
                <div className="info-game-menu">Розробник<div className="text-info-game-menu">{product.developer}</div></div>
                <div className="info-game-menu">Видавець<div className="text-info-game-menu">{product.publisher}</div></div>
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
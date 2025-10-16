import './Content.css'
import './mobileContent.css'
import Carousel, { CarouselVertical } from './Carousel';
import BannerCarousel, { BannerActive } from './BannerCarousel';
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Content() {

    const [products, setProduct] = useState([]);
    const { request } = useContext(AppContext);

    useEffect (() => {
        request("/api/shop/topRatedProducts")
        .then(data => setProduct(data))
        .catch(j => console.error(j));
    }, []);

    return <>
        <div className='content'>
            <MainBanner />
            <div className='title-category-special-offers'>Особливі пропозиції <i className="bi bi-chevron-right right" /></div>
            <SpecialOffers products={products} />
            <div className='title-category'>Рекомендовані вам <i className="bi bi-chevron-right" /></div>
            <Recommended />
            <div className='title-category'>До 100₴ <i className="bi bi-chevron-right" /></div>
            <Recommended />
            <BlockListGames />
        </div>
    </>;
}

export function MainBanner() {
    
    const Sllen = 9;
    const Imglen = 10;

    const Slides = Array.from({ length: Sllen }).map((_, index) => {
        return (
            <>
            <div key={index} className='main-image'>
                <div className='image-in-main-banner'  >
                    <BannerActive images={Array.from({ length: Imglen }).map((_, i) => ``)} lenImg={Imglen} />
                </div>
                <div className='block-price-name'>
                    <div className='title-mobile'>Avatar: Frontiers of Pandora</div> 
                    <div className='block-price'>
                        <div className='block-discount-price'>
                            <div className='discount'>-40%</div> <div className='price'>911₴</div> <div className='old-price'>1519₴</div>
                        </div>
                        <div className='time-discount'>Знижка діє до 24.06.2024 10:00</div>
                    </div>
                    <div className='block-name'>
                        <div className='title'>Avatar: Frontiers of Pandora</div> 
                            
                        <div className='description'>Avatar: Frontiers of Pandora™ — це пригодницька гра від першої особи, 
                            де події розгортаються на західному кордоні. </div>
                    </div>
                </div>
                
            </div>
            </>
        );
    });
        return (
        <div className='banner'>
            <BannerCarousel game={Slides} len={Sllen}  />
        </div>
    );
}

export function SpecialOffers({ products }) {
    
    const navigate = useNavigate();

    const hasProducts = Array.isArray(products) && products.length > 0;
    const fallbackCount = 5;

    const displayedItems = hasProducts
        ? products
        : Array.from({ length: fallbackCount }).map((_, i) => ({
            id: i,
            name: "Нет данных",
            price: "990",
            imagesCsv: null,
            action: null,
        }));

    const Sllen = displayedItems.length;

    const Slides = Array.from({ length: Sllen }).map((_, index) => {
        const NextIndex = (index + 1) % Sllen;
        const NextNextIndex = (index + 2) % Sllen;

        return (
        <>
            {[index, NextIndex, NextNextIndex].map((i) => {
                const product = displayedItems[i];

                const hasDiscount = product.action && product.action.amount > 0;
                const discountedPrice = hasDiscount
                    ? Math.round(product.price - (product.price * product.action.amount) / 100)
                    : product.price;

                return (
                    <div key={i} className="block-in-special-offers"
                        onClick={ hasProducts ? () => navigate(`/Game/${product.id}`) : undefined }>
                    {product.imagesCsv ? (
                        <img className="image-special-offers" src={product.imagesCsv} alt={product.name}/>
                    ) : (
                        <div className="image-special-offers placeholder" />
                    )}
                        <div className="name-game">{product.name}</div>
                        <div className="price-game">
                            {product.price !== "-" && (
                            hasDiscount ? (
                                <>
                                <div className='discount-game'>-{product.action.amount}%</div>
                                <div>{discountedPrice}₴</div>
                                <div className="old-price-discount">{product.price}₴</div>
                                </>
                            ) : (
                                <span>{product.price}₴</span>
                            )
                            )}
                        </div>
                    </div>
                );
            })}
        </>
        );
    });

    return (
        <div className='special-offers'>
            <Carousel game={Slides} len={Sllen} />
        </div>
    );
}

export function Recommended() {
    const Rlen = 10;

    
    const RSlides = Array.from({ length: Rlen }).map((_, index) => {

        let NextIndex= (index >= Rlen - 1) ? 0 : (index + 1);
        let Next2Index= (NextIndex >= Rlen - 1) ? 0 :( NextIndex + 1);
        let Next3Index= (Next2Index >= Rlen - 1) ? 0 :( Next2Index + 1);
        return (
            <>
                <div key={index} className='block-in-recommended'>
                    <div className='image-recommended'style={index%2===0 ? { backgroundColor: 'pink' } : { backgroundColor: 'brown' }} />
                    <div className='name-game'>Name</div>
                    <div className='price-game'>9999₴</div>
                </div>
                <div key={NextIndex} className='block-in-recommended'>
                    <div className='image-recommended'style={NextIndex%2===0 ? { backgroundColor: 'pink' } : { backgroundColor: 'brown' }} />
                    <div className='name-game'>Name</div>
                    <div className='price-game'>9999₴</div>
                </div>
                <div key={Next2Index} className='block-in-recommended'>
                    <div className='image-recommended' style={Next2Index%2===0 ? { backgroundColor: 'pink' } : { backgroundColor: 'brown' }} />
                    <div className='name-game'>Name</div>
                    <div className='price-game'>9999₴</div>
                </div>
                <div key={Next3Index} className='block-in-recommended'>
                    <div className='image-recommended' style={Next3Index%2===0 ? { backgroundColor: 'pink' } : { backgroundColor: 'brown' }} />
                    <div className='name-game'>Name</div>
                    <div className='price-game'>9999₴</div>
                </div>
            </>
        );
    });

    return <>
        <div className='recommended'>
            <Carousel game={RSlides} len={Rlen} />
        </div>
    </>;
}

export function ListGamesVertical() {
    const CatGamesLen = 13;

    const CatGamesSlides = Array.from({ length: CatGamesLen }).map((_, index) => {

        let NextIndex= (index >= CatGamesLen - 1) ? 0 : (index + 1);
        let Next2Index= (NextIndex >= CatGamesLen - 1) ? 0 :( NextIndex + 1);

        return (
            <>
                <div key={index} className='block-list-game'>
                    <div className='image-list-game' style={{ backgroundColor: (index % 2 === 0) ? 'lightred' : 'lightblue' }} />
                    <div className='name-game'>Name {index}</div>
                    <div className='price-game'>9999₴</div>
                </div>
                <div key={NextIndex} className='block-list-game'>
                    <div className='image-list-game' style={{ backgroundColor: (NextIndex % 2 === 0) ? 'pink' : 'lightblue' }} />
                    <div className='name-game'>Name {NextIndex}</div>
                    <div className='price-game'>9999₴</div>
                </div>
                <div key={Next2Index} className='block-list-game'>
                    <div className='image-list-game' style={{ backgroundColor: (Next2Index % 2 === 0) ? 'pink' : 'blue' }} />
                    <div className='name-game'>Name {Next2Index}</div>
                    <div className='price-game'>9999₴</div>
                </div>
            </>
        );
    });

    return <>
        <div className='list-games-vertical'>
            <CarouselVertical game={CatGamesSlides} len={CatGamesLen} />
        </div>
    </>;
}

export function BlockListGames() {
    const LGlen = 10;

    const Slides = Array.from({ length: LGlen }).map((_, index) => {
        let NextIndex= (index >= LGlen - 1) ? 0 : (index + 1);
        let NextNextIndex= (NextIndex >= LGlen - 1) ? 0 :( NextIndex + 1);

        return (
            <>
            <div className='block-for-hit'>
                <div key={index} className='list-game'>
                    <div className='title-list-game'>Хіти продажу {index} <i className="bi bi-chevron-right right" /></div>
                    <ListGamesVertical />
                </div>
                <div key={NextIndex} className='list-game'>
                    <div className='title-list-game' >Хіти продажу {NextIndex} <i className="bi bi-chevron-right right" /></div>
                    <ListGamesVertical />
                </div>
                <div key={NextNextIndex} className='list-game'>
                    <div className='title-list-game'>Хіти продажу {NextNextIndex} <i className="bi bi-chevron-right right" /></div>
                    <ListGamesVertical />
                </div>
            </div>
            </>
        );
    });

    return <>
        <div className='list-games'>
            <Carousel game={Slides} len={LGlen} />
        </div>
    </>;
}

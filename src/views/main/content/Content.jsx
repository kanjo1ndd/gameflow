import './Content.css'
import './mobileContent.css'
import Carousel, { CarouselVertical } from './Carousel';
import BannerCarousel, { BannerActive } from './BannerCarousel';
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContext.jsx";
import { useNavigate, useViewTransitionState } from "react-router-dom";
import { i } from 'framer-motion/client';
import { random } from 'lodash';

export default function Content() {

    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const { request } = useContext(AppContext);

    useEffect (() => {
        request("/api/shop/topRatedProducts")
        .then(data => setProduct(data))
        .catch(j => console.error(j));
    }, []);

    useEffect (() => {
        request("/api/shop/categories")
        .then(data => setCategories(data))
        .catch(j => console.error(j));
    }, []);

    return <>
        <div className='content'>
            <MainBanner products={products} />
            <div className='title-category'>Особливі пропозиції <i className="bi bi-chevron-right" /></div>
            <SpecialOffers products={products} />
            <div className='title-category'>Рекомендовані вам <i className="bi bi-chevron-right" /></div>
            <Recommended products={products} />
            <div className='title-category'>До 100₴ <i className="bi bi-chevron-right" /></div>
            <RecommendedTo products={products} />
            <BlockListGames categories={categories} products={products} />
        </div>
    </>;
}

export function MainBanner({products}) {
    const navigate = useNavigate();


    const hasProducts = Array.isArray(products) && products.length > 0;
    const fallbackCount = 5;

    const displayedItems = hasProducts
        ? products
        : Array.from({ length: fallbackCount }).map((_, i) => ({
            id: i,
            name: "Нет данных",
            price: "990",
            horisontalImages: null,
            action: null,
        }));
    
    const Sllen = displayedItems.length;

    const Slides = Array.from({ length: Sllen }).map((_, index) => {
        const product= displayedItems[index];
        const imagesUrls = product.horisontalImages ? product.horisontalImages.split(',') : [];
        const uniqueImagesUrls = Array.from(new Set(imagesUrls));
        uniqueImagesUrls[0] = product.imagesCsv;
        const lenImgUrls = uniqueImagesUrls.length;

        const hasDiscount = product.action && product.action.amount > 0;
        const discountedPrice = hasDiscount
                    ? Math.round(product.price - (product.price * product.action.amount) / 100)
                    : product.price;

        return (    
            <>
            <div key={index} className='main-image' >
                <div className='image-in-main-banner'  >
                    <BannerActive images={uniqueImagesUrls} lenImg={lenImgUrls} />
                </div>
                <div className='block-price-name'>
                    <div className='title-mobile'>{product.name}</div> 
                    <div className='block-price'onClick={ hasProducts ? () => navigate(`/Game/${product.id}`) : undefined }>
                        {product.price !== "-" && (
                            hasDiscount ? (
                                <div className='block-discount-price'>
                                    <div className='discount'>-{product.action.amount}%</div> <div className='price'>{discountedPrice}₴</div> <div className='old-price'>{product.price}₴</div>
                                </div>
                            ) : (
                                <div className='price'>{product.price}₴</div>
                            )
                        )}
                    </div>
                    <div className='block-name'onClick={ hasProducts ? () => navigate(`/Game/${product.id}`) : undefined }>
                        <div className='title'>{product.name}</div> 

                        <div className='description'>{product.description}</div>
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
            horisontalImages: null,
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
                        <img className="image-special-offers" src={product.imagesCsv}/>
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

export function Recommended({ products }) {
    const navigate = useNavigate();
    const Rlen = products && products.length ? products.length : 10;
    const hasProducts = Array.isArray(products) && products.length > 0;

    const RSlides = Array.from({ length: Rlen }).map((_, index) => {
        const NextIndex = (index + 4) % Rlen;
        const Next2Index = (index + 5) % Rlen;
        const Next3Index = (index + 6) % Rlen;
        const Next4Index = (index + 7) % Rlen;

        const indices = [NextIndex, Next2Index, Next3Index, Next4Index];

        return (
            <>
                {indices.map((i) => {
                    const product = products[i] || { name: "Нет данных", price: "9999", horisontalImages: null, action: null };

                    const hasDiscount = product.action && product.action.amount > 0;
                    const discountedPrice = hasDiscount
                        ? Math.round(product.price - (product.price * product.action.amount) / 100)
                        : product.price;

                    return (
                        <div key={i} className='block-in-recommended'
                            onClick={ hasProducts ? () => navigate(`/Game/${product.id}`) : undefined }>
                            {product.verticalImages ? (
                                <img className="image-recommended" src={product.verticalImages} />
                            ) : (
                                <div className="image-recommended placeholder" />
                            )}
                            <div className='name-game'>{product.name}</div>
                            <div className='price-game'>
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
        <div className='recommended'>
            <Carousel game={RSlides} len={Rlen} />
        </div>
    );
}

export function RecommendedTo({ products }) {
    const navigate = useNavigate();
    const Rlen = products && products.length ? products.length : 10;
    const hasProducts = Array.isArray(products) && products.length > 0;

    
     const RSlides = Array.from({ length: Rlen }).map((_, index) => {
        const NextIndex = (index + 2) % Rlen;
        const Next2Index = (index + 3) % Rlen;
        const Next3Index = (index + 4) % Rlen;
        const Next4Index = (index + 5) % Rlen;

        const indices = [NextIndex, Next2Index, Next3Index, Next4Index];

        return (
            <>
                {indices.map((i) => {
                    const product = products[i] || { name: "Нет данных", price: "9999", horisontalImages: null, action: null };

                    const hasDiscount = product.action && product.action.amount > 0;
                    const discountedPrice = hasDiscount
                        ? Math.round(product.price - (product.price * product.action.amount) / 100)
                        : product.price;

                    return (
                        <div key={i} className='block-in-recommended-to'
                            onClick={ hasProducts ? () => navigate(`/Game/${product.id}`) : undefined }>
                            {product.verticalImages ? (
                                <img className="image-recommended" src={product.verticalImages} />
                            ) : (
                                <div className="image-recommended placeholder" />
                            )}
                            <div className='name-game'>{product.name}</div>
                            <div className='price-game'>
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

    return <>
        <div className='recommended-to'>
            <Carousel game={RSlides} len={Rlen} />
        </div>
    </>;
}

export function ListGamesVertical({ products}) {
   const navigate = useNavigate();

    const hasProducts = Array.isArray(products) && products.length > 0;
    const fallbackCount = 5;

    const displayedItems = hasProducts
        ?  products
        : Array.from({ length: fallbackCount }).map((_, i) => ({
            id: i,
            name: "Нет данных",
            price: "990",
            horisontalImages: null,
            action: null,
        }));

    const CatGamesLen = displayedItems.length;
    const ceng=0;
    const CatGamesSlides = Array.from({ length: CatGamesLen }).map((_, index) => {
        const StartIndex=index+ceng;
        const NextIndex = (StartIndex + 1) % CatGamesLen;
        const NextNextIndex = (StartIndex + 2) % CatGamesLen;

            return (
            <>
                {[StartIndex, NextIndex, NextNextIndex].map((i) => {
                    const product = displayedItems[i];

                    const hasDiscount = product.action && product.action.amount > 0;
                    const discountedPrice = hasDiscount
                        ? Math.round(product.price - (product.price * product.action.amount) / 100)
                        : product.price;

                    return (
                        <div key={i} className="block-list-game"
                            onClick={ hasProducts ? () => navigate(`/Game/${product.id}`) : undefined }>
                        {product.horisontalImages ? (
                            <img className="image-list-game" src={product.imagesCsv}/>
                        ) : (
                            <div className="image-list-game placeholder" />
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

    return <>
        <div className='list-games-vertical'>
            <CarouselVertical game={CatGamesSlides} len={CatGamesLen} />
        </div>
    </>;
}

export function BlockListGames({ categories, products }) {
    const hasCategories = Array.isArray(categories) && categories.length > 0;
    const fallbackCount = 7;

    const displayedItems = hasCategories
        ? categories
        : Array.from({ length: fallbackCount }).map((_, i) => ({
            id: i,
            name: `Хіти продажів  ${i + 1}`,
            price: "990",
            imagesCsv: null,
            action: null,
        }));

    const LGlen = displayedItems.length;

   const Slides = Array.from({ length: LGlen }).map((_, index) => {
        const NextIndex = (index + 1) % LGlen;
        const NextNextIndex = (index + 2) % LGlen;

        return (
            <>
            {[index, NextIndex, NextNextIndex].map((i) => {
                const category = displayedItems[i];


                return (
                    <div key={i} className='block-for-hit'>
                        <div className='list-game'>
                            <div className='title-list-game'>{category?.name} <i className="bi bi-chevron-right right" /></div>
                            <ListGamesVertical products={products}  />
                        </div>
                    </div>
                );
            })}
            </>
        );
    });

    return <>
        <div className='list-games'>
            <Carousel game={Slides} len={LGlen} />
        </div>
    </>;
}

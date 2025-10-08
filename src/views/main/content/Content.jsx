import './Content.css'
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContext.jsx";

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
            <div className='main-image'>
                <div className='chevron-left-block'>
                    <div className='chevron-left'><i className="bi bi-chevron-left" /></div>
                </div>
                <div className='block-price-name'>
                    <div className='block-price'>
                        <div className='block-discount-price'>
                            <div className='discount'>-40%</div> <div className='price'>911₴</div> <div className='old-price'>1519₴</div>
                        </div>
                        <div className='time-discount'>Знижка діє до 24.06.2024 10:00</div>
                    </div>
                    <div className='block-name'>
                        <div className='title'>Avatar: Frontiers of Pandora</div> 
                        
                        <div className='description'>Avatar: Frontiers of Pandora™ — це пригодницька гра від першої особи, 
                            де події розгортаються на західному кордоні. </div>
                    </div>
                </div>
                <div className='chevron-right-block'>
                    <div className='chevron-right'><i className="bi bi-chevron-right" /></div>
                </div>
            </div>
            <div className='showcase-images'>
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="image-in-showcase" />
                ))}
            </div>
            <div className='title-category'>Особливі пропозиції <i className="bi bi-chevron-right right" /></div>
            <SpecialOffers products={products}/>
            <div className='title-category'>Рекомендовані вам <i className="bi bi-chevron-right" /></div>
            <Recommended />
            <div className='title-category'>До 100₴ <i className="bi bi-chevron-right" /></div>
            <Recommended />
            <div className='lists-games'>
                <ListGames />
                <ListGames />
                <ListGames />
            </div>
        </div>
    </>;
}

export function SpecialOffers({ products }) {
    return <>
        <div className='special-offers'>
            <div className='chevron-left-special-block'>
                <div className='chevron-left-special'><i className="bi bi-chevron-left" /></div>
            </div>
            {products.map((product, i) => (
                <div key={i} className='block-in-special-offers'>
                    <img className='image-special-offers' src={product.imagesCsv}/>
                    <div className='name-game'>{product.name}</div>
                    <div className='price-game'>{product.price}₴</div>
                </div>
            ))}
            <div className='chevron-right-special-block'>
                <div className='chevron-right-special'><i className="bi bi-chevron-right" /></div>
            </div>
        </div>
    </>;
}

export function Recommended() {
    return <>
        <div className='special-offers'>
            <div className='chevron-left-recommended-block'>
                <div className='chevron-left-special'><i className="bi bi-chevron-left" /></div>
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='block-in-recommended'>
                    <div className='image-recommended' />
                    <div className='name-game'>Name</div>
                    <div className='price-game'>9999₴</div>
                </div>
            ))}
            <div className='chevron-right-recommended-block'>
                <div className='chevron-right-special'><i className="bi bi-chevron-right" /></div>
            </div>
        </div>
    </>;
}

export function ListGames() {
    return <>
        <div className='list-game'>
            <div className='title-list-game'>Хіти продажу <i className="bi bi-chevron-right right" /></div>
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className='block-in-special-offers'>
                    <div className='image-special-offers' />
                    <div className='name-game'>Name</div>
                    <div className='price-game'>9999₴</div>
                </div>
            ))}
        </div>
    </>;
}
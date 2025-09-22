import './Content.css'

export default function Content() {
    return <>
        <div className='content'>
            <div className='main-image'>
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
            </div>
            <div className='showcase-images'>
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="image-in-showcase" />
                ))}
            </div>
            <div className='title-category'>Особливі пропозиції <i className="bi bi-chevron-right" /></div>
            <SpecialOffers />
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

export function SpecialOffers() {
    return <>
        <div className='special-offers'>
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

export function Recommended() {
    return <>
        <div className='special-offers'>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='block-in-recommended'>
                    <div className='image-recommended' />
                    <div className='name-game'>Name</div>
                    <div className='price-game'>9999₴</div>
                </div>
            ))}
        </div>
    </>;
}

export function ListGames() {
    return <>
        <div className='list-game'>
            <div className='title-list-game'>Хіти продажу <i className="bi bi-chevron-right" /></div>
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
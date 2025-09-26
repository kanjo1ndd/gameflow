import './Filters.css'

export default function Filter() {
    return <>
        <div className='filter-block'>
            <div className='filter-text'>Фільтри <div className='text-reset'>Скинути</div></div>
            <input className='search-tags' placeholder='Пошук тегів' />
            <div className='filter-genre'>
                
            </div>
        </div>
    </>;
}

export function Sorting() {
    return <>
        <div className='sorting-block'>
            <div className='sorting-text'> Сортування:
                <div>

                </div>
            </div>
            <div className='sorting-text'> Вид:
                <div>

                </div>
            </div>
        </div>
    </>;
}
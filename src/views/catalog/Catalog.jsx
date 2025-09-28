import Filter, { Sorting } from '../filters/Filters';
import Footer from '../main/footer/Footer';
import Header from '../main/header/Header';
import { useState } from "react";
import './Catalog.css'
import '../main/content/Content.css'

export default function Catalog() {

    const [viewMode, setViewMode] = useState("row");

    return <>
        <Header />
        <div className='content-catalog'>
            <div className='content-catalog-block'>
                <Sorting viewMode={viewMode} setViewMode={setViewMode}/>
                <div className='block-filter-view'>
                    <div>
                        <Filter />
                    </div>
                    {viewMode === "row" ? <ViewColumn /> : <ViewRow />}
                </div>
            </div>
        </div>
        <Footer />
    </>;
}

export function ViewRow() {
    return <>
        <div className='block-views-row'>
            {Array(9).fill(null).map((_, index) => (
                <BlockViewRow key={index} />
            ))}
        </div>
    </>;
}

export function BlockViewRow() {
    return <>
        <div className='block-view-row'>
            <div className='image-block-view-row' />
            <div className='name-game'>Name</div>
            <div className='price-game'>9999₴</div>
        </div>
    </>;
}

export function ViewColumn() {
    return <>
        <div className='block-views-column'>
            {Array(16).fill(null).map((_, index) => (
                <BlockViewColumn key={index} />
            ))}
        </div>
    </>;
}

export function BlockViewColumn() {
    return <>
        <div className='block-view-column'>
            <div className='image-block-view-column' />
            <div className='name-price-view-column'>Name <div>999₴</div></div>
        </div>
    </>;
}
import Filter, { Sorting } from '../filters/Filters';
import Footer from '../main/footer/Footer';
import Header from '../main/header/Header';
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../AppContext';
import { useNavigate } from "react-router-dom";
import './Catalog.css'
import '../main/content/Content.css'

export default function Catalog() {

    const [viewMode, setViewMode] = useState("row");

    const [products, setProduct] = useState([]);
    const { request } = useContext(AppContext);

    useEffect (() => {
        request("/api/shop/allProducts")
        .then(data => setProduct(data))
        .catch(j => console.error(j));
    }, []);

    return <>
        <Header />
        <div className='content-catalog'>
            <div className='content-catalog-block'>
                <Sorting viewMode={viewMode} setViewMode={setViewMode}/>
                <div className='block-filter-view'>
                    <div>
                        <Filter />
                    </div>
                    {viewMode === "row" ? <ViewColumn products={products} /> : <ViewRow products={products} />}
                </div>
            </div>
        </div>
        <Footer />
    </>;
}

export function ViewRow({ products }) {
    return <>
        <div className='block-views-row'>
            {products.map((product, index) => (
                <BlockViewRow key={index} product={product} />
            ))}
        </div>
    </>;
}

export function BlockViewRow({ product }) {

    const navigate = useNavigate();

    return <>
        <div className='block-view-row' onClick={() => navigate(`/Game/${product.id}`)}>
            <img className='image-block-view-row' src={product.imagesCsv} />
            <div className='name-game'>{product.name}</div>
            <div className='price-game'>{product.price}₴</div>
        </div>
    </>;
}

export function ViewColumn({ products }) {
    return <>
        <div className='block-views-column'>
            {products.map((product, index) => (
                <BlockViewColumn key={index} product={product} />
            ))}
        </div>
    </>;
}

export function BlockViewColumn({ product }) {

    const navigate = useNavigate();

    return <>
        <div className='block-view-column' onClick={() => navigate(`/Game/${product.id}`)}>
            <img className='image-block-view-column' src={product.imagesCsv} />
            <div className='name-price-view-column'>{product.name} <div>{product.price}₴</div></div>
        </div>
    </>;
}
import Filter, { Sorting } from '../filters/Filters';
import Footer from '../main/footer/Footer';
import Header from '../main/header/Header';
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../AppContext';
import { useNavigate } from "react-router-dom";
import './Catalog.css'
import '../main/content/Content.css'
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
    const ITEMS_PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const getVisiblePages = () => {
        const pages = [];
        if (currentPage > 1) pages.push(currentPage - 1);
        pages.push(currentPage);
        if (currentPage < totalPages) pages.push(currentPage + 1);
        return pages;
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="block-views-row">
                {currentItems.map((product, index) => (
                    <BlockViewRow key={index} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    {getVisiblePages().map((page) => (
                        <button
                            key={page}
                            className={`page-button ${page === currentPage ? "active" : ""}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export function BlockViewRow({ product }) {

    const navigate = useNavigate();

    const hasDiscount = product.action && product.action.amount > 0;

    const discountedPrice = hasDiscount
        ? Math.round(product.price - (product.price * product.action.amount) / 100)
        : product.price;

    return <>
        <div className='block-view-row' onClick={() => navigate(`/Game/${product.id}`)}>
            <img className='image-block-view-row' src={product.imagesCsv} />
            <div className='name-game'>{product.name}</div>
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
    </>;
}

export function ViewColumn({ products }) {
    const ITEMS_PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const getVisiblePages = () => {
        const pages = [];
        if (currentPage > 1) pages.push(currentPage - 1);
        pages.push(currentPage);
        if (currentPage < totalPages) pages.push(currentPage + 1);
        return pages;
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="block-views-column">
                {currentItems.map((product, index) => (
                    <BlockViewColumn key={index} product={product} />
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className="pagination">
                    {getVisiblePages().map((page) => (
                        <button
                            key={page}
                            className={`page-button ${page === currentPage ? "active" : ""}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export function BlockViewColumn({ product }) {

    const navigate = useNavigate();

    const hasDiscount = product.action && product.action.amount > 0;

    const discountedPrice = hasDiscount
        ? Math.round(product.price - (product.price * product.action.amount) / 100)
        : product.price;

    return <>
        <div className='block-view-column' onClick={() => navigate(`/Game/${product.id}`)}>
            <img className='image-block-view-column' src={product.horisontalImages} />
            <div className='name-price-view-column'>{product.name} 
                <div className="price-game-column">
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
        </div>
    </>;
}
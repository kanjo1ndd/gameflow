import Filter, { Sorting } from '../filters/Filters';
import Footer from '../main/footer/Footer';
import Header from '../main/header/Header';
import './Catalog.css'

export default function Catalog() {
    return <>
        <Header />
        <div className='content-catalog'>
            <div className='content-catalog-block'>
                <Sorting />
                <Filter />
            </div>
        </div>
        <Footer />
    </>;
}
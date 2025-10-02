import Footer from '../main/footer/Footer';
import Header from '../main/header/Header'
import './Characteristics.css'
import { HeaderPageGame, MenuGamePage } from './PageGame';
import './PageGame.css'

export default function Characteristics() {
    return <>
        <Header />
        <div className="content-page-game">
            <HeaderPageGame />
            <div className="left-block-right-menu">
                <MenuGamePage />
            </div>
        </div>
        <Footer />
    </>;
}
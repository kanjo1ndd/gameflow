import Footer from "../main/footer/Footer";
import Header from "../main/header/Header";
import './PageGame.css'

export default function PageGame() {
    return <>
        <Header />
        <div className="content-page-game">
            <HeaderPageGame />
            <div>
                <div className="name-game-page">Name</div>
                <div className="main-image-page-game" />
                <div className="showcase-game-page">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="showcase-image-game-page" />
                    ))}
                </div>
                <div className="category-game-page">
                    
                </div>
            </div>
            <div>
                <div />
            </div>
        </div>
        <Footer />
    </>;
}

export function HeaderPageGame() {
    return <>
        <div className="header-block-game">
            <div className="text-block-game">Про гру</div>
            <div className="text-block-game">Характеристики</div>
            <div className="text-block-game">Спільнота</div>
        </div>
    </>;
}
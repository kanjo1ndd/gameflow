import Footer from '../main/footer/Footer';
import Header from '../main/header/Header'
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { HeaderPageGame, MenuGamePage } from './PageGame';
import './Characteristics.css'
import './PageGame.css'

export default function Characteristics() {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const { request } = useContext(AppContext);

    useEffect (() => {
        request("/api/shop/product/" + id)
        .then(data => setProduct(data))
        .catch(j => console.error(j));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return <>
        <Header />
        <div className="content-page-game">
            <HeaderPageGame />
            <div className="left-block-right-menu">
                <div className="left-block-game-page">
                    <div className="name-game-page">{product.name}</div>
                    <div className='block-platform'>
                        <div className='text-platform'><i className='bi bi-windows'/>Windows</div> <i className='bi bi-chevron-down' />
                    </div>
                    <div className='blocks-characteristics'>
                        <MinimalRequirements />
                        <RecommendedRequirements />
                    </div>
                </div>
                <MenuGamePage product={product}/>
            </div>
        </div>
        <Footer />
    </>;
}

export function MinimalRequirements() {

    const requirements = [
        { label: "Версія системи:", value: "64-bit Windows 10" },
        { label: "CPU:", value: "Core i7-6700 or Ryzen 5 1600" },
        { label: "Пам'ять:", value: "12 GB ОП" },
        { label: "GPU:", value: "GeForce GTX 1060 6GB or Radeon RX 580 8GB or Arc A380" },
        { label: "DirectX:", value: "версії 12" },
        { label: "Обсяг пам'яті:", value: "70 GB" },
        { label: "Звукова карта:", value: "Windows Compatible Audio Device" },
        { label: "Контроллер:", value: "Клавіатура, геймпад" },
        { label: "Додаткові примітки:", value: "Потрібен SSD" },
        { label: "Мова:", value: "Англійська, Українська, Французька, Італійська, тощо" }
    ];

    return <>
        <div className="block-requirements">
            <div>Мінімальні налаштування</div>
            <div className="blocks-requirements">
                {requirements.map((req, index) => (
                    <div className="text-requirements" key={index}>
                        {req.label}
                        <div className="text-requirement">{req.value}</div>
                    </div>
                ))}
            </div>
        </div>
    </>;
}

export function RecommendedRequirements() {

    const requirements = [
        { label: "Версія системи:", value: "64-bit Windows 10" },
        { label: "CPU:", value: "Core i7-6700 or Ryzen 5 1600" },
        { label: "Пам'ять:", value: "12 GB ОП" },
        { label: "GPU:", value: "GeForce GTX 1060 6GB or Radeon RX 580 8GB or Arc A380" },
        { label: "DirectX:", value: "версії 12" },
        { label: "Обсяг пам'яті:", value: "70 GB" },
        { label: "Звукова карта:", value: "Windows Compatible Audio DeviceB" }
    ];

    return <>
        <div className='block-requirements'>
            <div className=''>Рекомендовані налаштування</div>
            <div className="blocks-requirements">
                {requirements.map((req, index) => (
                    <div className="text-requirements" key={index}>
                        {req.label}
                        <div className="text-requirement">{req.value}</div>
                    </div>
                ))}
            </div>
        </div>
    </>;
}
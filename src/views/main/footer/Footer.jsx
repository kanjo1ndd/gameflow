import './Footer.css'
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();

    const noMarginPages = ["/SignIn", "/SignUp"];
    const isMarginPage = !noMarginPages.includes(location.pathname);

    return <>
        <div className={`block ${isMarginPage ? "with-margin" : ""}`}>
            <div className='footer'>
                <div className='logo-messengers'>
                    <div>LOGO</div>
                    <div className='messengers'>
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-twitter"></i>
                        <i className="bi bi-youtube"></i>
                    </div>
                </div>
                <div className='text'>
                    © 2024, Zubarik inc, Inc. All rights reserved. Zubarik inc, Zubarik inc, the Zubarik inc logo, Zubarik, the Zubarik logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Zubarik inc, Inc. in the United States of America and elsewhere. Other brands or product names are the trademarks of their respective owners.
                </div>
                <div className='footer-links'>
                    <a>Умови використання</a>
                    <a>Політика конфіденційності</a>
                    <a>Політика повернення коштів магазину</a>
                </div>
            </div>
        </div>
    </>;
}
import './Footer.css'
import './mobileFooter.css'
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();

    const noMarginPages = ["/SignIn", "/SignUp"];
    const isMarginPage = !noMarginPages.includes(location.pathname);

    return <>
        <div className={`block ${isMarginPage ? "with-margin" : ""}`}>
            <div className='footer'>
                <div className='logo-messengers'>
                    <div className='logo-min'><img src="/logo.png" alt="Logo" /></div>
                    <div className='logo-min-mobile'><img src="/logo-min.png" alt="Logo" /></div>
                    <div className='messengers'>
                        <i className='social-networks'><img src="/Facebook.png" alt="Facebook" /></i>
                        <i className='social-networks'><img src="/Instagram.png" alt="Instagram" /></i>
                        <i className='social-networks'><img src="/X.png" alt="X" /></i>
                    </div>
                </div>
                <div className='footer-links-mobile'>
                        <a className='link-mobile'>Terms of Service</a>
                        <a className='link-mobile'>Privacy Policy</a>
                        <a className='link-mobile'>Store Refund Policy</a>
                    </div>
                <div className='text'>
                    © 2024, Zubarik inc, Inc. All rights reserved. Zubarik inc, Zubarik inc, the Zubarik inc logo, Zubarik, the Zubarik logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Zubarik inc, Inc. in the United States of America and elsewhere. Other brands or product names are the trademarks of their respective owners.
                </div>
                <div className='text-mobile'>
                     All rights reserved. Zubarik inc, Zubarik inc, the Zubarik inc logo, Zubarik, the Zubarik logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Zubarik inc, Inc. in the United States of America and elsewhere. Other brands or product names are the trademarks of their respective owners.
                </div>
                <div className='text-mobile-2'>
                    © 2024, Zubarik inc, Inc.
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
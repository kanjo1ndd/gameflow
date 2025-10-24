import Footer from '../main/footer/Footer';
import Header from '../main/header/Header';
import './Settings.css'

export default function Settings() {
    return <>
        <Header />
        <div className='content-settings'>
            <div className='blocks-left-menu-right-content'>
                <LeftMenu />
                <div className='right-content-menu'>
                    <GeneralSettings />
                </div>
            </div>
        </div>
        <Footer />
    </>
}

export function LeftMenu() {
    return <>
        <div className='block-left-menu-settings'>
            <input className='input-search-settings' placeholder='Пошук налаштувань...' />
            <div className='block-choose-left-menu'>Темна тема</div>
            <div className='block-choose-left-menu'>Темна тема</div>
            <div className='block-choose-left-menu'>Темна тема</div>
        </div>
    </>
}

export function GeneralSettings() {
    return <>
        <div className='block-right-content'>
            <div className='main-image-right-content'></div>
        </div>
    </>
}

export function PasswordMenu() {
    return <>

    </>
}

export function Notification() {
    return <>
    
    </>
}

export function Wallet() {
    return <>
    
    </>
}

export function DeleteAccount() {
    return <>
    
    </>
}
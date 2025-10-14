import Footer from '../main/footer/Footer';
import Header from '../main/header/Header';
import { useEffect, useState, useContext } from "react";
import { AppContext } from '../../AppContext';
import './Profile.css'

export default function Profile() {

    const [userData, setUserData] = useState({});
    const { request, token } = useContext(AppContext);

    useEffect(() => {
        if(token == null) {
            setUserData({});
        }
        else {
            request("/api/user/profile")
            .then(setUserData)
            .catch(err => {
                console.error(err);
                setUserData({});
            });
        }
    }, [token]);

    return <>
        <Header />
        <div className='content-profile'>
            <div className='head-image-profile' />
            <div className='left-block-right-menu-profile'>
                <div className='left-block-profile'>
                    <div className='block-info-profile'>
                        <img className='image-profile' src={userData.avatarUrl && userData.avatarUrl !== 'https://localhost:7202/Admin/Image/'
                            ? userData.avatarUrl : '/unknownUser.jpg'}/>
                        <div className='block-username'>
                            {userData.userName}
                            <div className='text-online'>онлайн</div>
                        </div>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
        <Footer />
    </>;
}
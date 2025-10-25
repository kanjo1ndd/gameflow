import Footer from '../main/footer/Footer';
import Header from '../main/header/Header';
import './Settings.css'
import countryList from 'react-select-country-list';
import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from '../../AppContext';

export default function Settings() {

    const [activeId, setActiveId] = useState(1);

    return <>
        <Header />
        <div className='content-settings'>
            <div className='blocks-left-menu-right-content'>
                <LeftMenu />
                <div className='right-content-menu'>
                    {activeId === 1 && <GeneralSettings />}
                    {activeId === 2 && <PasswordMenu />}
                    {activeId === 3 && <Notification />}
                    {activeId === 4 && <Wallet />}
                    {activeId === 5 && <DeleteAccount />}
                </div>
            </div>
        </div>
        <Footer />
    </>
}

export function LeftMenu({ activeId, setActiveId }) {

    const menuItems = [
        { id: 1, icon: "bi bi-person-lines-fill", title: "Загальні налаштування" },
        { id: 2, icon: "bi bi-lock", title: "Пароль" },
        { id: 3, icon: "bi bi-bell", title: "Сповіщення" },
        { id: 4, icon: "bi bi-cash", title: "Гаманець" },
        { id: 5, icon: "bi bi-person-x-fill", title: "Видалення аккаунта" },
    ];

    return <>
        <div className='block-left-menu-settings'>
            <input className='input-search-settings' placeholder='Пошук налаштувань...' />
            <div className='settings-menu'>
                <div className='block-choose-left-menu'><i className="bi bi-moon" /><div className='menu-settings-title'>Темна тема</div></div>
                {menuItems.map((item) => (
                    <div key={item.id} className={`block-choose-left-menu ${item.id === activeId ? "active" : ""}`}
                        onClick={() => setActiveId(item.id)}>
                        <i className={item.icon} />
                        <span className="menu-settings-title">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export function GeneralSettings() {
    const { request, token } = useContext(AppContext);
    const countryOptions = countryList().getData();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [aboutUser, setAboutUser] = useState('');
    const [country, setCountry] = useState(null);
    const [preview, setPreview] = useState('');
    const [errors, setErrors] = useState({});
    const [initialData, setInitialData] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = "(Ім'я користувача обов’язкове)";
        if (!email.trim() || !email.includes("@")) newErrors.email = "(Некоректна пошта)";
        if (!country) newErrors.country = "(Країна обов’язкова)";
        return newErrors;
    };

    // 🔹 Загрузка данных
    useEffect(() => {
        if (!token) {
            setInitialData({});
            return;
        }

        request("/api/user/profile")
            .then((data) => {
                setUsername(data.userName || "");
                setEmail(data.email || "");
                setAboutUser(data.aboutUser || "");
                setPreview(data.avatarUrl || "");
                setCountry(countryOptions.find((c) => c.label === data.country) || null);
                setInitialData(data);
            })
            .catch(console.error);
    }, [token]);

    // 🔹 Сохранение
    const handleSave = () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const input = `${username},${email},${country.label},${aboutUser}`;
        request("/api/user/" + input)
            .then(() => console.log("Профіль оновлено"))
            .catch(console.error);
    };

    // 🔹 Отмена изменений
    const handleCancel = () => {
        setUsername(initialData.userName || "");
        setEmail(initialData.email || "");
        setAboutUser(initialData.aboutUser || "");
        setCountry(countryOptions.find((c) => c.label === initialData.country) || null);
        setPreview(initialData.avatarUrl || "");
        setErrors({});
    };

    return (
        <div className="block-right-content">
            <div className="main-image-right-content">
                <div className="button-edit-image">
                    <i className="bi bi-images" />
                </div>
            </div>

            <div className="blocks-info-profile-settings">
                <div className="block-info-profile-settings">
                    <div className="image-profile-settings">
                        <div className="button-edit-image-profile">
                            <i className="bi bi-images" />
                        </div>
                    </div>

                    <div className="block-edit-profile">
                        <div className="block-name-input">
                            <div className="text-input-for-edit">
                                Нікнейм {errors.username && <span className="error-text">{errors.username}</span>}
                            </div>
                            <input
                                className={`input-for-edit ${errors.username ? "input-error" : ""}`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="block-name-input">
                            <div className="text-input-for-edit">
                                Ел. пошта {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>
                            <input
                                className={`input-for-edit ${errors.email ? "input-error" : ""}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="block-name-input">
                            <div className="text-input-for-edit">Про себе</div>
                            <input
                                className="input-for-edit-about-me"
                                value={aboutUser}
                                onChange={(e) => setAboutUser(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="buttons-save-cancel">
                    <div className="button-remove-edit" onClick={handleCancel}>
                        Скасувати
                    </div>
                    <button className="button-save-edit" onClick={handleSave}>
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    );
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
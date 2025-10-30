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
                <LeftMenu activeId={activeId} setActiveId={setActiveId} />
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
    const [avatarImg, setAvatarImg] = useState(null);
    const [errors, setErrors] = useState({});
    const [initialData, setInitialData] = useState({});
    const fileInputRef = useRef(null);

    // Валидация
    const validate = () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = "(Ім'я користувача обов’язкове)";
        if (!email.trim() || !email.includes("@")) newErrors.email = "(Некоректна пошта)";
        if (!country) newErrors.country = "(Країна обов’язкова)";
        return newErrors;
    };

    // Загрузка данных пользователя
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

    // Сохранение
    const handleSave = () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const input = `${username},${email},${country.label},${aboutUser}`;
        request("/api/user/" + input)
            .then(() => console.log("Профіль оновлено"))
            .catch(console.error);

        if (avatarImg) {
            const formData = new FormData();
            formData.append("formFile", avatarImg);

            request("/api/user/setAvatar/", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    console.log("Аватар оновлено");
                    if (response.data?.avatarUrl) {
                        setPreview(response.data.avatarUrl);
                    }
                })
                .catch(console.error);
        }
    };

    // Отмена
    const handleCancel = () => {
        setUsername(initialData.userName || "");
        setEmail(initialData.email || "");
        setAboutUser(initialData.aboutUser || "");
        setCountry(countryOptions.find((c) => c.label === initialData.country) || null);
        setPreview(initialData.avatarUrl || "");
        setAvatarImg(null);
        setErrors({});
    };

    // Логика загрузки аватарки
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
            setAvatarImg(file);
        }
        event.target.value = null;
    };

    return (
        <div className="block-right-content">
            <div className="main-image-right-content">
                <div className="button-edit-image" onClick={handleUploadClick}>
                    <i className="bi bi-images" />
                </div>
            </div>

            <div className="blocks-info-profile-settings">
                <div className="block-info-profile-settings">
                    <div className="image-profile-settings">
                        <img className="img-avatar-profile"
                            src={
                                preview && preview !== "https://localhost:7202/Admin/Image/"
                                    ? preview
                                    : "/unknownUser.jpg"
                            }
                        />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <div className="button-edit-image-profile" onClick={handleUploadClick}>
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
                                placeholder="Nickname"
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
                                placeholder="example@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="block-name-textarea">
                            <div className="text-input-for-edit">Про себе</div>
                            <textarea
                                className="input-for-edit-about-me"
                                value={aboutUser}
                                onChange={(e) => {
                                    if (e.target.value.length <= 100) setAboutUser(e.target.value);
                                }}
                                maxLength={100}
                            />
                            <div className="char-counter">{aboutUser.length}/100</div>
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
        <div className="block-right-content-password">
            <div className="block-content-password">
                <div className='title-content-password'>Зміна паролю</div>
                <div className='list-rules-password'>
                    <nav>
                        <li>Не використовуйте жодного з останніх 5 паролів</li>
                        <li>Використовуйте 7+ символів</li>
                        <li>Використовуйте принаймні 1 літеру</li>
                        <li>Використовуйте принаймні 1 цифру</li>
                        <li>Без пробілів</li>
                    </nav>
                </div>
                <div className='block-for-input-password'>
                    Старий пароль
                    <input placeholder='Введіть ваш поточний пароль...' className='input-for-password' />
                </div>
                <div className='block-for-input-password'>
                    Новий пароль
                    <input placeholder='Введіть новий пароль...' className='input-for-password' />
                    <input placeholder='Повторіть новий пароль...' className='input-for-password' />
                </div>
                <div className='block-for-button-save-edit-password'>
                    <button className='button-save-for-edit-password'>Зберегти</button>
                </div>
            </div>
        </div>
    </>
}

export function Notification() {
    return <>
        <div className="block-right-content-notification">
            <div className='title-content-notification'>Беззвучні сповіщення</div>
        </div>
    </>
}

export function Wallet() {
    return <>
        <div className="block-right-content-wallet">
            <div className="block-content-wallet">
                <div className='block-wallet'>
                    <i className="bi bi-wallet2" />
                    <div className='text-wallet'>
                        Мій баланс
                        <div className='money-wallet'>
                            999.50₴
                        </div>
                    </div>
                </div>
            </div>

            <div className='block-right-for-input-balance'>
                <div className='title-for-input-balance'>Поповнення балансу</div>
                <div className='block-input-replenish'>
                    <input className='input-replenish' placeholder='Сума' type='number' min='1' />
                    <button className='button-replenish'>Поповнити</button>
                </div>
            </div>
        </div>
    </>
}

export function DeleteAccount() {
    return <>
        <div className="block-right-content">Парцупцуполь</div>
    </>
}
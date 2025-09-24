import './SignUp.css'
import './SignIn.css'
import Header from "../main/header/Header";
import { AppContext } from '../../AppContext';
import Footer from '../main/footer/Footer';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const countryOptions = countryList().getData();

export default function SignUp() {

    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const {request} = useContext(AppContext);

    const [errors, setErrors] = useState({});
    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [country, setCountry] = useState(null);
    // const [agree, setAgree] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        console.log("Submitted data:", e);
        setIsSuccess(true);
        request('/api/user/', {
            method: 'POST',
            body: new FormData(e.target)
        }).then((res) => {
            console.log(res);
            setIsSuccess(true);
            navigate('/');
        }).catch(console.error);
    }

    const validate = () => {
        const newErrors = {};
        if (!login.trim()) newErrors.login = "(Login is required)";
        if (!name.trim()) newErrors.name = "(Name is required)";
        if (!password.trim() || password.length < 6) 
            newErrors.password = "(Password must be at least 6 characters)";
        if (password !== confirmPassword)
            newErrors.confirmPassword = "(Passwords must match)";
        if (!confirmPassword.trim()) newErrors.confirmPassword = "(Password is required)";
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
            newErrors.email = "(Invalid email)";
        if (!phone.trim() || !/^\d+$/.test(phone))
            newErrors.phone = "(Only digits are allowed)";
        if (!phone.trim()) newErrors.phone = ("(Phone is required)");
        if (!country) newErrors.country = "(Country is required)";
        if (!birthDate.trim()) newErrors.birthDate = "(Date of birth is required)";
        // if (!agree) newErrors.agree = "(You must agree to the terms)";
        return newErrors;
    };

    return <>
        <Header />
        <div className='content-sign-up'>
            <div className='background-image-sign-up'>
                <div className='block-registration'>
                    <form className='form-signUp' onSubmit={(onSubmit)}>
                        <div className='authorization-text'>Створіть новий акаунт</div>
                        <div className='registration-inputs'>
                            <div className='for-inputs'>
                                <div className='form-authozation'>Логін</div>
                                <input name="login" placeholder='Придумайте новий логін...' onChange={(e) => setLogin(e.target.value)} 
                                    className={`input-registration ${errors.login ? 'input-error' : ''}`} />
                                <div className='form-errors'>
                                    {errors.login && <span><i className="bi bi-info-circle"></i> {errors.login}</span>}
                                </div>
                            </div>
                            <div className='for-inputs'>
                                <div className='form-authozation'>E-mail</div>
                                <input name="email" placeholder='Введіть ваш e-mail...' onChange={(e) => setEmail(e.target.value)} 
                                    className={`input-registration ${errors.email ? 'input-error' : ''}`} />
                                <div className='form-errors'>
                                    {errors.email && <span><i className="bi bi-info-circle"></i> {errors.email}</span>}
                                </div>
                            </div>
                            <div className='for-inputs'>
                                <div className='form-authozation'>Пароль</div>
                                <input name="password" type="password" placeholder='Придумайте новий пароль...' onChange={(e) => setPassword(e.target.value)} 
                                    className={`input-registration ${errors.password ? 'input-error' : ''}`} />
                                <div className='form-errors'>
                                    {errors.password && <span><i className="bi bi-info-circle"></i> {errors.password}</span>}
                                </div>
                            </div>
                            <div className='for-inputs'>
                                <div className='form-authozation'>Повторіть пароль</div>
                                <input name="confirmPassword" type="password" placeholder='Введіть пароль ще раз...' onChange={(e) => setConfirmPassword(e.target.value)} 
                                    className={`input-registration ${errors.confirmPassword ? 'input-error' : ''}`} />
                                <div className='form-errors'>
                                    {errors.confirmPassword && <span><i className="bi bi-info-circle"></i> {errors.confirmPassword}</span>}
                                </div>
                            </div>
                            <div className='for-inputs'>
                                <div className='form-authozation'>Нік</div>
                                <input name="name" placeholder='Придумайте ваш нік...' onChange={(e) => setName(e.target.value)} 
                                    className={`input-registration ${errors.name ? 'input-error' : ''}`} />
                                <div className='form-errors'>
                                    {errors.name && <span><i className="bi bi-info-circle"></i> {errors.name}</span>}
                                </div>
                            </div>
                            <div className='for-inputs'>
                                <div className='form-authozation'>Номер телефона</div>
                                <input name="phone" placeholder='Введіть ваш номер телефону...' onChange={(e) => setPhone(e.target.value)} 
                                    className={`input-registration ${errors.phone ? 'input-error' : ''}`} />
                                <div className='form-errors'>
                                    {errors.phone && <span><i className="bi bi-info-circle"></i> {errors.phone}</span>}
                                </div>
                            </div>
                            <div className='for-inputs'>
                                <div className='form-authozation'>Дата народження</div>
                                <input name="birthDate" type="date" value={birthDate} placeholder='Введіть вашу дату народження...' onChange={(e) => setBirthDate(e.target.value)} 
                                    className={`input-registration ${errors.birthDate ? 'input-error' : ''}`} />
                                <div className='form-errors'>
                                    {errors.birthDate && <span><i className="bi bi-info-circle"></i> {errors.birthDate}</span>}
                                </div>
                            </div>
                            <div className='for-inputs'>
                                <div className='form-authozation'>Країна</div>
                                <Select
                                    value={country}
                                    onChange={setCountry}
                                    options={countryOptions}
                                    classNamePrefix="react-selects"
                                    className={`${errors.country ? 'react-select--errors' : ''}`}
                                    placeholder="Виберіть країну..."
                                    isClearable
                                />
                                <input type="hidden" name="country" value={country?.label || ''} />
                                <div className='form-errors'>
                                    {errors.country && <span><i className="bi bi-info-circle"></i> {errors.country}</span>}
                                </div>
                            </div>
                        </div>
                        <div className='agree'>
                            Я погоджуюсь з <div className='terms-of-use'>Умовами використання</div>
                        </div>
                        <div className='button-signup'>
                            <button type="submit" className='button-continue'>Продовжити</button>
                            <div className='none-account'>Маєте аккаунт? <div className='continue-sign-up' onClick={() => navigate('/SignIn')}>Авторизуйтесь</div></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
    </>;
}
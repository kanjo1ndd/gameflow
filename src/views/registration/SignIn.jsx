import './SignIn.css'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext';
import { useContext, useState, useRef } from 'react';
import Header from '../main/header/Header';
import Footer from '../main/footer/Footer';

export default function SignIn() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {request, token, setToken} = useContext(AppContext);
    const [errors, setErrors] = useState({ login: '', password: '' });
    
    const onSubmit = () => {
        const newErrors = { login: '', password: '' };

        if (!login.trim()) newErrors.login = 'Неправильний логін або e-mail';
        if (!password.trim()) newErrors.password = 'Неправильний пароль';

        setErrors(newErrors);

        // Если есть ошибки — не отправляем
        if (newErrors.login || newErrors.password) return;

        console.log(login, password);
        let credentials = btoa(`${login}:${password}`);
        request('/api/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + credentials
            }
        }).then(data => {
            let jti = data.jti;
            setToken(jti);
            console.log('Токен после аутентификации:', jti);
            navigate('/');
        }).catch(console.error);
    };

    const navigate = useNavigate();

    return <>
        <Header />
        <div className='content-sign-in'>
            <div className='background-image'>
                <div className='block-sign-in'>
                    <div className='authorization-text'>Авторизуйтесь, щоб продовжити</div>
                    <div className='block-authorization'>
                        <div className='form-authozation'>Логін або e-mail</div>
                        <input name="login" placeholder='Введіть ваш логін або e-mail...' onChange={(e) => setLogin(e.target.value)} 
                            className={`input-authozation ${errors.login ? 'input-error' : ''}`} />
                        <div className='form-errors'>
                            {errors.login && <span><i className="bi bi-info-circle"></i> {errors.login}</span>}
                        </div>
                        <div className='form-authozation'>Пароль</div>
                        <input name='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className={`input-authozation ${errors.password ? 'input-error' : ''}`} placeholder='Введіть ваш пароль...' />
                        <div className='form-errors'>
                            {errors.password && <span><i className="bi bi-info-circle"></i> {errors.password}</span>}
                        </div>
                        <div className='remember-dont-password'>
                            <div className='remember'>
                                <label className="custom-checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks"></span>
                                </label>
                                Запам'ятати мене</div><div className='dont-rememberr'>Не пам’ятаю пароль</div>
                        </div>
                    </div>
                    <div className='button-signup'>
                        <button onClick={ onSubmit } className='button-continue'>Продовжити</button>
                        <div className='none-account'>Не маєте аккаунту? <div className='continue-sign-up' onClick={() => navigate('/SignUp')}>Зареєструйтесь</div></div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>;
}
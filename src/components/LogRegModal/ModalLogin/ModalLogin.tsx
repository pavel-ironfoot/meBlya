import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validPassword, validationEmail } from '../../../validationFields/validation';
import { FormField } from '../FormField';
import { loginValue } from '../../../formValues/formValues';
import { RootState } from '../../../storeToolkit';
import { modalIsAction, userIsLoggin } from '../../../storeToolkit/isLogModalSlice';
import { userEmail, userToken } from '../../../storeToolkit/userSlice';
import { getMeResource, postLoginResource } from '../../../utils/helpfulFunction';
import { LoginValuetypes, ModalLoginProps } from '../../../utils/types-and-interfaces';

import './ModalLogin.scss';

export const ModalLogin: React.FC<ModalLoginProps> = ({ setPopup }) => {
    const dispatch = useDispatch();
    const activeModal = useSelector((state: RootState) => state.logReg.modalAction);

    const [disabled, setDisabled] = useState(true);
    const [loginForm, setLoginForm] = useState<LoginValuetypes>(loginValue);
    const [rememberMe, setRememberMe] = useState(false);
    const [someErrorEmailPassword, setSomeErrorEmailPassword] = useState<string>('');

    const getResource = async (url: string, emailForm: string, passwordForm: string) => {
        const res = await postLoginResource(url, emailForm, passwordForm);
        console.log('new new new ', res);
        if (res) {
            if (res.token) dispatch(userIsLoggin(true));
            dispatch(userToken(res.token));
            localStorage.setItem('token', res.token);
            const data = await getMeResource(`https://shyfonyer.shop/api/v1/user/me`, res.token);
            if (data) {
                dispatch(userEmail(data.email));
                localStorage.setItem('loginUser', data.email);
                dispatch(modalIsAction(false));
                setSomeErrorEmailPassword('');
            } else {
                console.log('something going wrong');
                setSomeErrorEmailPassword('хтось натупив');
            }
  
        } else {
            setSomeErrorEmailPassword('Ви ввели невірну електронну адресу чи пароль');
        }

    }

    useEffect(() => {
        if (localStorage.getItem('saveMe')) setLoginForm({ ...loginForm, 'email': localStorage.getItem('saveMe')! })
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (rememberMe) localStorage.setItem('saveMe', loginForm.email);
        getResource('https://shyfonyer.shop/api/v1/auth/login_user', loginForm.email, loginForm.password);
           
    }

    const rememberMeHandler = () => {
        setRememberMe(prev => !prev);
    }

    const setLoginValue = (key: string, value: string) => {
        setLoginForm({ ...loginForm, [key]: value });
    }

    const emailLoginError = useMemo(() => validationEmail(loginForm.email), [loginForm.email]);
    const passwordLoginError = useMemo(() => validPassword(loginForm.password), [loginForm.password]);

    useEffect(() => {
        if (emailLoginError === 'nomistake' && passwordLoginError === 'nomistake') {
            setDisabled(false);
        } else setDisabled(true);
    }, [emailLoginError, passwordLoginError]);

    return (
        <div className={activeModal ? "modal active" : "modal"} onClick={() => dispatch(modalIsAction(false))}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div onClick={() => dispatch(modalIsAction(false))} className='close__modal__x'>X</div>

                <form onSubmit={handleSubmit} action="">
                    <div>
                        <h1>ВХІД</h1>
                        <FormField
                            placeholder='Введіть електронну пошту'
                            label='Електронна пошта'
                            type='email'
                            name='email'
                            id='email'
                            value={loginForm.email}
                            setChange={(value) => setLoginValue('email', value)}
                        />
                        <p className="red__mistake">
                            {emailLoginError === 'nomistake' ? '' : emailLoginError}
                        </p>
                        <FormField
                            placeholder='Введіть пароль'
                            label='Пароль'
                            type='password'
                            name='password'
                            id='password'
                            value={loginForm.password}
                            setChange={(value) => setLoginValue('password', value)}
                        />
                        <p className="red__mistake">
                            {passwordLoginError === 'nomistake' ? '' : passwordLoginError}
                        </p>
                        <p className="red__mistake">{someErrorEmailPassword}</p>
                    </div>
                    <div className='login__footer'>
                        <div className='login__footer__checkbox'>
                            <label>
                                <input onChange={rememberMeHandler} type="checkbox" name="" id="" />Запам’ятати мене
                            </label>
                        </div>
                        <div className='login__footer__forgot'>
                            <span onClick={() => setPopup('forgot')} className='login__registration'>Забули пароль?</span>
                        </div>
                    </div>
                    <button className='modal__submit-registration' type="submit" disabled={disabled}>УВІЙТИ</button>
                </form>

                <p>Ще не маєте акаунту?<span onClick={() => setPopup('registration')} className='login__registration'>Зареєструйтесь!</span></p>
            </div>
        </div>
    );
}

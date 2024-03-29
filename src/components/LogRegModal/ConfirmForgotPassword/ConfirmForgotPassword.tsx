import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../storeToolkit';
import { modalIsAction } from '../../../storeToolkit/isLogModalSlice';
import { newLoginValue } from '../../../formValues/formValues';
import { FormField } from '../FormField';
import { validPassword, validationConfirmToken, validationEmail } from '../../../validationFields/validation';
import { postResetPassword } from '../../../utils/helpfulFunction';
import { ConfirmForgotPasswordProps } from '../../../utils/types-and-interfaces';

import './ConfirmForgotPassword.scss';

export const ConfirmForgotPassword: React.FC<ConfirmForgotPasswordProps> = ({ setPopup }) => {
    const dispatch = useDispatch();
    const activeModal = useSelector((state: RootState) => state.logReg.modalAction);
    const [disabled, setDisabled] = useState(true);
    const [loginForm, setLoginForm] = useState(newLoginValue);
    const [confirmForgotError, setConfirmForgotError] = useState<string>('');

    useEffect(() => {
        if (localStorage.getItem('confirmEmail')) setLoginForm({ ...loginForm, 'email': localStorage.getItem('confirmEmail')! })
    }, []);

    const getResource = async (url: string, emailForm: string, token: string, newPassword: string) => {
        const res = await postResetPassword(url, emailForm, token, newPassword);
        if (res) {
            setConfirmForgotError('');
            setPopup('login');
        } else {
            setConfirmForgotError('щось пішло не так')
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        getResource('https://shyfonyer.shop/api/v1/user/password/reset', loginForm.email, loginForm.token, loginForm.newPassword)

    }

    const setLoginValue = (key: string, value: string) => {
        setLoginForm({ ...loginForm, [key]: value });
    }

    const emailLoginError = useMemo(() => validationEmail(loginForm.email), [loginForm.email]);
    const newPasswordLoginError = useMemo(() => validPassword(loginForm.newPassword), [loginForm.newPassword]);
    const confirmTokenError = useMemo(() => validationConfirmToken(loginForm.token), [loginForm.token]);

    useEffect(() => {
        if (emailLoginError === 'nomistake' && newPasswordLoginError === 'nomistake' && confirmTokenError === 'nomistake') {
            setDisabled(false);
        } else setDisabled(true);
    }, [emailLoginError, newPasswordLoginError, confirmTokenError]);

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
                            placeholder='Введіть код'
                            label='Введіть код, надісланий вам на пошту '
                            type='text'
                            name='confirm-token'
                            id='confirm-token'
                            value={loginForm.token}
                            setChange={(value) => setLoginValue('token', value)}
                        />
                        <p className="red__mistake">
                            {confirmTokenError === 'nomistake' ? '' : confirmTokenError}
                        </p>
                        <FormField
                            placeholder='Введіть пароль'
                            label='Введіть новий пароль '
                            type='password'
                            name='new-password'
                            id='new-password'
                            value={loginForm.newPassword}
                            setChange={(value) => setLoginValue('newPassword', value)}
                        />
                        <p className="red__mistake">
                            {newPasswordLoginError === 'nomistake' ? '' : newPasswordLoginError}
                        </p>
                        <p className="red__mistake">
                            {confirmForgotError}
                        </p>
                    </div>
                    <button className='modal__submit-registration' type="submit" disabled={disabled}> ЗМІНИТИ ПАРОЛЬ</button>
                </form>
            </div>
        </div>
    );
}

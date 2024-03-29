import { useEffect, useMemo, useState } from 'react';
import { loginValue } from '../../../formValues/formValues';
import { validationEmail } from '../../../validationFields/validation';
import { FormField } from '../FormField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../storeToolkit';
import { modalIsAction } from '../../../storeToolkit/isLogModalSlice';
import { forgotPasswordRequest } from '../../../utils/helpfulFunction';

import './ModalForgetPassword.scss';

interface ModalForgetPasswordProps {
    setPopup: (value: string) => void;
}

export const ModalForgetPassword: React.FC<ModalForgetPasswordProps> = ({ setPopup }) => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [loginForm, setLoginForm] = useState(loginValue);
    const activeModal = useSelector((state: RootState) => state.logReg.modalAction);

    const handleSubmit = async (e: any) => {
        localStorage.setItem('confirmEmail', loginForm.email);
        await forgotPasswordRequest(loginForm);
        setPopup('forgotConfirm');
    }

    const setLoginValue = (key: string, value: string) => {
        setLoginForm({ ...loginForm, [key]: value });
    }

    const emailLoginError = useMemo(() => validationEmail(loginForm.email), [loginForm.email]);

    useEffect(() => {
        if (emailLoginError === 'nomistake') {
            setDisabled(false);
        } else setDisabled(true);
    }, [emailLoginError]);

    return (
        <div className={activeModal ? "modal active" : "modal"} onClick={() => dispatch(modalIsAction(false))}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div onClick={() => dispatch(modalIsAction(false))} className='close__modal__x'>X</div>
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
                </div>
                <button className='modal__submit-registration' disabled={disabled} onClick={handleSubmit}>ОТРИМАТИ ТИМЧАСОВИЙ ПАРОЛЬ</button>
                <p><span onClick={() => setPopup('login')} className='login__registration'>Я згадав(ла) свій пароль </span> </p>
            </div>
        </div>
    );
}
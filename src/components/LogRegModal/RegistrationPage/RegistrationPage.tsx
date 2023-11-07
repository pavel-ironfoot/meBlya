import { useEffect, useMemo, useState } from 'react';
import { FormField } from '../FormField';
import { validPassword, validationEmail, validationNameKirLat } from '../../../validationFields/validation';
import { registrationValue } from '../../../formValues/formValues';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../storeToolkit';
import { modalIsAction } from '../../../storeToolkit/isLogModalSlice';
import { postRegistrationResource } from '../../../utils/helpfulFunction';
import { RegistrationPageProps } from '../../../utils/types-and-interfaces';

import './RegistrationPage.scss';

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ setPopup }) => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [registrationForm, setRegistrationForm] = useState(registrationValue);
    const [registrationError, setRegistrationError] = useState('');
    const [equalPasswords, setEqualPasswords] = useState<string>('');

    const activeModal = useSelector((state: RootState) => state.logReg.modalAction);

    const getResource = async (url: string, name: string, email: string, password: string) => {
        const res = await postRegistrationResource(url, name, email, password);
        if (res) {
            setPopup('login');
            setRegistrationError('');
        } else {
            setRegistrationError('хтось натупив');
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getResource('https://shyfonyer.shop/api/v1/users', registrationForm.first_name, registrationForm.email, registrationForm.password,);
    }

    const setRegistrationValue = (key: string, value: string) => {
        setRegistrationForm({ ...registrationForm, [key]: value });
    }

    const first_nameRegistrationError = useMemo(() => validationNameKirLat(registrationForm.first_name), [registrationForm.first_name]);
    const emailRegistrationError = useMemo(() => validationEmail(registrationForm.email), [registrationForm.email]);
    const passwordRegistrationError = useMemo(() => validPassword(registrationForm.password), [registrationForm.password]);

    useEffect(() => {
        if (registrationForm.password !== registrationForm.confirmPassword) {
            setEqualPasswords('паролі не співпадають')
        } else {
            setEqualPasswords('');
        }
        if (registrationForm.password === registrationForm.confirmPassword && first_nameRegistrationError === 'nomistake' && emailRegistrationError === 'nomistake' && passwordRegistrationError === 'nomistake') {
            setDisabled(false);
        } else setDisabled(true);
    }, [registrationForm]);

    return (
        <div className={activeModal ? "modal active" : "modal"} onClick={() => dispatch(modalIsAction(false))}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div onClick={() => dispatch(modalIsAction(false))} className='close__modal__x'>X</div>

                <form onSubmit={handleSubmit} action="">
                    <div>
                        <h1>РЕЄСТРАЦІЯ</h1>
                        <FormField
                            placeholder='Введіть ваше ім’я'
                            label='Ім’я'
                            type='text'
                            name='first_name'
                            id='first_name'
                            value={registrationForm.first_name}
                            setChange={(value: any) => setRegistrationValue('first_name', value)}
                        />
                        <p className="red__mistake">
                            {first_nameRegistrationError === 'nomistake' ? '' : first_nameRegistrationError}
                        </p>
                        <FormField
                            placeholder='Введіть електронну пошту'
                            label='Електронна пошта'
                            type='email'
                            name='email'
                            id='email'
                            value={registrationForm.email}
                            setChange={(value: any) => setRegistrationValue('email', value)}
                        />
                        <p className="red__mistake">
                            {emailRegistrationError === 'nomistake' ? '' : emailRegistrationError}
                        </p>
                        <FormField
                            placeholder='Введіть пароль'
                            label='Пароль'
                            type='password'
                            name='password'
                            id='password'
                            value={registrationForm.password}
                            setChange={(value: any) => setRegistrationValue('password', value)}
                        />
                        <p className="red__mistake">
                            {passwordRegistrationError === 'nomistake' ? '' : passwordRegistrationError}
                        </p>
                        <FormField
                            placeholder='Повторіть пароль'
                            label='Повторіть пароль'
                            type='password'
                            name='confirmPassword'
                            id='confirmPassword'
                            value={registrationForm.confirmPassword}
                            setChange={(value: any) => setRegistrationValue('confirmPassword', value)}
                        />
                        <p className="red__mistake">
                            {equalPasswords}
                        </p>
                        <p className="red__mistake">{registrationError}</p>
                    </div>
                    <button className='modal__submit-registration' type="submit" disabled={disabled}>ЗАРЕЄСТРУВАТИСЯ</button>
                </form>
                <p>Вже маєте акаунт?<span onClick={() => setPopup('login')} className='login__registration'>Увійдіть!</span></p>
            </div>
        </div>
    );
}

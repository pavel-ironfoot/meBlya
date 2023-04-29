import { useEffect, useMemo, useState } from 'react';

import { FormField } from '../FormField';
import { validPassword, validationEmail, validationName, validationNameKir, validationNameKirLat } from '../../../validationFields/validation';

import './RegistrationPage.scss';
import { registrationValue } from '../../../formValues/formValues';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../storeToolkit';
import { modalIsAction } from '../../../storeToolkit/isLogModalSlice';

interface RegistrationPageProps {
    setPopup: (value:string) => void;
  }

export const RegistrationPage:  React.FC<RegistrationPageProps> = ({ setPopup }) => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [registrationForm, setRegistrationForm] = useState(registrationValue);

    const activeModal = useSelector((state: RootState) =>state.logReg.modalAction);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('registration is submit');
            console.log(registrationForm);
            fetch('https://shyfonyer.shop/api/v1/users', {
                method: 'POST',
                body: JSON.stringify({
                    full_name: registrationForm.first_name,
                    email: registrationForm.email,
                    password: registrationForm.password,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
                setPopup('login');        
    }

    const setRegistrationValue = (key: string, value: string) => {
        setRegistrationForm({ ...registrationForm, [key]: value });
    }

    const first_nameRegistrationError = useMemo(() => validationNameKirLat(registrationForm.first_name), [registrationForm.first_name]);
    const emailRegistrationError = useMemo(() => validationEmail(registrationForm.email), [registrationForm.email]);
    const passwordRegistrationError = useMemo(() => validPassword(registrationForm.password), [registrationForm.password]);
    const confirmPasswordError = useMemo(() => validPassword(registrationForm.confirmPassword), [registrationForm.confirmPassword]);

    useEffect(() => {
            if (registrationForm.password === registrationForm.confirmPassword && first_nameRegistrationError === 'nomistake' && emailRegistrationError === 'nomistake' && passwordRegistrationError === 'nomistake') {
                setDisabled(false);
            } else setDisabled(true);
    }, [ registrationForm]);

    return (
        <div className={activeModal ? "modal active" : "modal"} onClick={() => dispatch(modalIsAction(false))}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div onClick={() => dispatch(modalIsAction(false))} className='close__modal__x'>X</div>

                <form onSubmit={handleSubmit} action="">
                    <div>
                        <h1>Registration</h1>
                        <FormField
                            placeholder='Enter your name...'
                            label='Your name:'
                            type='text'
                            name='first_name'
                            id='first_name'
                            value={registrationForm.first_name}
                            setChange={(value:any) => setRegistrationValue('first_name', value)}
                        />
                        <p className="red__mistake">
                            {first_nameRegistrationError === 'nomistake' ? '' : first_nameRegistrationError}
                        </p>
                        <FormField
                            placeholder='Enter your email...'
                            label='Email:'
                            type='email'
                            name='email'
                            id='email'
                            value={registrationForm.email}
                            setChange={(value:any) => setRegistrationValue('email', value)}
                        />
                        <p className="red__mistake">
                            {emailRegistrationError === 'nomistake' ? '' : emailRegistrationError}
                        </p>
                        <FormField
                            placeholder='Enter your password...'
                            label='Enter the password:'
                            type='password'
                            name='password'
                            id='password'
                            value={registrationForm.password}
                            setChange={(value:any) => setRegistrationValue('password', value)}
                        />
                        <p className="red__mistake">
                            {passwordRegistrationError === 'nomistake' ? '' : passwordRegistrationError}
                        </p>
                        <FormField
                            placeholder='Confirm your password...'
                            label='Confirm the password:'
                            type='password'
                            name='confirmPassword'
                            id='confirmPassword'
                            value={registrationForm.confirmPassword}
                            setChange={(value:any) => setRegistrationValue('confirmPassword', value)}
                        />
                        <p className="red__mistake">
                            {confirmPasswordError === 'nomistake' ? '' : confirmPasswordError}
                        </p>
                    </div>
                    <button type="submit" disabled={disabled}>Submit</button>
                </form>
                <p>Have accaunt?<span onClick={()=>setPopup('login')} className='login__registration'>LogIn</span></p>
            </div>
        </div>
    );
}

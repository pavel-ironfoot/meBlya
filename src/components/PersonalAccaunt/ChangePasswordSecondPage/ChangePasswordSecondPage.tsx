import { useEffect, useMemo, useState } from 'react';
import './ChangePasswordSecondPage.scss';
import { validPassword } from '../../../validationFields/validation';
import { FormField } from '../../LogRegModal/FormField';
import { NavLink } from 'react-router-dom';



interface ChangePasswordType {
    password: string;
    confirmPassword: string;
}

interface ChangePasswordSecondPageProps {
    old_password: string;
}

export const ChangePasswordSecondPage: React.FC<ChangePasswordSecondPageProps> = ({ old_password }) => {
    const [disabled, setDisabled] = useState(true);
    const [equalPassword, setEqualPassword] = useState<boolean>(false);
    const [changePassword, setChangePassword] = useState<ChangePasswordType>({
        password: '',
        confirmPassword: '',
    });

    const handleSaveChanges = () => {
        if (localStorage.getItem('token')) {
            fetch(`https://shyfonyer.shop/api/v1/user/me`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.id);
                    // fetch(`https://shyfonyer.shop/api/v1/user/update_password/${data.id}?old_password=${old_password}&new_password=${changePassword.password}`, {
                       fetch(`https://shyfonyer.shop/api/v1/user/update_password/${data.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({
                            old_password: old_password,
                            new_password: changePassword.password,
                        })
                    })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.error(error))

                });

        }
    }

    const setRegistrationValue = (key: string, value: string) => {
        setChangePassword({ ...changePassword, [key]: value });
    }
    useEffect(() => {
        if (changePassword.password === changePassword.confirmPassword) {
            setEqualPassword(true);
        } else { setEqualPassword(false); }

        if (passwordRegistrationError === 'nomistake'  && changePassword.password === changePassword.confirmPassword) {
            setDisabled(false);
        } else { setDisabled(true); }
    }, [changePassword]);

    const passwordRegistrationError = useMemo(() => validPassword(changePassword.password), [changePassword.password]);

    return (
        <div className='change-password-second-page'>
            <FormField
                placeholder='Введіть новий пароль...'
                label='Введіть новий пароль:'
                type='password'
                name='change-password'
                id='change-password'
                value={changePassword.password}
                setChange={(value: any) => setRegistrationValue('password', value)}
            />
            <p className="red__mistake">
                {passwordRegistrationError === 'nomistake' ? '' : passwordRegistrationError}
            </p>
            <FormField
                placeholder='Повторіть новий пароль...'
                label='Повторіть новий пароль:'
                type='password'
                name='confirm-Password'
                id='confirm-Password'
                value={changePassword.confirmPassword}
                setChange={(value: any) => setRegistrationValue('confirmPassword', value)}
            />

            {(changePassword.password !== '' && equalPassword) ? <p></p> : <p className="red__mistake">паролі не співпадають</p>}

            <NavLink to={'/personal-accaunt/ok-page'}>
                <button  className='change-password-second-page__btn' onClick={handleSaveChanges} disabled={disabled}>ЗБЕРЕГТИ ЗМІНИ</button>
            </NavLink>
        </div>
    );
}


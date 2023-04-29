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
                    fetch(`https://shyfonyer.shop/api/v1/user/update_password/${data.id}?old_password=${old_password}&new_password=${changePassword.password}`, {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                        });
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

        if (passwordRegistrationError === 'nomistake' && confirmPasswordError === 'nomistake' && changePassword.password === changePassword.confirmPassword) {
            setDisabled(false);
        } else { setDisabled(true); }
    }, [changePassword]);

    const passwordRegistrationError = useMemo(() => validPassword(changePassword.password), [changePassword.password]);
    const confirmPasswordError = useMemo(() => validPassword(changePassword.confirmPassword), [changePassword.confirmPassword]);

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
            <p className="red__mistake">
                {confirmPasswordError === 'nomistake' ? '' : confirmPasswordError}
            </p>
            {(changePassword.password !== '' && equalPassword) ? <p></p> : <p className="red__mistake">паролі не співпадають</p>}

            <NavLink to={'/show-page/personal-accaunt/ok-page'}>
                <button onClick={handleSaveChanges} disabled={disabled}>ЗБЕРЕГТИ ЗМІНИ</button>
            </NavLink>
        </div>
    );
}


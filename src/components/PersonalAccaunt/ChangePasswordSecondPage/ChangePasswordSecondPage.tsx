import { useEffect, useMemo, useState } from 'react';
import { validPassword } from '../../../validationFields/validation';
import { FormField } from '../../LogRegModal/FormField';
import { NavLink } from 'react-router-dom';
import { ChangePasswordSecondPageProps, ChangePasswordType } from '../../../utils/types-and-interfaces';
import { saveChangesChangePasswordSecondPage } from '../../../utils/helpfulFunction';

import './ChangePasswordSecondPage.scss';

export const ChangePasswordSecondPage: React.FC<ChangePasswordSecondPageProps> = ({ old_password }) => {
    const [disabled, setDisabled] = useState(true);
    const [equalPassword, setEqualPassword] = useState<boolean>(false);
    const [changePassword, setChangePassword] = useState<ChangePasswordType>({
        password: '',
        confirmPassword: '',
    });

    const handleSaveChanges = async () => {
        await saveChangesChangePasswordSecondPage(old_password, changePassword);
    }

    const setRegistrationValue = (key: string, value: string) => {
        setChangePassword({ ...changePassword, [key]: value });
    }

    useEffect(() => {
        if (changePassword.password === changePassword.confirmPassword) {
            setEqualPassword(true);
        } else { setEqualPassword(false); }

        if (passwordRegistrationError === 'nomistake' && changePassword.password === changePassword.confirmPassword) {
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

            <NavLink to={'/show-page/personal-accaunt/ok-page'}>
                <button className='change-password-second-page__btn' onClick={handleSaveChanges} disabled={disabled}>ЗБЕРЕГТИ ЗМІНИ</button>
            </NavLink>
        </div>
    );
}


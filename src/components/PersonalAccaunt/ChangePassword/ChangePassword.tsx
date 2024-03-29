import { useEffect, useMemo, useState } from 'react';
import { ChangePasswordSecondPage } from '../ChangePasswordSecondPage';
import { FormField } from '../../LogRegModal/FormField';
import { validPassword } from '../../../validationFields/validation';

import './ChangePassword.scss';

export const ChangePassword: React.FC = () => {

    const [disabled, setDisabled] = useState<boolean>(true);
    const [firstSecondPage, setFirstSecondPage] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const [changeP, setChangeP] = useState({ pass: '' });
    const [changePasswordDone, setChangePasswordDone] = useState<string>('');

    const setRegistrationValue = (key: string, value: string) => {
        setChangeP({ ...changeP, [key]: value });
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setShowChangePassword(true);
        } else {
            setShowChangePassword(false);
        }
    }, []);

    const passwordRegistrationError = useMemo(() => validPassword(changeP.pass), [changeP.pass]);

    useEffect(() => {
        if (passwordRegistrationError === 'nomistake') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [passwordRegistrationError]);

    return (
        <div className='change-password'>
            {showChangePassword ? <>
                {changePasswordDone==='successfully'?<>
                <div>
                    <h1>
                        Пароль змінено успішно
                    </h1>
                </div>
                </>:<>
                {changePasswordDone===''?<>
                <div>
                    <FormField
                        placeholder='Введіть поточний пароль...'
                        label='Поточний пароль:'
                        type='password'
                        name='change-password-first'
                        id='change-password-first'
                        value={changeP.pass}
                        setChange={(value: any) => setRegistrationValue('pass', value)}
                    />
                    <p className="red__mistake">
                        {passwordRegistrationError === 'nomistake' ? '' : passwordRegistrationError}
                    </p>
                    {firstSecondPage ? <></> : <div>
                        <button disabled={disabled} onClick={() => setFirstSecondPage(true)} className='change-password__btn'>ПРОДОВЖИТИ</button>
                    </div>}
                    {firstSecondPage ? <ChangePasswordSecondPage setChangePasswordDone={setChangePasswordDone} old_password={changeP.pass} /> : <></>}
                </div>
                </>:<>
                <div>
                    <h1>
                        Пароль не змінено
                    </h1>
                </div>
                </>}
                </>}
            </> : <div>
                <p>щоб побачити інформацію потрібно зареєструватись</p>
            </div>}
        </div>
    );
}
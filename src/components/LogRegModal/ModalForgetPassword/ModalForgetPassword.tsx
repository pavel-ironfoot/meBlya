import { useEffect, useMemo, useState } from 'react';
import './ModalForgetPassword.scss';
import { loginValue } from '../../../formValues/formValues';
import { validationEmail } from '../../../validationFields/validation';
import { FormField } from '../FormField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../storeToolkit';
import { modalIsAction } from '../../../storeToolkit/isLogModalSlice';

interface ModalForgetPasswordProps {
    setPopup:(value:string)=>void;
}

export const ModalForgetPassword: React.FC<ModalForgetPasswordProps> = ({ setPopup }) => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [loginForm, setLoginForm] = useState(loginValue);
    const activeModal = useSelector((state: RootState) =>state.logReg.modalAction);

    const handleSubmit = async (e:any) => {

        localStorage.setItem('confirmEmail', loginForm.email);

        fetch('https://shyfonyer.shop/api/v1/user/password/forgot', {
            method: 'POST',
            body: JSON.stringify({
                email: loginForm.email,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        setPopup('forgotConfirm');
    }

    const setLoginValue = (key:string, value:string) => {
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
                        <h1>Login</h1>
                        <FormField
                            placeholder='Enter your email...'
                            label='Email:'
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
                    <button disabled={disabled} onClick={handleSubmit}>Get temporary Password</button>
                <p><span onClick={()=>setPopup('login')} className='login__registration'>I remember my password! </span> </p>
            </div>
        </div>
    );
}
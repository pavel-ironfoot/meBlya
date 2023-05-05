import { useEffect, useState } from 'react';
import loginIn from '../../../images/header/log-in.png'
import loginOut from '../../../images/header/log-out.png'
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../storeToolkit';
import { logOut } from '../../../storeToolkit/userSlice';
import { modalIsAction, userIsLoggin } from '../../../storeToolkit/isLogModalSlice';
import { LogReg } from '../LogReg';

import './AllPopup.scss';

export const AllPopup = () => {
    const dispatch = useDispatch();
    
    const activeModal = useSelector((state: RootState) =>state.logReg.modalAction);
    const isLog = useSelector((state: RootState) =>state.logReg.isLog);

    const [whoIsLogged, setWhoIsLogged] = useState<any>();

    const logOutFunction = () => {
        fetch('https://shyfonyer.shop/api/v1/deauth/signout_user', {
            method: 'DELETE',
        });
        dispatch(logOut());
        localStorage.removeItem('token');
        localStorage.removeItem('loginUser');
        dispatch(userIsLoggin(false));
    }


    useEffect(() => {
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined') {
        dispatch(userIsLoggin(true));
    } else { dispatch(userIsLoggin(false)) }

        if (localStorage.getItem('loginUser') !== null && localStorage.getItem('loginUser') !== 'undefined') {
            setWhoIsLogged(localStorage.getItem('loginUser'));

        } else { setWhoIsLogged('гість'); }
    }, [activeModal, isLog]);

    const showModal = () => {
        dispatch(modalIsAction(true));
    }

    return (
        <div className='all-popup'>
            <div className="login-logic">
                <h3>{whoIsLogged}</h3>
                {(isLog) ?
                    <img className='login-logic__login-img' src={loginOut} alt='login in' onClick={logOutFunction} />
                    :
                    <img className='login-logic__login-img' src={loginIn} alt='login out' onClick={showModal} />
                }
            </div>
            <LogReg />
        </div>
    );
}
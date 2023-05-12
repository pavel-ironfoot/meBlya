import { useDispatch, useSelector } from 'react-redux';
import { modalIsAction } from '../../../storeToolkit/isLogModalSlice';

import './NeedToLogin.scss';


interface ModalForgetPasswordProps {
    setActive:(value:boolean)=>void;
    active:boolean;
}

export const NeedToLogin: React.FC<ModalForgetPasswordProps> = ({active,setActive}) => {
    
    const dispatch = useDispatch();
    // const activeModal = useSelector((state: RootState) =>state.logReg.modalAction);

    const showModal = () => {
        setActive(false);
        dispatch(modalIsAction(true));
    }

    return (
        <div className={active ? "modalNeed activeNeed" : "modalNeed"} onClick={() => setActive(false)}>
            <div className="modal__content-need-to-login" onClick={e => e.stopPropagation()}>
                <div onClick={() => setActive(false)} className='close__modal-to-login__x'><h1>X</h1></div>
               
                    <div className='modal__content-need-to-login__main-content'>
                        <h1>Вітаємо на меБля!</h1>
                        <p>Щоб рухатись далі будь ласка, авторизуйтесь.</p>
                        <button onClick={showModal} className=''>АВТОРИЗАЦІЯ</button>
                    </div>

            </div>
        </div>
    );
}
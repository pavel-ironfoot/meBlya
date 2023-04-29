import { useEffect, useState } from "react";
import { ModalLogin } from "../ModalLogin";
import { RegistrationPage } from "../RegistrationPage";
import { ModalForgetPassword } from "../ModalForgetPassword";
import { ConfirmForgotPassword } from "../ConfirmForgotPassword";
import { useSelector } from "react-redux";
import { RootState } from "../../../storeToolkit";



export const LogReg = () => {
    const [modalType, setModalType] = useState('registration');
    
    const activeModal = useSelector((state: RootState) =>state.logReg.modalAction);
    
    useEffect(()=>{
        if(activeModal===false)setModalType('registration');
    },[activeModal])
    
    const setPopup = (value:string) => {
        setModalType(value);
    }
    return (
        <div>
            {modalType === 'registration' ?
                <RegistrationPage
                    setPopup={setPopup}
                /> : <></>}
            {modalType === 'login' ?
                <ModalLogin
                    setPopup={setPopup}
                /> : <></>}
            {modalType === 'forgot' ?
                <ModalForgetPassword
                    setPopup={setPopup}
                /> : <></>}
            {modalType === 'forgotConfirm' ?
                <ConfirmForgotPassword
                    setPopup={setPopup}
                /> : <></>}
        </div>
    );
}

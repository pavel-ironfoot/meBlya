import { useEffect, useMemo, useState } from 'react';
import { FormField } from '../../LogRegModal/FormField';
import './Contactinformation.scss';
import { contactInformationValue } from '../../../formValues/formValues';
import { validationEmail, validationNameKirLat, validationNumber } from '../../../validationFields/validation';
import { useDispatch } from 'react-redux';
import { addContactInformation } from '../../../storeToolkit/informationSlice';
import { changeInformationConfirm } from '../../../storeToolkit/changeDisabledSlice';

interface ContactinformationType {
    first_name:string;
    second_name:string;
    phone_number:string;
    email:string;
    callMe:boolean;
}
interface ContactinformationProps {
    openDelivery: (value:boolean) => void;
    openPayment: (value:boolean) => void;
    openInformation: (value:boolean) => void;
  }
export const Contactinformation:React.FC<ContactinformationProps> = ({openDelivery,openPayment})=>{
    const dispatch = useDispatch();
    const [contactInformationForm, setContactInformationForm] = useState<ContactinformationType>(contactInformationValue);


    const setRegistrationValue = (key: string, value: string) => {
        setContactInformationForm({ ...contactInformationForm, [key]: value });
    }

    const handlePricesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        if (checked) {
            setContactInformationForm({ ...contactInformationForm, 'callMe': false })
        } else {
            setContactInformationForm({ ...contactInformationForm, 'callMe': true })
        }
    }

    const handleInformationContinue = () => {
        // openInformation(false);
        openDelivery(true);
        openPayment(false);
        dispatch(addContactInformation(contactInformationForm));
    }
    useEffect(()=>{
        if(first_nameRegistrationError==='nomistake' && second_nameRegistrationError==='nomistake' && emailRegistrationError==='nomistake' && numberRegistrationError==='nomistake'){
            dispatch(changeInformationConfirm(true));
        }else{
            dispatch(changeInformationConfirm(false));
        }
        
    },[contactInformationForm]);

    const first_nameRegistrationError = useMemo(() => validationNameKirLat(contactInformationForm.first_name), [contactInformationForm.first_name]);
    const second_nameRegistrationError = useMemo(() => validationNameKirLat(contactInformationForm.second_name), [contactInformationForm.second_name]);
    const emailRegistrationError = useMemo(() => validationEmail(contactInformationForm.email), [contactInformationForm.email]);
    const numberRegistrationError = useMemo(() => validationNumber(contactInformationForm.phone_number), [contactInformationForm.phone_number]);
    
    return (
        <div className='contact-information'>
            <p>*Усі поля обов’язкові для заповнення</p>
            <div className='contact-information__main-block'>
                <div className='contact-information__input-block'>
                    <FormField
                        placeholder='Вкажіть ваше ім’я'
                        label='Ім’я'
                        type='text'
                        name='first_name'
                        id='first_name'
                        value={contactInformationForm.first_name}
                        setChange={(value: any) => setRegistrationValue('first_name', value)}
                    />
                    <p className="red__mistake">
                        {first_nameRegistrationError === 'nomistake' ? '' : first_nameRegistrationError}
                    </p>
                    <FormField
                        placeholder='Номер телефону'
                        label='Вкажіть номер телефону'
                        type='number'
                        name='number'
                        id='number'
                        value={contactInformationForm.phone_number}
                        setChange={(value) => setRegistrationValue('phone_number', value)}
                    />
                    <p className="red__mistake">
                        {numberRegistrationError === 'nomistake' ? '' : numberRegistrationError}
                    </p>
                </div>
                <div className='contact-information__input-block'>
                    <FormField
                        placeholder='Вкажіть ваше прізвище'
                        label='Прізвище'
                        type='text'
                        name='second_name'
                        id='second_name'
                        value={contactInformationForm.second_name}
                        setChange={(value: any) => setRegistrationValue('second_name', value)}
                    />
                    <p className="red__mistake">
                        {second_nameRegistrationError === 'nomistake' ? '' : second_nameRegistrationError}
                    </p>
                    <FormField
                        placeholder='Вкажіть email'
                        label='Електронна пошта'
                        type='email'
                        name='email'
                        id='email'
                        value={contactInformationForm.email}
                        setChange={(value: any) => setRegistrationValue('email', value)}
                    />
                    <p className="red__mistake">
                        {emailRegistrationError === 'nomistake' ? '' : emailRegistrationError}
                    </p>


                </div>
            </div>
            <input onChange={handlePricesChange} type="checkbox" name="checkbox-confirm" id="checkbox-confirm" />
                    <label className='contact-information__label' htmlFor="checkbox-confirm">Не телефонуйте мені для підтвердження замовлення</label>
                    <br />
                    <button onClick={handleInformationContinue}>ПРОДОВЖИТИ</button>

        </div>
    );
}
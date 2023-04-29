import { useEffect, useMemo, useState } from 'react';
import { FormField } from '../../LogRegModal/FormField';
import './EditPersonalData.scss';
import { validationEmail, validationNameKir, validationNameKirLat, validationNumber } from '../../../validationFields/validation';
import { NavLink } from 'react-router-dom';

interface AllPersonalDataType {
    id: number;
    full_name: string;
    email: string;
    role: string;
    last_name: string;
    patronymic: string;
    phone_number: string;
}
interface EditPersonalDataProps {
    setChangeMain: (value:boolean) => void;
    id:number;
  }

export const EditPersonalData: React.FC<EditPersonalDataProps> = ({id,setChangeMain}) => {
    const [disabled,setDisabled] = useState<boolean>(true);
    const [personalInformationForm, setPersonalInformationForm] = useState<AllPersonalDataType>({
        id: 0,
        full_name: '',
        email: '',
        role: '',
        last_name: '',
        patronymic: '',
        phone_number: '',
    });

    const setRegistrationValue = (key: string, value: string) => {
        setPersonalInformationForm({ ...personalInformationForm, [key]: value });
    }

    const handleSaveChanges = () =>{
        if (localStorage.getItem('token')) {
            fetch(`https://shyfonyer.shop/api/v1/users/${id}?[user]full_name=${personalInformationForm.full_name}&[user]last_name=${personalInformationForm.last_name}&[user]patronymic=${personalInformationForm.patronymic}&[user]email=${personalInformationForm.email}&[user]phone_number=${personalInformationForm.phone_number}`, {
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
                setChangeMain(false);
        } 
        console.log(personalInformationForm);
    }

    const first_nameRegistrationError = useMemo(() => validationNameKirLat(personalInformationForm.full_name), [personalInformationForm.full_name]);
    const second_nameRegistrationError = useMemo(() => validationNameKirLat(personalInformationForm.last_name), [personalInformationForm.last_name]);
    const third_nameRegistrationError = useMemo(() => validationNameKirLat(personalInformationForm.patronymic), [personalInformationForm.patronymic]);
    const numberRegistrationError = useMemo(() => validationNumber(personalInformationForm.phone_number), [personalInformationForm.phone_number]);
    const emailRegistrationError = useMemo(() => validationEmail(personalInformationForm.email), [personalInformationForm.email]);

    useEffect(()=>{
        if(first_nameRegistrationError==='nomistake' && second_nameRegistrationError==='nomistake' && third_nameRegistrationError==='nomistake' && numberRegistrationError==='nomistake' && emailRegistrationError==='nomistake'){
            setDisabled(false);
        }else{
            setDisabled(true);
        }
    },[personalInformationForm])

    return (
        <div className='my-orders'>
            <FormField
                placeholder='Ім’я...'
                label='Ім’я:'
                type='text'
                name='full_name'
                id='full_name'
                value={personalInformationForm.full_name}
                setChange={(value: any) => setRegistrationValue('full_name', value)}
            />
            <p className="red__mistake">
                {first_nameRegistrationError === 'nomistake' ? '' : first_nameRegistrationError}
            </p>
            <FormField
                placeholder='Прізвище...'
                label='Прізвище'
                type='text'
                name='last_name'
                id='last_name'
                value={personalInformationForm.last_name}
                setChange={(value: any) => setRegistrationValue('last_name', value)}
            />
            <p className="red__mistake">
                {second_nameRegistrationError === 'nomistake' ? '' : second_nameRegistrationError}
            </p>
            <FormField
                placeholder='По батькові...'
                label='По батькові:'
                type='text'
                name='patronymic'
                id='patronymic'
                value={personalInformationForm.patronymic}
                setChange={(value: any) => setRegistrationValue('patronymic', value)}
            />
            <p className="red__mistake">
                {third_nameRegistrationError === 'nomistake' ? '' : third_nameRegistrationError}
            </p>
            <div>
                <h1>КОНТАКТНІ ДАНІ</h1>
                <FormField
                    placeholder='Type here...'
                    label='Номер телефона'
                    type='number'
                    name='number'
                    id='number'
                    value={personalInformationForm.phone_number}
                    setChange={(value) => setRegistrationValue('phone_number', value)}
                />
                <p className="red__mistake">
                    {numberRegistrationError === 'nomistake' ? '' : numberRegistrationError}
                </p>
                <FormField
                    placeholder='Enter your email...'
                    label='E-mail:'
                    type='email'
                    name='e-mail'
                    id='e-mail'
                    value={personalInformationForm.email}
                    setChange={(value: any) => setRegistrationValue('email', value)}
                />
                <p className="red__mistake">
                    {emailRegistrationError === 'nomistake' ? '' : emailRegistrationError}
                </p>
                <NavLink to={'/show-page/personal-accaunt/ok-page'}>
                    <button disabled={disabled} onClick={handleSaveChanges}>ЗБЕРЕГТИ ЗМІНИ</button>
                </NavLink>
            </div>
        </div>
    );
}
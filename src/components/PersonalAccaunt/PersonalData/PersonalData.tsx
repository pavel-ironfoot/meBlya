import { useEffect, useState } from 'react';
import './PersonalData.scss';
import { EditPersonalData } from '../EditPersonalData';

interface AllPersonalDataType {
    id: number;
    full_name: string;
    email: string;
    role: string;
    last_name: string;
    patronymic: string;
    phone_number: string | number;
}

export const PersonalData: React.FC = () => {
    const [allPersonalData, setAllPersonalData] = useState<AllPersonalDataType>({
        id: 0,
        full_name: '',
        email: '',
        role: '',
        last_name: '',
        patronymic: '',
        phone_number: '',
    });
    const [showPersonalData, setShowPersonalData] = useState<boolean>(false);
    const [changeMain, setChangeMain] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setShowPersonalData(true);
            fetch(`https://shyfonyer.shop/api/v1/user/me`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setAllPersonalData(data);
                });
        } else {
            setShowPersonalData(false);
        }
    }, []);

    return (
        <div className='personal-data'>
            {showPersonalData ?
            <div>{changeMain?<div>
                <EditPersonalData id={allPersonalData.id} setChangeMain={setChangeMain}/>
            </div>:<div>
            <h3>ОСОБИСТІ ДАНІ</h3>
            <div className='personal-data__personal'>
                <div className='personal-data__elements'>
                    <p>Ім’я</p>
                    <p>По батькові</p>
                    <p>Прізвище</p>
                </div>
                <div className='personal-data__values' >
                    <p>{allPersonalData.full_name?allPersonalData.full_name:'не вказано'}</p>
                    <p>{allPersonalData.patronymic?allPersonalData.patronymic:'не вказано'}</p>
                    <p>{allPersonalData.last_name?allPersonalData.last_name:'не вказано'}</p>
                </div>
            </div>

            <h3>КОНТАКТНІ ДАНІ</h3>
            <div className='personal-data__personal'>
                <div className='personal-data__elements'>
                    <p>Номер телефона</p>
                    <p>E-mail</p>
                </div>
                <div className='personal-data__values' >
                    <p>{allPersonalData.phone_number?allPersonalData.phone_number:'не вказано'}</p>
                    <p>{allPersonalData.email?allPersonalData.email:'не вказано'}</p>
                </div>
            </div>
                <button onClick={()=>setChangeMain(true)} className='personal-data__edit'>РЕДАГУВАТИ</button>
        </div>}</div>
             : <div>
                <p>щоб побачити інформацію потрібно зареєструватись</p>
            </div>}
        </div>
    );
}
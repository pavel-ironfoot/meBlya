import { Route, Routes } from 'react-router';
import { PersonalData } from '../PersonalData';
import { MyOrders } from '../MyOrders';
import { ChangePassword } from '../ChangePassword';
import { Aside } from '../Aside';
import { OkPage } from '../OkPage';
import { ErrorPage } from '../ErrorPage';

import './AccauntMain.scss';

export const AccauntMain = () => {
    return (
        <div className='accaunt-main'>
            <div className='accaunt-main__title'>
                <h1 className='accaunt-main__h1'>ОСОБИСТИЙ КАБІНЕТ</h1>
            </div>
            <div className='accaunt-main__container'>
                <Aside />
                <div className='accaunt-main__main'>
                    <Routes>
                        <Route path='/personal-data' element={<PersonalData />} />
                        <Route path="/my-orders" element={<MyOrders />} />
                        <Route path='/change-password' element={<ChangePassword />} />
                        <Route path='/ok-page' element={<OkPage />} />
                        <Route path='/error-page' element={<ErrorPage />} />
                        <Route path='*' element={<PersonalData />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
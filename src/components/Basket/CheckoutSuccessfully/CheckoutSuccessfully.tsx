import { NavLink } from 'react-router-dom';

import './CheckoutSuccessfully.scss';

export const CheckoutSuccessfully =() =>{
    return (
        <div>
            <div className='checkout-successfully'>
                <div className='checkout-successfully__in'>
                    <h1>Дякуємо за замовлення!</h1>
                    <p>Ваш товар відправлено для обробки спеціалістам!</p>
                    <NavLink to={'/catalog/main-catalog'}>
                        <button>ПОВЕРНУТИСЬ ДО КАТАЛОГУ</button>
                    </NavLink>
                    <br />
                    <NavLink to={'/show-page/personal-accaunt/my-orders'}>
                        <button>ПЕРЕГЛЯНУТИ СВОЇ ЗАМОВЛЕННЯ</button>
                    </NavLink>
                </div>                
            </div>
        </div>
    );
}
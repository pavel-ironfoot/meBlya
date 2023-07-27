import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../../storeToolkit';
import { DataBasketElem } from '../../../utils/types-and-interfaces';
import { createAnOrderFunction, checkoutBasketFunction } from '../../../utils/helpfulFunction';

import './CheckoutBasket.scss';

export const CheckoutBasket = () =>{
    const [dataBasket, setDataBasket] = useState<DataBasketElem[] | []>([]);
    const checkoutData = useSelector((state: any)=>state.checkout);
    const setDisabledFrom = useSelector((state: RootState)=>state.disabled.confirmInformation);
    const setDeliveryFrom = useSelector((state: RootState)=>state.disabled.confirmDelivery);
    const setInformationFrom = useSelector((state: RootState)=>state.disabled.confirmOrder);

    let showTotalPrice = 0;
    const showOrders = dataBasket.sort((a, b) => +a.id > +b.id ? 1 : -1).map((elem) => {
        showTotalPrice += +elem.total_price;
        return <div key={elem.article_number + elem.total_price + elem.product_color.name} className='checkout-basket__one_order'>
            <div>
                <img src={elem.product_photo} alt="facade" />
            </div>
            <div className='checkout-basket__one_order__right-block'>
                <h1>Фасад {elem.company} {elem.product_name}</h1>
                <p>Кількість: <span>{elem.quantity}</span></p>
                <p>Розмір: <span>{elem.product_length} x {elem.product_width} мм</span></p>
                <p>Колір: <span>{elem.product_color.name}</span></p>
                <p>ціна за м2: <span> {elem.product_price} грн</span></p>
                <p>До сплати: <span> {elem.total_price} грн</span></p>
            </div>
        </div>
    });

    const handleCreateAnOrder = async () =>{
        await createAnOrderFunction(checkoutData);
    }

    useEffect(() => {
        checkoutBasketFunction(setDataBasket);
    }, []);

    return (
        <div className='checkout-basket'>
            {showOrders}
            <p className='checkout-basket__total_summ'>Загальна сумма: {showTotalPrice} грн</p>
            <NavLink to={'/show-page/checkout-successfully'}><button disabled={!(setDisabledFrom && setDeliveryFrom && setInformationFrom)} className='checkout-basket__submit' onClick={handleCreateAnOrder}>ОФОРМИТИ ЗАМОВЛЕННЯ</button></NavLink>
        </div>
    );
}
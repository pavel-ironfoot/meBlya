import { useState } from 'react';
import { Delivery } from '../Delivery';
import { Payment } from '../Payment';
import { CheckoutBasket } from '../CheckoutBasket';
import { Contactinformation } from '../Contactinformation';

import './Checkout.scss';

export const Checkout: React.FC = () => {
    const [showInformation, setShowInformation] = useState<boolean>(false);
    const [showDelivery, setShowDelivery] = useState<boolean>(false);
    const [showPayment, setShowPayment] = useState<boolean>(false);

    return (
        <div className='checkout'>
            <div className='checkout-left'>
                <h1 className='checkout-left__open-title checkout-left__open-title-cursor' onClick={() => {
                    setShowInformation(true);
                    setShowDelivery(false);
                    setShowPayment(false);
                }}>
                    1.  Контактна інформація
                </h1>
                {showInformation ? <Contactinformation
                    openInformation={setShowInformation}
                    openPayment={setShowPayment}
                    openDelivery={setShowDelivery} /> : <></>}
                <h1 className='checkout-left__open-title' >
                    2. Доставка
                </h1>
                {showDelivery ? <Delivery
                    openInformation={setShowInformation}
                    openPayment={setShowPayment}
                    openDelivery={setShowDelivery} /> : <></>}
                <h1 className='checkout-left__open-title' >
                    3.  Оплата
                </h1>
                {showPayment ? <Payment /> : <></>}
            </div>
            <div className="checkout-right">
                <CheckoutBasket />
            </div>
        </div>
    );
}
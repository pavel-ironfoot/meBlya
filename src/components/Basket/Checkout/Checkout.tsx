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
                <h1 onClick={() => {
                    setShowInformation(true);
                    setShowDelivery(false);
                    setShowPayment(false);
                }}>
                    1.Contact information
                </h1>
                {showInformation ? <Contactinformation
                    openInformation={setShowInformation}
                    openPayment={setShowPayment}
                    openDelivery={setShowDelivery} /> : <></>}
                <h1 onClick={() => {
                    setShowInformation(false);
                    setShowDelivery(true);
                    setShowPayment(false);
                }}>
                    2.Delivery
                </h1>
                {showDelivery ? <Delivery
                    openInformation={setShowInformation}
                    openPayment={setShowPayment}
                    openDelivery={setShowDelivery} /> : <></>}
                <h1 onClick={() => {
                    setShowInformation(false);
                    setShowDelivery(false);
                    setShowPayment(true);
                }}>
                    3.Payment
                </h1>
                {showPayment ? <Payment /> : <></>}
            </div>
            <div className="checkout-right">
                <CheckoutBasket />
            </div>
        </div>
    );
}
import { useEffect, useState } from 'react';
import './Payment.scss';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../../storeToolkit/informationSlice';
import { changeDisabledConfirm } from '../../../storeToolkit/changeDisabledSlice';


export const Payment: React.FC = () => {
    const dispatch = useDispatch();
    const [paymentType, setPaymentType] = useState<number>(0);

    const handlePaymentChange = (e: any) => {
        const { value, checked } = e.target;
        if (checked) {
            setPaymentType(value);
            dispatch(changeDisabledConfirm(true));
        }
    }


    useEffect(()=>{
            dispatch(addAddress(paymentType));
            console.log(paymentType)
    },[paymentType]);

    return (
        <div className='payment'>
            <input onChange={handlePaymentChange} type="radio" name='payment-cash' id="cash" value={0} />
            <label className='payment-label' htmlFor="cash">Готівкою при отриманні</label>
            <br />
            <input onChange={handlePaymentChange} type="radio" name='payment-cash' id="card" value={1} />
            <label className='payment-label' htmlFor="card">Безготівковий розрахунок при отриманні</label>
        </div>
    );
}
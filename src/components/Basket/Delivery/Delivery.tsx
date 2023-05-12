import { useMemo, useState, useEffect } from 'react';
import { FormField } from '../../LogRegModal/FormField';
import { addressValues } from '../../../formValues/formValues';
import { useDispatch } from 'react-redux';
import { addDataDelivery } from '../../../storeToolkit/informationSlice';
import { validationEntrance, validationStreetKirLat } from '../../../validationFields/validation';


import './Delivery.scss';
import { changeDeliveryConfirm } from '../../../storeToolkit/changeDisabledSlice';


interface addressValuesType {
    street: string;
    entrance: string;
    house: string;
    apartment: string;
    comment: string;
}
interface DeliveryProps {
    openDelivery: (value: boolean) => void;
    openPayment: (value: boolean) => void;
    openInformation: (value: boolean) => void;
}

export const Delivery: React.FC<DeliveryProps> = ({ openInformation, openDelivery, openPayment }) => {
    const dispatch = useDispatch();
    const [deliveryType, setDeliveryType] = useState<string>('pickup');
    const [addressForm, setAddressForm] = useState<addressValuesType>(addressValues);

    const handleDeliveryChange = (e: any) => {
        const { value, checked } = e.target;
        if (checked) {
            setDeliveryType(value);
            if(value==='pickup'){dispatch(changeDeliveryConfirm(true));}else{dispatch(changeDeliveryConfirm(false))}
        }
    }
    const handleDeliveryContinue = () => {
        if (deliveryType === 'pickup') {
            console.log('byself');
            dispatch(addDataDelivery({ delivery_location_id: 0 }));
        } else {
            dispatch(addDataDelivery({ ...addressForm, delivery_location_id: 1 }));
            console.log({ ...addressForm, delivery_location_id: 1 });
        }
        // openInformation(false);
        // openDelivery(false);
        openPayment(true);
    }
    const handleCommentChange = (e: any) => {
        setAddressForm({ ...addressForm, comment: e.target.value });
    }
    const setAddressValue = (key: string, value: string) => {
        setAddressForm({ ...addressForm, [key]: value });
    }


    const streetError = useMemo(() => validationStreetKirLat(addressForm.street), [addressForm.street]);
    const entranceError = useMemo(() => validationEntrance(addressForm.entrance), [addressForm.entrance]);
    const apartmentError = useMemo(() => validationEntrance(addressForm.apartment), [addressForm.apartment]);
    const houseError = useMemo(() => validationEntrance(addressForm.house), [addressForm.house]);

    useEffect(()=>{
        if(deliveryType==='address'){
            console.log('last test')
            console.log('lasssst',entranceError);
            if(streetError==='nomistake' && entranceError==='nomistake' && apartmentError==='nomistake' && houseError==='nomistake'){
                dispatch(changeDeliveryConfirm(true));
            }else{
                dispatch(changeDeliveryConfirm(false));
            }
        }

        
    },[addressForm]);

    return (
        <div className='delivery'>

            <div>
                <input onChange={handleDeliveryChange} type="radio" name='delivery-address' id="delivery-address" value={'pickup'} />
                <label className='delivery__label-checkbox' htmlFor="delivery-address">Самовивіз із магазину</label>
                <p className='delivery__label-p'>місто Черкаси, вул. П. Сагайдачного 150/2, 18005</p>
                <br />
                <input className='delivery__label-checkbox' onChange={handleDeliveryChange} type="radio" name='delivery-address' id="delivery-specified" value={'address'} />
                <label className='delivery__label-checkbox' htmlFor="delivery-specified">Доставка за вказаною адресою в місті Черкаси</label>

                {deliveryType === 'pickup' ? <></> : <>

                    <div className='delivery__main-block'>
                        <div className='delivery__input-block'>
                            <FormField
                                placeholder='Вкажіть номер вашого під’їзду'
                                label='Номер під’їзду'
                                type='text'
                                name='entrance'
                                id='entrance'
                                value={addressForm.entrance}
                                setChange={(value: any) => setAddressValue('entrance', value)}
                            />
                            <p className="red__mistake">
                                {entranceError === 'nomistake' ? '' : entranceError}
                            </p>
                            <FormField
                                placeholder='Вкажіть вашу вулицю'
                                label='Вулиця:'
                                type='text'
                                name='street'
                                id='street'
                                value={addressForm.street}
                                setChange={(value: any) => setAddressValue('street', value)}
                            />
                            <p className="red__mistake">
                                {streetError === 'nomistake' ? '' : streetError}
                            </p>
                        </div>
                        <div className='delivery__input-block'>
                            <FormField
                                placeholder='Вкажіть номер вашого будинку'
                                label='Номер Номер будинку'
                                type='text'
                                name='house'
                                id='house'
                                value={addressForm.house}
                                setChange={(value: any) => setAddressValue('house', value)}
                            />
                            <p className="red__mistake">
                                {houseError === 'nomistake' ? '' : houseError}
                            </p>
                            <FormField
                                placeholder='Вкажіть номер квартири'
                                label='Номер квартири'
                                type='text'
                                name='apartment'
                                id='apartment'
                                value={addressForm.apartment}
                                setChange={(value: any) => setAddressValue('apartment', value)}
                            />
                            <p className="red__mistake">
                                {apartmentError === 'nomistake' ? '' : apartmentError}
                            </p>
                        </div>
                    </div>


                    <br />
                    <label className='delivery__textarea' htmlFor="comment">Додати коментар</label>
                    <br />
                    <textarea value={addressForm.comment} onChange={handleCommentChange} name="comment" id="comment" cols={30} rows={5}></textarea>
                    <br />
                </>}
                <div>
                    <button onClick={handleDeliveryContinue}>ПРОДОВЖИТИ</button>
                </div>
            </div>
        </div>
    );
}
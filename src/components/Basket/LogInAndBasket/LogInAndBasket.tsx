import { useEffect, useState } from "react";
import { AllPopup } from "../../LogRegModal/AllPopup";
import { BasketContainer } from "../BasketContainer/BasketContainer";
import basketLogo from '../../../images/header/basket-logo.png';

import './LogInAndBasket.scss';
import { useDispatch, useSelector } from "react-redux";
import { setCounterBasketElems } from "../../../storeToolkit/counterBasketSlice";

export const LogInAndBasket =() =>{
    const dispatch = useDispatch();

    const [showBasket, setShowBasket] = useState(false);
    const [basketLength,setBasketLength] = useState(0);
    const [showBasketCounter,setShowBasketCounter] = useState(false);
    const getCounter = useSelector((state:any)=>state.counter.basketCounter);

    useEffect(() => {

        if (localStorage.getItem('token')) {
            setShowBasketCounter(true);
            fetch(`https://shyfonyer.shop/api/v1/cart_items`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setCounterBasketElems(data.length));
                    setBasketLength(data.length)
                    console.log('basket length',data.length);
                });
        } else {
            setShowBasketCounter(false)
        }
    }, [showBasket]);

    return (
        <div className="login-basket">
        <div>
            <AllPopup />
        </div>
        <div  className="login-basket__basket">
            <img className='login-basket__basket__image' onClick={() => setShowBasket(true)} src={basketLogo} alt="basket" />
            <BasketContainer active={showBasket} setActive={setShowBasket} />
            {showBasketCounter?<span className='login-basket__basket__counter'>{getCounter===0?'':getCounter}</span>:<></>} 
        </div>
    </div>
    );
}
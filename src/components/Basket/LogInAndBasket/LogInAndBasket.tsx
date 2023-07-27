import { useEffect, useState } from "react";
import { AllPopup } from "../../LogRegModal/AllPopup";
import { BasketContainer } from "../BasketContainer/BasketContainer";
import basketLogo from '../../../images/header/basket-logo.png';
import { useDispatch, useSelector } from "react-redux";
import { setCounterBasketElems } from "../../../storeToolkit/counterBasketSlice";
import { loginAndBasketUseEffect } from "../../../utils/helpfulFunction";

import './LogInAndBasket.scss';

export const LogInAndBasket =() =>{
    const dispatch = useDispatch();

    const [showBasket, setShowBasket] = useState(false);
    const [basketLength,setBasketLength] = useState(0);
    const [showBasketCounter,setShowBasketCounter] = useState(false);
    const getCounter = useSelector((state:any)=>state.counter.basketCounter);

    useEffect(() => {
        loginAndBasketUseEffect(setShowBasketCounter,setBasketLength,setCounterBasketElems,dispatch);
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
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import basketLogo from '../../../images/header/basket-logo.png';
import { BasketContainerProps, DataBasketElem } from '../../../utils/types-and-interfaces';
import { basketContainerUseEffectRequest, deleteOneOrderFunction, handleDecreaseRequest, handleIncreaseFunctionRequest } from '../../../utils/helpfulFunction';

import './BasketContainer.scss';


export const BasketContainer: React.FC<BasketContainerProps> = ({ active, setActive }) => {

    const [showBasketMenu, setShowBasketMenu] = useState(false);
    const [dataBasket, setDataBasket] = useState<DataBasketElem[] | []>([]);

    useEffect(() => {
        basketContainerUseEffectRequest(setShowBasketMenu, setDataBasket)
    }, [active]);

    const deleteOneOrder = async (id: number) => {
        await deleteOneOrderFunction(id, setDataBasket);
    }

    const handleIncrease = async (id: number) => {
        await handleIncreaseFunctionRequest(id, setDataBasket);
    }

    const handleDecrease = async (id: number) => {
        await handleDecreaseRequest(id, setDataBasket);
    }

    let showTotalPrice = 0;

    const showOrders = (dataBasket && dataBasket.length > 0) ? dataBasket.sort((a, b) => +a.id > +b.id ? 1 : -1).map((elem) => {
        showTotalPrice += +elem.total_price;
        return <div key={elem.article_number + elem.total_price} className='basket-container__one-order'>
            <div>
                <img src={elem.product_photo} alt="facade" />
            </div>
            <div className='basket-container__one-order__right-block'>
                <div className='basket-container__one-order__header'>
                    <div>
                        <h1>Фасад {elem.company} {elem.product_name}</h1></div>
                    <div>
                        <button onClick={() => deleteOneOrder(elem.id)}>+</button>
                    </div>
                </div>

                <p>Артикул: {elem.article_number}</p>

                <div className='basket-container__one-order__footer'>
                    <div>
                        <p>Розмір: <span>{elem.product_length} x {elem.product_width}</span> </p>
                        <p>Колір:  <span>{elem.product_color.name}</span></p>
                    </div>
                    <div>
                        <p>Вартість: <span>{elem.product_price} грн</span> </p>
                        <p>Сума: <span>{Math.round(+elem.total_price * 100) / 100} грн</span> </p>
                    </div>
                    <div className='basket-container__one-order__counter'>
                        <div><span className='basket-container__one-order__counter-cursor' onClick={() => handleDecrease(elem.id)}>-</span><span>{elem.quantity}</span><span className='basket-container__one-order__counter-cursor' onClick={() => handleIncrease(elem.id)}>+</span></div>
                    </div>
                </div>

            </div>
        </div>
    }) : [];

    return (
        <div onClick={() => setActive(false)} className={active ? "basket-container active-basket" : "basket-container"}>
            <div onClick={e => e.stopPropagation()} className='basket-container__content'>
                <div className='basket-container__close-button'>
                    <div className='basket-container__button-basket'>
                        <button onClick={() => setActive(false)}>ЗАКРИТИ</button>
                    </div>
                    <div className='basket-container__image-basket'>
                        <img src={basketLogo} alt="basket" />
                    </div>
                    <div className='basket-container__basket-length'>
                        <p>{dataBasket.length}</p>
                    </div>

                </div>

                {showBasketMenu ? <div>
                    <h3>Ваші замовлення:</h3>
                    {showOrders}
                    <div className='basket-container__total-price'>
                        <div>
                            <h3>Сума замовлення: </h3>
                        </div>
                        <div>
                            <h3>{showTotalPrice} грн</h3>
                        </div>
                    </div>
                    <div className='basket-container__make-an-order'>
                        <div onClick={() => setActive(false)}><h2>ПРОДОВЖИТИ ПОКУПКИ</h2></div>
                        {dataBasket.length === 0 ? <></> : <NavLink onClick={() => setActive(false)} to={`/show-page/checkout`}><div className='basket-container__make-an-order__submit'><h2>ОФОРМИТИ ЗАМОВЛЕННЯ</h2></div></NavLink>}
                    </div>
                </div> :
                    <h3>Щоб рухатись далі будь ласка, авторизуйтесь.</h3>}
            </div>
        </div>
    );

}
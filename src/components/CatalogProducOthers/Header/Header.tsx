import { NavLink } from "react-router-dom";
import { useState } from "react";

import burgerMenu from '../../../images/header/vector.png';
import basketLogo from '../../../images/header/basket-logo.png'

import { ModalMenu } from "../ModalMenu";
import { AllPopup } from "../../LogRegModal/AllPopup";
import { BasketContainer } from "../../Basket/BasketContainer/BasketContainer";

import './Header.scss';

export const Header = () => {

    const [showModalMenu, setShowModalMenu] = useState(false);
    const [showBasket, setShowBasket] = useState(false);

    return (
        <header className="main-header">
            <div className="main-header__left-burger">
                <div className="main-header__left-burger__picture">
                    <img onClick={() => setShowModalMenu(true)} src={burgerMenu} alt="" />
                </div>
                <div className="main-header__left-burger__catalog">
                    <NavLink to={'/catalog/main-catalog'}>
                        <h3>КАТАЛОГ</h3>
                    </NavLink>
                </div>

                <ModalMenu active={showModalMenu} setActive={setShowModalMenu} />
            </div>
            <div className="main-header__center-header">
                <NavLink to={'/'}>
                    <h1>меБля</h1>
                </NavLink>
            </div>
            <div className="main-header__right-login">
                <div>
                    <AllPopup />
                </div>
                <div>
                    <img className='header__right-menu__basket' onClick={() => setShowBasket(true)} src={basketLogo} alt="basket" />
                    <BasketContainer active={showBasket} setActive={setShowBasket} />
                </div>
            </div>

        </header>
    );
}

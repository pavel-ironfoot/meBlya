import { NavLink } from "react-router-dom";
import { useState } from "react";
import burgerMenu from '../../../images/header/vector.png';
import { ModalMenu } from "../ModalMenu";
import { LogInAndBasket } from "../../Basket/LogInAndBasket";

import './Header.scss';

export const Header = () => {

    const [showModalMenu, setShowModalMenu] = useState(false);

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
                    <h1 className="main-header__center-header__title">SHYFON’YER</h1>
                </NavLink>
            </div>
            <LogInAndBasket />
        </header>
    );
}

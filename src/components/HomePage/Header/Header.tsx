import burgerMenu from '../../../images/header/burger-menu.png';
import basketLogo from '../../../images/header/basket-logo.png'
import { NavLink } from "react-router-dom";
import { AllPopup } from '../../LogRegModal/AllPopup';

import './Header.scss';
import { ModalMenu } from '../../CatalogProducOthers/ModalMenu';
import { useState } from 'react';
import { BasketContainer } from '../../Basket/BasketContainer/BasketContainer';

export const Header = () =>{
    const [showModalMenu,setShowModalMenu] = useState(false);
    const [showBasket,setShowBasket] = useState(false);

    return (
        <header className="header-main">
            
            <div className="header__nav">
                <div className="header__left-menu">
                    <img onClick={()=>setShowModalMenu(true)}  src={burgerMenu} alt="burger" />
                    <ModalMenu active={showModalMenu} setActive={setShowModalMenu}/>
                </div>

                <div className="central-menu">
                    <h1>меБля</h1>
                </div>
                
                <div className="header__right-menu">
                    <div>
                        <AllPopup />
                    </div>
                    <div>
                        <img className='header__right-menu__basket' onClick={()=>setShowBasket(true)}  src={basketLogo} alt="basket" />
                    </div>
                   <BasketContainer active={showBasket} setActive={setShowBasket} />
                </div>
            </div>
            
            <div className="header-slogan">
                <h1 >СТВОРІТЬ СВОЇ ІДЕАЛЬНІ</h1>
                <h1 >МЕБЛІ З НАМИ</h1>
                <NavLink to={'/catalog/main-catalog'}>
                    <button>
                        ДО КАТАЛОГУ
                    </button>
                </NavLink>
            </div>     
    </header>
    );
}

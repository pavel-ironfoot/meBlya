import burgerMenu from '../../../images/header/burger-menu.png';
import { NavLink } from "react-router-dom";
import { ModalMenu } from '../../CatalogProducOthers/ModalMenu';
import { useState } from 'react';
import { LogInAndBasket } from '../../Basket/LogInAndBasket';

import './Header.scss';

export const Header = () =>{
    const [showModalMenu,setShowModalMenu] = useState(false);

    return (
        <header className="header-main">           
            <div className="header__nav">
                <div className="header__left-menu">
                    <img onClick={()=>setShowModalMenu(true)}  src={burgerMenu} alt="burger" />
                    <ModalMenu active={showModalMenu} setActive={setShowModalMenu}/>
                </div>
                <div className="central-menu">
                    <h1>SHYFON’YER</h1>
                </div>               
                <div className="header__right-menu">
                <LogInAndBasket />
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

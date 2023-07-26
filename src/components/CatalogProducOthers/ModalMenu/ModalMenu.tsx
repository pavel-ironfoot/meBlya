import { NavLink } from 'react-router-dom';
import { ModalMenuProps } from '../../../utils/types-and-interfaces';

import './ModalMenu.scss';

export const ModalMenu: React.FC<ModalMenuProps> = ({ active, setActive }) => {

    return (
        <div onClick={() => setActive(false)} className={active ? "modal-menu active-menu" : "modal-menu"}>
            <div onClick={e => e.stopPropagation()} className="modal-menu__content">
                <div className="modal-menu__left-block">
                    <div className='modal-menu__content__menu'>
                        <h1>МЕНЮ</h1>
                        <NavLink onClick={()=>setActive(false)} to={'/'}><p>ГОЛОВНА</p></NavLink>
                        <NavLink onClick={()=>setActive(false)} to={'/catalog/main-catalog'}><p>КАТАЛОГ</p></NavLink> 
                        <NavLink onClick={()=>setActive(false)} to={'/show-page/contacts'}><p>КОНТАКТИ</p></NavLink>
                        <NavLink onClick={()=>setActive(false)} to={`/show-page/personal-accaunt`}><p>ОСОБИСТИЙ КАБІНЕТ</p></NavLink>
                    </div>
                    <div className='modal-menu__content__menu'>
                        <h1>ПАРТНЕРИ</h1>
                        <NavLink onClick={()=>setActive(false)} to={'/show-page/partners/ikea'}><p>IKEA</p></NavLink>
                        <NavLink onClick={()=>setActive(false)} to={'/show-page/partners/jysk'}><p>JYSK</p></NavLink>
                        <NavLink onClick={()=>setActive(false)} to={'/show-page/partners/blum'}><p>BLUM</p></NavLink>
                        <NavLink onClick={()=>setActive(false)} to={'/show-page/partners/kolss'}><p>KOLSS</p></NavLink>
                    </div>
                    <div className='modal-menu__content__menu'>
                        <h1>КЛІЄНТАМ</h1>
                        <NavLink onClick={()=>setActive(false)} to={'/show-page/about-us'}><p>ПРО НАС</p></NavLink>
                        <NavLink onClick={()=>setActive(false)} to={'/show-page/our-partners'}><p>ПАРТНЕРИ</p></NavLink>
                        <NavLink onClick={()=>setActive(false)} to={'/show-page/fuckyou'}><p>F.A.Q.</p></NavLink>
                        <NavLink onClick={()=>setActive(false)} to={'/show-page/privacy-policy'}><p>ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</p></NavLink>
                    </div>
                </div>
                <div className="modal-menu__picture-block">
                    <p>РЕКОМЕНДОВАНИЙ ТОВАР</p>
                    <h1>Фрезерування “Бостон”</h1>
                </div>
            </div>
        </div>
    );
}

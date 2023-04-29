import { NavLink } from 'react-router-dom';
import './ModalMenu.scss';

interface ModalMenuProps {
    active:boolean;
    setActive:any;
}

export const ModalMenu: React.FC<ModalMenuProps> = ({ active, setActive }) => {

    return (
        <div onClick={() => setActive(false)} className={active ? "modal-menu active-menu" : "modal-menu"}>
            <div onClick={e => e.stopPropagation()} className="modal-menu__content">
                <div className="modal-menu__left-block">
                    <div className='modal-menu__content__menu'>
                        <h1>MENU</h1>
                        <p>MAIN</p>
                        <p>CATALOG</p>
                        <p>CONTACTS</p>
                        <NavLink onClick={()=>setActive(false)} to={`/show-page/personal-accaunt`}><p>PERSONAL ACCAUNT</p></NavLink>
                    </div>
                    <div className='modal-menu__content__menu'>
                        <h1>PARTNERS</h1>
                        <p>IKEA</p>
                        <p>JYSK</p>
                        <p>BLUM</p>
                        <p>KOLSS</p>
                    </div>
                    <div className='modal-menu__content__menu'>
                        <h1>FOR CLIENTS</h1>
                        <p>ABOUT US</p>
                        <p>F.A.Q.</p>
                        <p>PRIVACY POLICY</p>
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

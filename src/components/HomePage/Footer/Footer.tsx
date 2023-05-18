import { NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
    return (
        <footer className='main-footer'>
            <div className='main-footer__main-menu'>
                <div className='main-footer__menu'>
                    <h1>МЕНЮ</h1>
                    <NavLink to={'/'}><p>ГОЛОВНА</p></NavLink>
                        <NavLink to={'/catalog/main-catalog'}><p>КАТАЛОГ</p></NavLink>
                        <NavLink to={'/show-page/contacts'}><p>КОНТАКТИ</p></NavLink>
                        <NavLink to={`/show-page/personal-accaunt`}><p>ОСОБИСТИЙ КАБІНЕТ</p></NavLink>
                </div>
                <div className='main-footer__menu'>
                    <h1>ПАРТНЕРИ</h1>
                    <NavLink to={'/show-page/partners/ikea'}><p>IKEA</p></NavLink>
                    <NavLink to={'/show-page/partners/jysk'}><p>JYSK</p></NavLink>
                    <NavLink to={'/show-page/partners/blum'}><p>BLUM</p></NavLink>
                    <NavLink to={'/show-page/partners/kolss'}><p>KOLSS</p></NavLink>
                </div>
                <div className='main-footer__menu'>
                    <h1>КЛІЄНТАМ</h1>
                    <NavLink to={'/show-page/about-us'}><p>ПРО НАС</p></NavLink>
                    <NavLink to={'/show-page/our-partners'}><p>ПАРТНЕРИ</p></NavLink>
                    
                    <NavLink to={'/show-page/fuckyou'}><p>F.A.Q.</p></NavLink>
                    <NavLink to={'/show-page/privacy-policy'}><p>ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</p></NavLink>
                </div>
                <div className='main-footer__menu'>
                    <h1>КОНТАКТНІ ДАНІ</h1>
                    <p>+380 (77) 777 77 77</p>
                    <p>shyfonyersales@info.com</p>
                    <p>місто Черкаси, вул. П. Сагайдачного 150/2, 18005</p>
                </div>
            </div>
                <div className='main-footer__title'>
                        <h1>SHYFON’YER</h1>
                </div>   
                <div className='main-footer__footer'>
                    <div>
                        <p>© SHYFON’YER | 2023</p> 
                    </div>
                    <div>
                        <p>front-end dev: PAVEL IRONFOOT</p>
                    </div>
                </div>         
        </footer>
    );
}
import './Footer.scss';

export const Footer = () => {
    return (
        <footer className='main-footer'>
            <div className='main-footer__main-menu'>
                <div className='main-footer__menu'>
                    <h1>MENU</h1>
                    <p>MAIN</p>
                    <p>CATALOG</p>
                    <p>CONTACTS</p>
                    <p>PERSONAL ACCAUNT</p>
                </div>
                <div className='main-footer__menu'>
                    <h1>PARTNERS</h1>
                    <p>IKEA</p>
                    <p>JYSK</p>
                    <p>BLUM</p>
                    <p>KOLSS</p>
                </div>
                <div className='main-footer__menu'>
                    <h1>FOR CLIENTS</h1>
                    <p>ABOUT US</p>
                    <p>F.A.Q.</p>
                    <p>PRIVACY POLICY</p>
                </div>
                <div className='main-footer__menu'>
                    <h1>CONTACT DETAILS</h1>
                    <p>+380 (77) 777 77 77</p>
                    <p>shyfonyersales@info.com</p>
                    <p>місто Черкаси, вул. П. Сагайдачного 150/2, 18005</p>
                </div>
            </div>
            <div className='main-footer__title'>
                        <h1>меБля</h1>
                </div>   
                <div className='main-footer__footer'>
                    <div>
                        <p>© SHYFON’YER | 2023</p> 
                    </div>
                    <div>
                        <p>DESIGN & DEV: GEEKHUB INTERNS</p>
                    </div>
                </div>         
        </footer>
    );
}
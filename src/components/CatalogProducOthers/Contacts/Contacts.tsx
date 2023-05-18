import contactsImage from './../../../images/contacts-address.png';
import './Contacts.scss';

export const Contacts = () =>{
    return (
        <div className='contacts'>
            <div className='contacts-main'>
                <div className='contacts-main__image'>
                    <img src={contactsImage} alt="contacts address" />
                </div>
                <div className='contacts-main__information'>
                    <h1>КОНТАКТИ</h1>
                    <p>SHYFON’YER пропонує клієнтам широкий асортимент виробників фасадів, аби кожен міг обрати для себе </p>
                    <div className='contacts-main__contacts-block'>
                        <div className='contacts-main__one-block'>
                            <div className='one-block-information'>
                                <h3>ГРАФІК РОБОТИ</h3>
                            </div>
                            <div className='one-block-information'>
                                <p>Пн-Пт: 08:00 - 19:00,  Сб-Нд 09:00 - 19:00</p>
                            </div>
                        </div>
                        <div className='contacts-main__one-block'>
                        <div className='one-block-information'>
                                <h3>ТЕЛЕФОН ОФІСУ</h3>
                            </div>
                            <div className='one-block-information'>
                                <p>+ 380 (63) 888 65 45</p>
                            </div>
                        </div>
                        <div className='contacts-main__one-block'>
                        <div className='one-block-information'>
                                <h3>ЕЛЕКТРОННА ПОШТА</h3>
                            </div>
                            <div className='one-block-information'>
                                <p>infosupport@shyfoner.com</p>
                            </div>
                        </div>
                        <div className='contacts-main__one-block'>
                        <div className='one-block-information'>
                                <h3>АДРЕСА</h3>
                            </div>
                            <div className='one-block-information'>
                                <p>вул. Петра Сагайдачного, 25, Черкаси, 18000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
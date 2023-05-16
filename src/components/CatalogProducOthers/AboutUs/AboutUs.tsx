import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

import mainImg from './../../../images/aboutus/about2.png';
import portrait from './../../../images/aboutus/portrait.png';
import signature from './../../../images/aboutus/signature.png';

import './AboutUs.scss';

export const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className="about-us">
            <header className="about-us__header">
                <div className='about-us__header-in'>
                    <h1>МИ ДОПОМАГАЄМО</h1>
                    <h1>СТВОРЮВАТИ ІДЕАЛЬНІ МЕБЛІ</h1>
                </div>
            </header>
            <main className="about-us__main">
                <div className='about-us__main__text'>
                    <h3>НАША МІСІЯ</h3>
                    <p>У нашому магазині ви знайдете широкий асортимент фасадів для кухонних, вітальних, спальних та інших видів меблів. Наша місія полягає в тому, аби використовувати тільки найкращі матеріали та технології виробництва, щоб забезпечити якість та довговічність наших продуктів.
                    </p>
                    <p>Ми розуміємо, що ви можете мати різні потреби та вимоги до дизайну та функціональності меблів, тому ми пропонуємо індивідуальний підхід до кожного клієнта. Ми завжди раді допомогти вам вибрати фасади, які відповідають вашим потребам та бюджету, та забезпечити професійну консультацію щодо виробництва та установки.
                    </p>
                    <p>Ми прагнемо забезпечити нашим клієнтам найкращий сервіс та якість продуктів, тому ми працюємо лише з перевіреними постачальниками та використовуємо тільки високоякісні матеріали. </p>
                    <NavLink to={`/catalog/main-catalog`}>
                        <button className='about-us__main__text__button'>ПЕРЕГЛЯНУТИ КАТАЛОГ</button>
                    </NavLink>
                </div>
                <div className='about-us__main__photo'>
                    <img src={mainImg} alt="kitchen photo" />
                </div>
            </main>
            <main className='about-us__main__growth'>
                <div className='about-us__main__growth__title'>
                    <h1>ЯК РОЗВИВАВСЯ</h1>
                    <h1>SHYFON’YER</h1>
                </div>
                <div className='about-us__main__growth__period'>
                    <div className='about-us__main__growth__period-year'>
                        <h4>2014</h4>
                    </div>
                    <div className='about-us__main__growth__period-text'>
                        <p>У 2014 році стартувала історія SHYFON’YER. Магазин відразу став популярним серед жителів міста завдяки якісному обслуговуванню та широкому асортименту меблевих фасадів. Ми пропонували фасади для різних видів меблів: вітальні, спальні, офісні та кухонні меблі.</p>
                    </div>
                </div>
                <div className='about-us__main__growth__period'>
                    <div className='about-us__main__growth__period-year'>
                        <h4>2018</h4>
                    </div>
                    <div className='about-us__main__growth__period-text'>
                        <p>У 2018  компанія запустила свій онлайн-магазин, що дозволило зробити її послуги доступними для більшої аудиторії. Крім того, магазин почав розширювати свій ринок та експортувати свої продукти в інші країни.</p>
                    </div>
                </div>
                <div className='about-us__main__growth__period'>
                    <div className='about-us__main__growth__period-year'>
                        <h4>2022</h4>
                    </div>
                    <div className='about-us__main__growth__period-text'>
                        <p>Компанія SHYFON’YER звернула увагу на персоналізацію послуг та розширення асортименту фасадів за індивідуальними замовленнями. Клієнти можуть обирати розмір, колір та інші параметри, що дозволяє зробити меблі більш індивідуальними та відповідними їх потребам.</p>
                    </div>
                </div>
            </main>
            <footer className="about-us__footer">
                <div className="about-us__footer__photo">
                    <img src={portrait} alt="owner portrait" />
                </div>
                <div className="about-us__footer__text">
                    <div className="about-us__footer__text-title">
                        <h3>ВІД МАЛЕНЬКОЇ МРІЇ ДО</h3>
                        <h3> УСПІШНОЇ РЕАЛІЗАЦІЇ</h3>
                    </div>
                    <div className="about-us__footer__text-block">
                        <div className="about-us__footer__idea">
                            <p>Ця ідея народилася в мені багато років тому, коли я зрозумів, що на ринку не вистачає якісних та доступних фасадів для меблів. нИнІ Ж я маю велику, а головне КОНКУРЕНТОСПРОМОЖНу КОМПАНІю, про ЯКУ ЗНАЮТЬ У КОЖНОМУ МІСТІ НАШОЇ КРАЇНИ.</p>
                        </div>
                        <div className="about-us__footer__proud">
                            <p>
                            Я пишаюся тим, що моя ідея перетворилася в успішний бізнес, що продовжує розвиватися. Я дякую всім нашим клієнтам за довіру та підтримку, та всьому персоналу за його наполегливу роботу та професіоналізм.
                            </p>
                            <p>З повагою засновник  SHYFON’YER Олександр Кириченко </p>
                            <img src={signature} alt="signature" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
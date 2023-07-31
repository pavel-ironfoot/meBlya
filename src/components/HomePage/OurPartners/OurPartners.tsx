import { NavLink } from 'react-router-dom';
import partner1 from './../../../images/partners/ikea.png';
import partner2 from './../../../images/partners/jysk.png';
import partner3 from './../../../images/partners/blum.png';

import './OurPartners.scss';

export const OurPartners = () => {
    return (
        <div className='our-partners'>
            <h1>НАШІ ПАРТНЕРИ</h1>
            <p>МИ СПІВПРАЦЮЄМО ЛИШЕ З НАЙКРАЩИМИ ВИРОБНИКАМИ І СПЕЦІАЛІСТАМИ</p>

            <div className='our-partners__partners-block'>
                <div className='our-partners__one-block'>
                    <img src={partner1} alt="partner ikea" />
                    <h2>IKEA реалізує швидкозбірні меблі й аксесуари для дому </h2>
                    <p>Із 2008 року вона є найбільшим у світі меблевим продавцем. Замість того, щоб продавати заздалегідь зібрані меблі, більша частина з них призначена для самозбірки. Компанія стверджує, що це допомагає знизити витрати на використання упаковки, не доставляючи повітря. IKEA застосовує комплексний підхід до виробництва та дизайну усіх меблів. </p>
                    <NavLink to={'/show-page/partners/ikea'}>
                        <button className='our-partners__one-block__button'>ДО ВИРОБНИКА</button>
                    </NavLink>
                </div>
                <div className='our-partners__one-block'>
                    <img src={partner2} alt="partner jysk" />
                    <h2>JYSK – міжнародна мережа екологічно чистих  товарів для дому </h2>
                    <p>Компанія JYSK - це міжнародна роздрібна мережа, що пропонує широкий асортимент товарів для дому, які відповідають вимогам якості та доступності. Один з головних принципів компанії - це привабливі ціни, тому JYSK завжди намагається забезпечити високу якість продукції за доступними цінами. </p>
                    <NavLink to={'/show-page/partners/jysk'}>
                        <button className='our-partners__one-block__button'>ДО ВИРОБНИКА</button>
                    </NavLink>
                </div>
                <div className='our-partners__one-block'>
                    <img src={partner3} alt="partner blum" />
                    <h2>BLUM має широкий асортимент якісної фурнітури для меблів </h2>
                    <p>Тут можна придбати системи підйому та опускування для дверей, петлі для дверей та вікон, системи висування й закривання ящиків та інші компоненти. Компанія відома своєю високою якістю продукції та інноваційними рішеннями, які дозволяють меблевим виробникам створювати зручні меблі для різних приміщень.</p>
                    <NavLink to={'/show-page/partners/blum'}>
                        <button className='our-partners__one-block__button'>ДО ВИРОБНИКА</button>
                    </NavLink>
                </div>
            </div>

            <div className="home-page__show-all">
                <NavLink to={'/show-page/our-partners'}>
                    <button className="home-page__show-all__button">
                        ПЕРЕГЛЯНУТИ ВСІ
                    </button>
                </NavLink>
            </div>
        </div>
    );
}
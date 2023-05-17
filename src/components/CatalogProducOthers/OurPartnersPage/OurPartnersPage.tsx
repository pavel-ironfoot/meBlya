import ikea from './../../../images/partners-page/ikea.png';
import jysk from './../../../images/partners-page/jysk.png';
import blum from './../../../images/partners-page/blum.png';
import kolss from './../../../images/partners-page/kolss.png';

import './OurPartnersPage.scss';
import { NavLink } from 'react-router-dom';

export const OurPartnersPage = () => {
    return (
        <div className='our-partners-page'>
            <h1>НАШІ ПАРТНЕРИ</h1>
            <div className='our-partners-page__partner-left-image'>
                <div>
                    <img src={ikea} alt="ikea" />
                </div>
                <div>
                    <h3>IKEA</h3>
                    <p>ІКЕА - шведський меблевий гігант, створений в 1943 році, з понад 400 магазинами у світі, що пропонує меблі та предмети декору, для будинку та офісу з доступними цінами.
                    </p>
                    <p>ІКЕА прагне бути екологічно чистою компанією, і зосереджується на сталому виробництві та відновленні ресурсів та випускає журнал і додаток з ідеями для дому, щоб допомогти клієнтам знайти найкращі рішення для їх простору.</p>    
                    <NavLink to={'/show-page/partners/ikea'}>
                        <button className=''>ДО ВИРОБНИКА</button>
                    </NavLink>
                </div>
            </div> 
            <div className='our-partners-page__partner-right-image'>
                <div>
                    <h3>JYSK</h3>
                    <p>Jysk - данський меблевий ритейлер, заснований в 1979 році, що має більше 3000 магазинів у 51 країні світу. Jysk пропонує широкий вибір меблів, матраців та предметів декору, з доступними цінами та пропозиціями щоденних знижок.</p>
                    <p>Компанія також активно вивчає та використовує інноваційні технології у своєму виробництві, щоб зменшити вплив на навколишнє середовище. Jysk пропонує безкоштовну консультацію від своїх професійних дизайнерів.</p>
                    <NavLink to={'/show-page/partners/jysk'}>
                        <button className=''>ДО ВИРОБНИКА</button>
                    </NavLink>
                </div>
                <div>
                    <img src={jysk} alt="jysk" />
                </div>
            </div>
            <div className='our-partners-page__partner-left-image'>
                <div>
                    <img src={blum} alt="blum" />
                </div>
                <div>
                    <h3>BLUM</h3>
                    <p>
                    Blum - австрійський виробник меблевої фурнітури, заснований у 1952 році, що спеціалізується на виробництві систем відкривання та закривання меблів. Компанія має представництва в більш ніж 120 країнах світу.
                    </p>
                    <p>
                        Blum використовує інноваційні технології та матеріали у своєму виробництві, щоб забезпечити максимальний комфорт та функціональність меблів і повною мірою задовольнити запити своїх клієнтів.</p>    
                    <NavLink to={'/show-page/partners/blum'}>
                        <button className=''>ДО ВИРОБНИКА</button>
                    </NavLink>
                </div>
            </div>
            
            <div className='our-partners-page__partner-right-image'>
                <div>
                    <h3>KOLSS</h3>
                    <p>KOLSS - це меблева компанія, яка базується в Україні. Компанія спеціалізується на виробництві різноманітних меблів для будинку та офісу, таких як дивани, ліжка, столи, шафи та інші.</p>
                    <p>KOLSS активно вивчає нові тенденції в меблевій галузі,і використовує інноваційні технології у своєму виробництві. Компанія також пропонує доставку та збірку меблів для зручності клієнтів, і надає гарантію на свою продукцію.</p>
                    <NavLink to={'/show-page/partners/kolss'}>
                        <button className=''>ДО ВИРОБНИКА</button>
                    </NavLink>
                </div>
                <div>
                    <img src={kolss} alt="kolss" />
                </div>
            </div>
        </div>
    );
}
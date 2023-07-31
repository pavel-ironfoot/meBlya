import main12 from './../../../images/main/main12.png';
import main10 from './../../../images/main/main10.png';
import main2 from './../../../images/main/main2.png';
import main3 from './../../../images/main/main3.png';
import main5 from './../../../images/main/main5.png';
import main8 from './../../../images/main/main8.png';
import { NavLink } from 'react-router-dom';

import './Main.scss';

export const Main = () => {
    return (
        <main className='main-container'>
            <div className="main-container__info">
                <h1 className="main-container__info-title">ІДЕАЛЬНІ ЛІНІЇ І</h1>
                <h1 className="main-container__info-title">ВИТОНЧЕНІ ФОРМИ</h1>
                <h1 className="main-container__info-title">НАШИХ ВИРОБІВ</h1>
                <p className="main-container__info-p">
                    SHYFON’YER пропонує клієнтам широкий асортимент виробників фасадів, аби кожен міг обрати для себе найкращі
                    варіанти за найвигіднішими цінами. За потреби, ми створимо для вас найсучасніші меблі із обраних товарів,
                    та підберемо найкращі рішення, що пасуватимуть вашій оселі.
                </p>
                <NavLink to={'/show-page/about-us'}>
                    <button>БІЛЬШЕ ПРО НАС</button>
                </NavLink>
            </div>
            <img className='main-container__picture12' src={main12} alt="picture12" />
            <img className='main-container__picture10' src={main10} alt="picture10" />
            <img className='main-container__picture8' src={main8} alt="picture8" />
            <img className='main-container__picture5' src={main5} alt="picture5" />
            <img className='main-container__picture3' src={main3} alt="picture3" />
            <img className='main-container__picture2' src={main2} alt="picture2" />
        </main>
    );
}
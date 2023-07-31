import { NavLink } from "react-router-dom";
import { OurProducts } from "../../CatalogProducOthers/OurProducts";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Main } from "../Main";
import { OurPartners } from "../OurPartners";

import './HomePage.scss';

export const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <Main />
            <OurProducts title={'ЗАЗИРНІТЬ ДО НАШОГО КАТАЛОГУ'} />
            <div className="home-page__show-all">
                <NavLink to={'/catalog/main-catalog'}>
                    <button className="home-page__show-all__button">
                        ПЕРЕГЛЯНУТИ ВСІ
                    </button>
                </NavLink>
            </div>
            <OurPartners />
            <Footer />
        </div>
    );
}


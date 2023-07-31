import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../HomePage';
import { CatalogHomePage } from '../../CatalogProducOthers/CatalogHomePage';
import { MainAside } from '../../CatalogProducOthers/MainAside';
import { NotFoundPage } from '../../CatalogProducOthers/NotFoundPage';
import { Header } from '../../CatalogProducOthers/Header';
import { Footer } from '../Footer';

import './RoutesProject.scss';

export const RoutesProject = () => {

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/catalog/*' element={<CatalogHomePage />} />
                    <Route path='/show-page/*' element={<MainAside />} />
                    <Route path='*' element={<><Header /><NotFoundPage /><Footer /></>} />
                </Routes>
            </div>
        </BrowserRouter>
    );

}

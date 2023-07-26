import { Route, Routes } from 'react-router-dom';
import { Header } from '../Header';
import { Aside } from '../Aside';
import { MainCatalog } from '../MainCatalog';
import { Footer } from '../../HomePage/Footer';

import './CatalogHomePage.scss';

export const CatalogHomePage = () => {
    return (
        <div className="katalog-home-page">
            <Header />
            <div className="under-header">
                <h1>ВСІ ТОВАРИ</h1>
            </div>
            <div className='katalog-home-page__main-aside'>
                <Aside />
                <Routes>
                    <Route path='/:sorted' element={<MainCatalog />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

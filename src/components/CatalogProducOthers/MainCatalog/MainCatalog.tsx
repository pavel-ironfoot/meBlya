import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllCatalogProducts, divideArr, withoutChoose, sortSwitchCatalog, mainSortCatalogFunction } from '../../../utils/helpfulFunction';
import { ImageCatalog } from '../ImageCatalog';
import { RootState } from '../../../storeToolkit';
import { PRODUCTS_PAGE1, PRODUCTS_PAGE2 } from '../../../utils/consts';
import { Product } from '../../../utils/types-and-interfaces';
import { ShowComponent } from './ShowComponent';

import './MainCatalog.scss';

export const MainCatalog = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getPriceRange = useSelector((state: RootState) => state.companiesPrice.prices);
    const getCompany = useSelector((state: RootState) => state.companiesPrice.companys);
    const [loadingCatalog, setLoadingCatalog] = useState(true);
    const { sorted } = useParams<{ sorted: string }>();
    const [sortedHelp, setSortedHelp] = useState<any>('main-katalog');
    const [mainProducts, setMainProducts] = useState<Product[]>([]);
    const [productsToShow, setProductsToShow] = useState<Product[]>([]);
    const [pageNumber, setPageNumber] = useState(1);

    const pageNumbers: number[] = [1, 2];

    const paginationKatalog = pageNumbers.map((elem) => {
        return <button key={elem} onClick={() => setPageNumber(elem)}>сторінка {elem}</button>
    })

    useEffect(() => {
        setSortedHelp(sorted);
        getAllCatalogProducts()
            .then((res) => {
            })
            .finally(() => setLoadingCatalog(false));
    }, [sorted]);

    useEffect(() => {
        sortSwitchCatalog(sorted, setProductsToShow, mainProducts);
    }, [sorted, mainProducts]);

    useEffect(() => {
        mainSortCatalogFunction(getCompany, getPriceRange, setMainProducts);
        if (getCompany.length === 0 && getPriceRange.length === 0) {
            withoutChoose(setMainProducts, PRODUCTS_PAGE1, PRODUCTS_PAGE2);
        }
    }, [getCompany, getPriceRange]);

    const showProducts = productsToShow.map((elem) => {
        return <NavLink to={`/show-page/product-page/${elem.id}`} key={elem.name + elem.price}>
            <div className='main-katalog__one-product'>
                <ImageCatalog photoUrl={elem.photo_url} />
                <div className='main-katalog__about'>
                    <div>{elem.company} {elem.name}</div>
                    <div className="main-katalog__all-products">від {elem.price}</div>
                </div>
            </div>
        </NavLink>
    });

    return (
        <div className="main-katalog">
            {loadingCatalog ? <div className="main-katalog__count-products"><h3>Завантаження сторінки...</h3></div> :
                (
                    <ShowComponent mainProducts={mainProducts} paginationKatalog={paginationKatalog} pageNumber={pageNumber} productsToShow={productsToShow} showProducts={showProducts}/>
                )}
        </div>
    );
}


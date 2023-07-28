import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ImageCatalog } from '../ImageCatalog';
import { OurProduct, OurProductsProps } from '../../../utils/types-and-interfaces';
import { ourProductsUsEffect } from '../../../utils/helpfulFunction';

import './OurProducts.scss';


export const OurProducts: React.FC<OurProductsProps> = ({ title }) => {
    const [recomendationProducts, setRecomendationProducts] = useState<OurProduct[]>([]);

    const showRecomendationProducts = recomendationProducts.map((elem) => {
        return <NavLink to={`/show-page/product-page/${elem.id}`} key={elem.name + elem.price}>
            <div className='product-page__one-product'>
                <ImageCatalog photoUrl={elem.photo_url} />
                <div className='product-page__one-product__about'>
                    <div>{elem.company} {elem.name}</div>
                    <div>from {elem.price}</div>
                </div>
            </div>
        </NavLink>
    });

    useEffect(() => {
        ourProductsUsEffect(setRecomendationProducts);
    }, []);

    return (
        <div className='our-products'>
            <h1>{title}</h1>
            <div className='product-page__recomendation-product'>
                {showRecomendationProducts}
            </div>
        </div>
    );
}
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { productPageUseEffect } from '../../../utils/helpfulFunction';
import { ProductForm } from '../ProductForm';
import { OurProducts } from '../OurProducts';

import './ProductPage.scss';


export const ProductPage: React.FC = () => {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const { productId } = useParams();
    const [oneProductPhoto, setOneProductPhoto] = useState();

    useEffect(() => {
        productPageUseEffect(productId, setOneProductPhoto);
    }, [productId]);


    return (
        <div className='product-page'>
            <div className='product-page__main-contant'>
                <div className='product-page__photo'>
                    {oneProductPhoto ? <img src={oneProductPhoto} alt="furniture" /> : <></>}
                </div>
                <ProductForm />
            </div>
            <OurProducts title={'РЕКОМЕНДОВАНІ ТОВАРИ'} />
        </div>
    );
}

import { useEffect, useState } from 'react';
import { recomendationFour } from '../../../utils/helpfulFunction';
import './OurProducts.scss';
import { NavLink } from 'react-router-dom';
import { ImageCatalog } from '../ImageCatalog';
import { error } from 'console';

interface Product {
    id: number;
    name: string;
    company: string;
    price: number;
    photo_url: string;
}

interface OurProductsProps {
    title: string;
}

export const OurProducts: React.FC<OurProductsProps> = ({ title }) => {
    const [recomendationProducts, setRecomendationProducts] = useState<Product[]>([]);

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
        fetch('https://shyfonyer.shop/api/v1/products', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                const generationNumber = recomendationFour();
                setRecomendationProducts(data.products.slice(generationNumber - 4, generationNumber))
            })
            .catch(error => console.log(error));
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
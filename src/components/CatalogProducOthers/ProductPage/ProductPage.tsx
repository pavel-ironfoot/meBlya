import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { recomendationFour } from '../../../utils/helpfulFunction';
import { ImageCatalog } from '../ImageCatalog';

import './ProductPage.scss';
import { ProductForm } from '../ProductForm';

interface Product {
    id: number;
    name: string;
    company: string;
    price: number;
    photo_url: string;
  }

export const ProductPage: React.FC = () => {
    const {productId} = useParams();
    const [oneProductPhoto,setOneProductPhoto] = useState();
    const [recomendationProducts, setRecomendationProducts] = useState<Product[]>([]);

    useEffect(()=>{
        fetch(`https://shyfonyer.shop/api/v1/products/${productId}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setOneProductPhoto(data.photo);
            });
    },[productId]);

    useEffect(() => {
        fetch('https://shyfonyer.shop/api/v1/products', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                const generationNumber = recomendationFour();
                setRecomendationProducts(data.products.slice(generationNumber - 4, generationNumber))
            });
    }, []);

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

    return (
        <div className='product-page'>
            <div className='product-page__main-contant'>
                <div className='product-page__photo'>
                    {oneProductPhoto?<img src={oneProductPhoto} alt="furniture" />:<>fucking developers</>}
                </div>
                <ProductForm />
            </div>
            <div className='product-page__wrapper'>
                <h1>Recomendation Products</h1>
                <div className='product-page__recomendation-product'>
                    {showRecomendationProducts}
                </div>
            </div>

        </div>
    );
}

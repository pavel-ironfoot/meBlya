import { useEffect, useState } from 'react';
import './PartnersProducts.scss';
import { getCompanyData } from '../../../utils/helpfulFunction';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ImageCatalog } from '../ImageCatalog';

interface Product {
    id: number;
    name: string;
    company: string;
    price: string;
    photo_url: string;
    category:string;
  }

export const PartnersProducts: React.FC = () => {
    const {partner} = useParams();
    const [partnersProducts,setPartnersProducts] = useState<Product[]>([]);

    const getResource = async (url:string) => {
        const res = await getCompanyData(url);
        if (res) {
            console.log(res.product_comapny.slice(0,4));
            setPartnersProducts(res.product_comapny.slice(0,4));
        } else {
            console.log('something going wrong');
        }

    }

useEffect(() => {
    let partnerId = 0;

    switch (partner) {
        case 'ikea': partnerId = 2;
            break;
        case 'jysk': partnerId = 3;
            break;
        case 'blum': partnerId = 4;
            break;
        case 'kolss': partnerId = 5;
            break;
        default:
            console.log("something goin wrong");
    }
    getResource(`https://shyfonyer.shop/api/v1/companies/${partnerId}`);
}, [partner]);

const showProducts = partnersProducts.map((elem) => {
    return <NavLink to={`/show-page/product-page/${elem.id}`} key={elem.name + elem.price}>
        <div className='main-katalog__one-product'>
        <ImageCatalog photoUrl={elem.photo_url} />
        <div className='main-katalog__about'>
            <div>{elem.company} {elem.name}</div>
            <div>from {elem.price}</div>
        </div>
    </div>
    </NavLink>
});

return (
    <div className="partners-products">
        <h1>ВИРОБИ КОМПАНІЇ</h1>
        <div className="partners-products__four-products">
            {showProducts}
        </div>
    </div>
);
}
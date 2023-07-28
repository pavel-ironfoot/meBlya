import { useEffect, useState } from 'react';
import { getCompanyData, getPartner } from '../../../utils/helpfulFunction';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ImageCatalog } from '../ImageCatalog';
import { Product } from '../../../utils/types-and-interfaces';

import './PartnersProducts.scss';

export const PartnersProducts: React.FC = () => {
    const {partner} = useParams();
    const [partnersProducts,setPartnersProducts] = useState<Product[]>([]);

    const getResource = async (url:string) => {
        const res = await getCompanyData(url);
        if (res) {
            setPartnersProducts(res.product_comapny.slice(0,4));
        } else {
            console.log('something going wrong');
        }

    }

useEffect(() => {
    const partnerId = getPartner(partner);
    getResource(`https://shyfonyer.shop/api/v1/companies/${partnerId}`);
}, [partner]);

const showProducts = partnersProducts.map((elem) => {
    return <NavLink to={`/show-page/product-page/${elem.id}`} key={elem.name + elem.price}>
        <div className='main-katalog__one-product'>
        <ImageCatalog photoUrl={elem.photo_url} />
        <div className='main-katalog__about'>
            <div>{elem.company} {elem.name}</div>
            <div>від {elem.price}</div>
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
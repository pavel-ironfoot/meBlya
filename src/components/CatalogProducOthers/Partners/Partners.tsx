import { useEffect, useState } from 'react';
import './Partners.scss';
import { getCompanyData } from '../../../utils/helpfulFunction';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { PartnersProducts } from '../PartnersProducts';
import { useDispatch } from 'react-redux';
import { companysTitles } from '../../../storeToolkit/companySlice';

interface PartnersDataTypes {
    address: string;
    brand_history: string;
    description: string;
    email_publice: string;
    full_name: string;
    geolocation: string;
    id:number;
    manufacturer_company: string;
    photo_company_url: string;
    schedule: string;
    social_media: string;
    telephone: string;
}

export const Partners:React.FC = () =>{
    const dispatch = useDispatch();
    const {partner} = useParams();
    
    const [companyData,setCompanyData] = useState<PartnersDataTypes>({
        address: '',
        brand_history: '',
        description: '',
        email_publice: '',
        full_name: '',
        geolocation: '',
        id:0,
        manufacturer_company: '',
        photo_company_url: '',
        schedule: '',
        social_media: '',
        telephone: '',
    });    

    const getResource = async (url:string) => {
        const res = await getCompanyData(url);
        if (res) {
            setCompanyData(res.company);
        } else {
            console.log('something going wrong');
        }

    }

    useEffect(()=>{
        let partnerId =0;

        switch(partner){
            case 'ikea': partnerId =2;
            break;
            case 'jysk': partnerId =3;
            break;
            case 'blum': partnerId =4;
            break;
            case 'kolss': partnerId =5;
            break;
            default:
                console.log("something goin wrong");
        }
        getResource(`https://shyfonyer.shop/api/v1/companies/${partnerId}`);
    },[partner]);

    return (
        <div className='partners'>
            <h1 className='partners-title'>{companyData.full_name}</h1>
            <div className='partners__header'>
                <div>
                    <h3>КРАЇНА-ВИРОБНИК</h3>
                    {partner==='ikea'?'Швеція':partner==='jysk'?'Данія':partner==='kolss'?'Україна':'Австрія'}
                </div>
                <div>
                    <h3>ОФІС В УКРАЇНІ</h3>
                    <p>місто Київ </p>
                </div>
                <div>
                    <h3>АДРЕСА</h3>
                    <p>{companyData.address}</p>
                </div>
                <div>
                    <h3>ТЕЛЕФОН</h3>
                    <p>{companyData.telephone}</p>
                </div>
            </div>
            <main className='partners__main'>
                <div className='partners__main__image-block partners__main__block'>
                    <img src={companyData.photo_company_url} alt="company photo" />
                </div>
                <div className='partners__main__content-block partners__main__block'>
                    <h2>ІСТОРІЯ БРЕНДУ</h2>
                    <p>{companyData.brand_history}</p>
                </div>
            </main>

            <PartnersProducts />

            <div className='partners__show-all'>
                <NavLink to={`/catalog/main-catalog`}>
                    <h3>ДО КАТАЛОГУ</h3>
                </NavLink>
                
            </div>

            <footer className='partners__footer'>
                <div className='partners__footer__map partners__footer__main-block'>
                    
                </div>
                <div className='partners__footer__contacts partners__footer__main-block'>
                    <h1>КОНТАКТИ</h1>
                    <p>{companyData.description}</p>
                    <div className='partners__footer__contacts-block'>
                        <div className='partners__footer__one-block'>
                            <div className='one-block-information'>
                                <h3>ГРАФІК РОБОТИ</h3>
                            </div>
                            <div className='one-block-information'>
                                <p>{companyData.schedule}</p>
                            </div>
                        </div>
                        <div className='partners__footer__one-block'>
                        <div className='one-block-information'>
                                <h3>ТЕЛЕФОН ОФІСУ</h3>
                            </div>
                            <div className='one-block-information'>
                                <p>{companyData.telephone}</p>
                            </div>
                        </div>
                        <div className='partners__footer__one-block'>
                        <div className='one-block-information'>
                                <h3>ЕЛЕКТРОННА ПОШТА</h3>
                            </div>
                            <div className='one-block-information'>
                                <p>{companyData.email_publice}</p>
                            </div>
                        </div>
                        <div className='partners__footer__one-block'>
                        <div className='one-block-information'>
                                <h3>АДРЕСА</h3>
                            </div>
                            <div className='one-block-information'>
                                <p>{companyData.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
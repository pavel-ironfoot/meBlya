import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { divideArr } from '../../../utils/helpfulFunction';
import { ImageCatalog } from '../ImageCatalog';
import { RootState } from '../../../storeToolkit';

import './MainCatalog.scss';

interface Product {
    id: number;
    name: string;
    company: string;
    price: string;
    photo_url: string;
  }

export const MainCatalog = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const getPriceRange = useSelector((state: RootState) => state.companiesPrice.prices);
    const getCompany = useSelector((state: RootState) => state.companiesPrice.companys);
    
    const { sorted } = useParams<{ sorted: string }>();
    const [sortedHelp,setSortedHelp] = useState<any>('main-katalog');
    const [mainProducts, setMainProducts] = useState<Product[]>([]);
    const [productsToShow,setProductsToShow] = useState<Product[]>([]);
    const [pageNumber, setPageNumber] = useState(1);

    const pageNumbers: number[] = [1, 2];

    const paginationKatalog = pageNumbers.map((elem) => {
        return <button key={elem} onClick={() => setPageNumber(elem)}>сторінка {elem}</button>
    })

    useEffect(()=>{
        setSortedHelp(sorted);
    },[sorted]);

    useEffect(() => {
        
        fetch('https://shyfonyer.shop/api/v1/products', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                fetch(`https://shyfonyer.shop/api/v1/products?page=2`, {
                    method: 'GET',
                })
                    .then((response) => response.json())
                    .then((arr) => {
                        setMainProducts([...data.products, ...arr.products]);
                    })
                    .catch(error=>console.log(error));

            });
    }, []);

    useEffect(() => {
        switch (sorted) {
            case 'sorted=a-z': setProductsToShow(mainProducts.sort((a, b) => a.company > b.company ? 1 : -1));
                break;
            case 'sorted=z-a': setProductsToShow(mainProducts.sort((a, b) => a.company < b.company ? 1 : -1));
                break;
            case '/main-catalog': setProductsToShow(mainProducts);
                break;
            case 'sorted=chip': setProductsToShow(mainProducts.sort((a, b) => +a.price > +b.price ? 1 : -1));
                break;
            case 'sorted=expensive': setProductsToShow(mainProducts.sort((a, b) => +a.price < +b.price ? 1 : -1));
                break;
            case 'ikea': setProductsToShow(mainProducts.sort((a, b) => +a.price < +b.price ? 1 : -1));
                break;
            default: setProductsToShow(mainProducts);
        }
    }, [sorted,mainProducts]);

    useEffect(()=>{

        if(getCompany.length>0 || getPriceRange.length>0){
            
            let startCompany ='';
            if(getCompany.length>0) startCompany= getCompany.join(',')
            let url =`https://shyfonyer.shop/api/v1/products?company_name=${startCompany}`;
            let url2 = `https://shyfonyer.shop/api/v1/products?page=2&company_name=${startCompany}`;

            const [startPrice,endPrice] = divideArr(getPriceRange);

            if(getPriceRange.length>0) {
                url=`https://shyfonyer.shop/api/v1/products?company_name=${startCompany}&price_less_r=${startPrice}&price_more_r=${endPrice}`;
               url2=`https://shyfonyer.shop/api/v1/products?page=2&company_name=${startCompany}&price_less_r=${startPrice}&price_more_r=${endPrice}`;
            } 
            
            fetch(url, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.pagination.total_pages)
                if(data.pagination.total_pages===2){
                fetch(url2, {
                    method: 'GET',
                    })
                    .then((response) => response.json())
                    .then((arr) => {
                        console.log([...data.products,...arr.products])
                        setMainProducts([...data.products,...arr.products]);
                    }); 
                }else if(data.pagination.total_pages===1)setMainProducts(data.products);
            })
            

        }
        // console.log('https://shyfonyer.shop/');
        if(getCompany.length===0 && getPriceRange.length===0){
            fetch('https://shyfonyer.shop/api/v1/products', {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((data) => {
                    fetch(`https://shyfonyer.shop/api/v1/products?page=2`, {
                        method: 'GET',
                    })
                        .then((response) => response.json())
                        .then((arr) => {
                            setMainProducts([...data.products, ...arr.products]);
                        });
    
                });
        }


    },[getCompany,getPriceRange]);

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
            <div className="main-katalog__count-products">
                <h3>{mainProducts? mainProducts.length: 'wait'} товарів</h3>
            </div>
            
            <div className='main-katalog__pagination'>
                {mainProducts.length>12?<>{paginationKatalog}</>:<button>сторінка 1</button>}   
            </div>
            <div className="main-katalog__all-products">
                {pageNumber === 1 ? (productsToShow && productsToShow.length > 0 ? showProducts.slice(0, 12) : <p>Fucking developer</p>)
                    : (productsToShow && productsToShow.length > 0 ? showProducts.slice(12) : <p>Fucking developer</p>)
                }
            </div>
            <div className='main-katalog__pagination'>
                {mainProducts.length>12?<>{paginationKatalog}</>:<button>сторінка 1</button>} 
            </div>

        </div>
    );
}


import { ShowComponentProps } from '../../../../utils/types-and-interfaces';
import './ShowComponent.scss';


export const ShowComponent:React.FC<ShowComponentProps> = ({mainProducts,paginationKatalog,pageNumber,productsToShow,showProducts}) => {
    
    return (
        <>
            <div className="main-katalog__count-products">
                <h3>{mainProducts ? mainProducts.length : 'wait'} товарів</h3>
            </div>

            <div className='main-katalog__pagination'>
                {mainProducts.length > 12 ? <>{paginationKatalog}</> : <button>сторінка 1</button>}
            </div>
            <div className="main-katalog__all-products">
                {pageNumber === 1 ? (productsToShow && productsToShow.length > 0 ? showProducts.slice(0, 12) : <p>Щось пішло не так</p>)
                    : (productsToShow && productsToShow.length > 0 ? showProducts.slice(12) : <p>Щось пішло не так</p>)
                }
            </div>
            <div className='main-katalog__pagination'>
                {mainProducts.length > 12 ? <>{paginationKatalog}</> : <button>сторінка 1</button>}
            </div>
        </>
    );
}
import { OneProductImageProps } from '../../../utils/types-and-interfaces';
import './OneProductImage.scss';

export const OneProductImage: React.FC<OneProductImageProps> = ({photoUrl}) =>{

    return (
           <div className='one-product-image'>
        <img src={photoUrl} alt="product" />
    </div> 
    );

}
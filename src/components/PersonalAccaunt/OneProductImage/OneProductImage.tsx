import './OneProductImage.scss';

interface OneProductImageProps {
    photoUrl:string;
}

export const OneProductImage: React.FC<OneProductImageProps> = ({photoUrl}) =>{

    return (
           <div className='one-product-image'>
        <img src={photoUrl} alt="product" />
    </div> 
    );

}
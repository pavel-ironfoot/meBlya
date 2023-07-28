import './ImageCatalog.scss';

interface ImageCatalogProps {
    photoUrl: string;
}

export const ImageCatalog: React.FC<ImageCatalogProps> = ({ photoUrl }) => {

    return (
        <div className='image-katalog'>
            <img src={photoUrl} alt="table" />
        </div>
    );

}
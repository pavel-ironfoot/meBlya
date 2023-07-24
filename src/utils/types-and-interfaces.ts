export interface Product {
    id: number;
    name: string;
    company: string;
    price: string;
    photo_url: string;
}

export interface ShowComponentProps {
    mainProducts: Product[];
    paginationKatalog: JSX.Element[];
    pageNumber: number;
    productsToShow: Product[];
    showProducts: JSX.Element[];
}
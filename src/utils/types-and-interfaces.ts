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

export interface ModalMenuProps {
    active: boolean;
    setActive: any;
}

export interface BasketContainerProps {
    active: boolean;
    setActive: any;
}

export interface DataBasketElem {
    article_number: string;
    company: string;
    company_id: number;
    id: number;
    product_color: { name: string, hex: string }
    product_id: number;
    product_length: number;
    product_name: string;
    product_photo: string;
    product_price: number;
    product_thickness: { size: string };
    product_width: number
    quantity: number;
    total_price: string;
}

export interface DataBasketElem {
    article_number: string;
    company: string;
    company_id: number;
    id: number;
    product_color: { name: string, hex: string }
    product_id: number;
    product_length: number;
    product_name: string;
    product_photo: string;
    product_price: number;
    product_thickness: { size: string };
    product_width: number
    quantity: number;
    total_price: string;
}

export interface ContactinformationType {
    first_name: string;
    second_name: string;
    phone_number: string;
    email: string;
    callMe: boolean;
}

export interface ContactinformationProps {
    openDelivery: (value: boolean) => void;
    openPayment: (value: boolean) => void;
    openInformation: (value: boolean) => void;
}

export interface addressValuesType {
    street: string;
    entrance: string;
    house: string;
    apartment: string;
    comment: string;
}

export interface DeliveryProps {
    openDelivery: (value: boolean) => void;
    openPayment: (value: boolean) => void;
    openInformation: (value: boolean) => void;
}

export interface Product {
    id: number;
    name: string;
    company: string;
    price: string;
    photo_url: string;
    category?: string;
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

export interface OurProduct {
    id: number;
    name: string;
    company: string;
    price: number;
    photo_url: string;
}

export interface OurProductsProps {
    title: string;
}

export interface PartnersDataTypes {
    address: string;
    brand_history: string;
    description: string;
    email_publice: string;
    full_name: string;
    geolocation: string;
    id: number;
    manufacturer_company: string;
    photo_company_url: string;
    schedule: string;
    social_media: string;
    telephone: string;
}

export interface OneProductInterface {
    name: string;
    article_number: string;
    company: string;
    description: string;
    prices: { thickness: string; price: any }[];
    colors: { hex: string; name: string }[];
    thickness: { size: string }[];
}

export interface ProductFormState {
    color: string;
    thickness: string;
    height: string;
    width: string;
}

export interface ConfirmForgotPasswordProps {
    setPopup: (value: string) => void;
}

export interface FormFieldProps {
    placeholder: string;
    label: string;
    value: string;
    type: string;
    name: string;
    id: string;
    setChange: (value: string) => void;
}

export interface ModalLoginProps {
    setPopup: (value: string) => void;
}

export interface LoginValuetypes {
    email: string;
    password: string;
}

export interface ModalForgetPasswordProps {
    setActive: (value: boolean) => void;
    active: boolean;
}

export interface RegistrationPageProps {
    setPopup: (value: string) => void;
}

export interface ChangePasswordType {
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordSecondPageProps {
    setChangePasswordDone: (value:string) => void;
    old_password: string;
}

export interface AllPersonalDataType {
    id: number;
    full_name: string;
    email: string;
    role: string;
    last_name: string;
    patronymic: string;
    phone_number: string;
}

export interface EditPersonalDataProps {
    setChangeMain: (value: boolean) => void;
    id: number;
}

export interface ShowPersonalOrdersType {
    apartment_number: string;
    building_number: string;
    cart_id: number;
    comment: string;
    company_id: number;
    company_status: string;
    created_at: string;
    delivery_location: string;
    delivery_location_id: number;
    email: string;
    entrance_number: string;
    first_name: string;
    id: number;
    last_name: string;
    payment_method: string;
    payment_method_id: number;
    phone_number: string;
    street_name: string;
    updated_at: string;
    user_id: number;
    warehouse_address_id: any
    warehouse_status: string;
}

export interface OneOrderProps {
    id: number;
}

export interface OneUserOrdersType {
    order: {
        id: number | null,
        company_status: string,
    };
    products: any[];
}

export interface OneProductImageProps {
    photoUrl: string;
}

export interface AllPersonalDataTypePersonalData {
    id: number;
    full_name: string;
    email: string;
    role: string;
    last_name: string;
    patronymic: string;
    phone_number: string | number;
}
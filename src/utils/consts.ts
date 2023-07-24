export const PRODUCTS_PAGE1 = 'https://shyfonyer.shop/api/v1/products';
export const PRODUCTS_PAGE2 = `https://shyfonyer.shop/api/v1/products?page=2`;
export const PRODUCTS_NAME_PAGE1 = 'https://shyfonyer.shop/api/v1/products?company_name=';
export const PRODUCTS_NAME_PAGE2 = 'https://shyfonyer.shop/api/v1/products?page=2&company_name=';

export const getUrl1 = (startCompany: string, startPrice: string, endPrice: string) => {
    return `https://shyfonyer.shop/api/v1/products?company_name=${startCompany}&price_less_r=${startPrice}&price_more_r=${endPrice}`;

}

export const getUrl2 = (startCompany: string, startPrice: string, endPrice: string) => {
    return `https://shyfonyer.shop/api/v1/products?page=2&company_name=${startCompany}&price_less_r=${startPrice}&price_more_r=${endPrice}`;
}
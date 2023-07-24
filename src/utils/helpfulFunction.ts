import { PRODUCTS_NAME_PAGE1, PRODUCTS_NAME_PAGE2, getUrl1, getUrl2 } from "./consts";
import { Product } from "./types-and-interfaces";

export const divideArr = (arr: string[]): [string, string] => {
    const first: string[] = [];
    const second: string[] = [];
    arr.map((elem) => {
        let d = elem.split(' ');
        first.push(d[0])
        second.push(d[1])
    });
    return [first.join(','), second.join(',')];
}

export const recomendationFour = () => {
    return Math.floor(Math.random() * 9 + 4)
}

export const postLoginResource = async (url: string, emailForm: string, passwordForm: string) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: emailForm,
                password: passwordForm,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!res.ok) {
            console.error('Could not fetch', res.status);
            return false;
        }
        return await res.json();
    } catch (error: any) {
        console.log('Could not fetch', error.message);
        return false;
    }
}

export const getMeResource = async (url: string, token: string) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            console.error('Could not fetch', res.status);
            return false;
        }
        return await res.json();
    } catch (error: any) {
        console.log('Could not fetch', error.message);
        return false;
    }
}

export const postRegistrationResource = async (url: string, name: string, emailForm: string, passwordForm: string) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                full_name: name,
                email: emailForm,
                password: passwordForm,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!res.ok) {
            console.error('Could not fetch', res.status);
            return false;
        }
        return await res.json();
    } catch (error: any) {
        console.log('Could not fetch', error.message);
        return false;
    }
}

export const postResetPassword = async (url: string, email: string, token: string, newPassword: string) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                token: token,
                password: newPassword,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!res.ok) {
            console.error('Could not fetch', res.status);
            return false;
        }
        return await res.json();
    } catch (error: any) {
        console.log('Could not fetch', error.message);
        return false;
    }
}

export const getCompanyData = async (url: string) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
        });
        if (!res.ok) {
            console.error('Could not fetch', res.status);
            return false;
        }
        return await res.json();
    } catch (error: any) {
        console.log('Could not fetch', error.message);
        return false;
    }
}



export const getAllCatalogProducts = async () => {
    try {
        const response1 = await fetch('https://shyfonyer.shop/api/v1/products');
        const data1 = await response1.json();

        const response2 = await fetch('https://shyfonyer.shop/api/v1/products?page=2');
        const data2 = await response2.json();

        return [...data1.products, ...data2.products];

    } catch (error: any) {
        console.log('Could not fetch', error.message);
        return false;
    }
}

export const withoutChoose = async (setMainProducts: React.Dispatch<React.SetStateAction<any>>, url1: string, url2: string) => {
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
                .catch(error => console.log(error))

        })
        .catch(error => console.log(error));
}

export const sortSwitchCatalog = (sorted: string | undefined, setProductsToShow: React.Dispatch<React.SetStateAction<any>>, mainProducts: Product[]) => {
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
}

export const mainSortCatalogFunction = async (getCompany: string[], getPriceRange: string[], setMainProducts: React.Dispatch<React.SetStateAction<any>>,) => {
    if (getCompany.length > 0 || getPriceRange.length > 0) {

        let startCompany = '';
        if (getCompany.length > 0) startCompany = getCompany.join(',')
        let url = PRODUCTS_NAME_PAGE1 + startCompany;
        let url2 = PRODUCTS_NAME_PAGE2 + startCompany;

        const [startPrice, endPrice] = divideArr(getPriceRange);

        if (getPriceRange.length > 0) {
            url = getUrl1(startCompany, startPrice, endPrice);
            url2 = getUrl2(startCompany, startPrice, endPrice);
        }

        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.pagination.total_pages)
                if (data.pagination.total_pages === 2) {
                    fetch(url2, {
                        method: 'GET',
                    })
                        .then((response) => response.json())
                        .then((arr) => {
                            console.log([...data.products, ...arr.products])
                            setMainProducts([...data.products, ...arr.products]);
                        });
                } else if (data.pagination.total_pages === 1) setMainProducts(data.products);
            })

    }
}
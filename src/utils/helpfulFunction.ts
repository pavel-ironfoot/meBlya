import { CART_ITEMS, PRODUCTS_NAME_PAGE1, PRODUCTS_NAME_PAGE2, PRODUCTS_PAGE1, PRODUCTS_PAGE2, getUrl1, getUrl2 } from "./consts";
import { OneProductInterface, Product, ProductFormState } from "./types-and-interfaces";

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
        const response1 = await fetch(PRODUCTS_PAGE1);
        const data1 = await response1.json();

        const response2 = await fetch(PRODUCTS_PAGE2);
        const data2 = await response2.json();

        return [...data1.products, ...data2.products];

    } catch (error: any) {
        console.log('Could not fetch', error.message);
        return false;
    }
}

export const withoutChoose = async (setMainProducts: React.Dispatch<React.SetStateAction<any>>, url1: string, url2: string) => {
    fetch(PRODUCTS_PAGE1, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            fetch(PRODUCTS_PAGE2, {
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

export const mainSortCatalogFunction = async (getCompany: string[], getPriceRange: string[], setMainProducts: React.Dispatch<React.SetStateAction<any>>) => {
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

export const handleDecreaseRequest = async (id: number, setDataBasket: React.Dispatch<React.SetStateAction<any>>) => {
    fetch(`https://shyfonyer.shop/api/v1/cart_items/${id}?action_item=decrease`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            fetch(CART_ITEMS, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setDataBasket(data);
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}

export const basketContainerUseEffectRequest = async (setShowBasketMenu: React.Dispatch<React.SetStateAction<any>>, setDataBasket: React.Dispatch<React.SetStateAction<any>>) => {
    if (localStorage.getItem('token')) {
        setShowBasketMenu(true);
        fetch(CART_ITEMS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setDataBasket(data);
            })
            .catch(error => console.log(error))
    } else {
        setShowBasketMenu(false);
    }
}

export const deleteOneOrderFunction = async (id: number, setDataBasket: React.Dispatch<React.SetStateAction<any>>) => {
    fetch(`https://shyfonyer.shop/api/v1/cart_items/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            fetch(CART_ITEMS, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setDataBasket(data);
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}

export const handleIncreaseFunctionRequest = async (id: number, setDataBasket: React.Dispatch<React.SetStateAction<any>>) => {
    fetch(`https://shyfonyer.shop/api/v1/cart_items/${id}?action_item=increase`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            fetch(CART_ITEMS, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setDataBasket(data);
                    console.log(data);
                });
        });
}

export const createAnOrderFunction = async (checkoutData: Record<string, any>) => {
    if (localStorage.getItem('token')) {
        if (checkoutData.delivery.delivery_location_id === 0) {
            fetch(`https://shyfonyer.shop/api/v1/orders?[order]first_name=${checkoutData.information.first_name}&[order]last_name=${checkoutData.information.second_name}&[order]email=${checkoutData.information.email}&[order]phone_number=${checkoutData.information.phone_number}&[order]payment_method_id=${checkoutData.payment}&[order]delivery_location_id=0&[order]warehouse_address_id=1`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                })
                .catch(error => console.log(error));
        } else if (checkoutData.delivery.delivery_location_id === 1) {
            fetch(`https://shyfonyer.shop/api/v1/orders?[order]first_name=${checkoutData.information.first_name}&[order]last_name=${checkoutData.information.second_name}&[order]email=${checkoutData.information.email}&[order]phone_number=${checkoutData.information.phone_number}&[order]street_name=${checkoutData.delivery.street}&[order]building_number=${checkoutData.delivery.house}&[order]apartment_number=${checkoutData.delivery.apartment}&[order]entrance_number=${checkoutData.delivery.entrance}&[order]payment_method_id=${checkoutData.payment}&[order]delivery_location_id=1&[order]comment=${checkoutData.delivery.comment}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch(error => console.log(error));
        }
    }
}

export const checkoutBasketFunction = async (setDataBasket: React.Dispatch<React.SetStateAction<any>>) => {
    if (localStorage.getItem('token')) {
        fetch(CART_ITEMS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setDataBasket(data);
            })
            .catch(error => console.log(error));
    }
}

export const loginAndBasketUseEffect = async (setShowBasketCounter: React.Dispatch<React.SetStateAction<any>>, setBasketLength: React.Dispatch<React.SetStateAction<any>>, setCounterBasketElems: React.Dispatch<React.SetStateAction<any>>, dispatch: React.Dispatch<any>) => {
    if (localStorage.getItem('token')) {
        setShowBasketCounter(true);
        fetch(CART_ITEMS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(setCounterBasketElems(data.length));
                setBasketLength(data.length)
            })
            .catch(error => console.log(error));
    } else {
        setShowBasketCounter(false)
    }
}

export const ourProductsUsEffect = async (setRecomendationProducts: React.Dispatch<React.SetStateAction<any>>) => {
    fetch(PRODUCTS_PAGE1, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            const generationNumber = recomendationFour();
            setRecomendationProducts(data.products.slice(generationNumber - 4, generationNumber))
        })
        .catch(error => console.log(error));
}

export const getPartner = (partner: string | undefined) => {
    let partnerId = 0;

    switch (partner) {
        case 'ikea': partnerId = 2;
            break;
        case 'jysk': partnerId = 3;
            break;
        case 'blum': partnerId = 4;
            break;
        case 'kolss': partnerId = 5;
            break;
        default:
            console.log("something goin wrong");
    }
    return partnerId;
}

export const productFormUseEffect = async (productId: string | undefined, setOneProduct: React.Dispatch<React.SetStateAction<any>>) => {
    fetch(`https://shyfonyer.shop/api/v1/products/${productId}`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            setOneProduct(data);
        })
        .catch(error => console.log(error));
}

export const productFormCounterBasket = async (setCounterBasketElems: React.Dispatch<React.SetStateAction<any>>, dispatch: React.Dispatch<any>) => {
    if (localStorage.getItem('token')) {
        fetch(CART_ITEMS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(setCounterBasketElems(data.length));
            });
    } else {

    }
}

export const productFormHandleSubmit = (productId: string | undefined, count: any, oneProduct: OneProductInterface | null, productForm: ProductFormState, setCounterBasketElems: React.Dispatch<React.SetStateAction<any>>, dispatch: React.Dispatch<any>) => {
    fetch(CART_ITEMS, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            dispatch(setCounterBasketElems(data.length + 1));
        })
        .catch(error => console.log(error));


    let thicknessId;
    oneProduct?.thickness.map((elem: any, index: number) => {
        if (productForm.thickness === elem.size) thicknessId = index;
    });

    let colorId;
    oneProduct?.colors.map((elem: any, index: number) => {
        if (productForm.color === elem.name) colorId = index;
    });

    fetch(`https://shyfonyer.shop/api/v1/cart_items?[cart_item]product_id=${productId}&[cart_item]quantity=${count}&[cart_item]product_width=${productForm.width}&[cart_item]product_length=${productForm.height}&[cart_item]product_thickness_id=${thicknessId}&[cart_item]product_color_id=${colorId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
        })
        .catch(error => console.log(error));
}

export const productPageUseEffect = async (productId: string | undefined, setOneProductPhoto: React.Dispatch<React.SetStateAction<any>>) => {
    fetch(`https://shyfonyer.shop/api/v1/products/${productId}`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            setOneProductPhoto(data.photo);
        })
        .catch(error => console.log(error));
}

export const logOutRequest = async () =>{
    fetch('https://shyfonyer.shop/api/v1/deauth/signout_user', {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('User is signout.');
        })
        .catch(error => {
          console.error('Some error', error);
        });
}

export const allPopupUseEffect = (setWhoIsLogged: React.Dispatch<React.SetStateAction<any>>,userIsLoggin:any,dispatch: React.Dispatch<any>) =>{
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined') {
        dispatch(userIsLoggin(true));
    } else { dispatch(userIsLoggin(false)) }
        if (localStorage.getItem('loginUser') !== null && localStorage.getItem('loginUser') !== 'undefined') {
            setWhoIsLogged(localStorage.getItem('loginUser'));
        } else { setWhoIsLogged('гість'); }
}

export const forgotPasswordRequest = async(loginForm:{email:string,password:string}) =>{
    fetch('https://shyfonyer.shop/api/v1/user/password/forgot', {
        method: 'POST',
        body: JSON.stringify({
            email: loginForm.email,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => console.log(error))
}
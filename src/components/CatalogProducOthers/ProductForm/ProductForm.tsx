import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { productValues } from '../../../formValues/formValues';

import { useDispatch } from 'react-redux';
import { setCounterBasketElems } from '../../../storeToolkit/counterBasketSlice';
import { NeedToLogin } from '../../LogRegModal/NeedToLogin';

import './ProductForm.scss';

interface OneProductInterface {
    name: string;
    article_number: string;
    company: string;
    description: string;
    prices: { thickness: string; price: any }[];
    colors: { hex: string; name: string }[];
    thickness: { size: string }[];
}

interface ProductFormState {
    color: string;
    thickness: string;
    height: string;
    width: string;
}

export const ProductForm = () => {
    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>()

    const [count, setCount] = useState<any>(1);
    const [oneProduct, setOneProduct] = useState<OneProductInterface | null>(null);
    const [colorsArr, setColorsArr] = useState<any[]>([]);
    const [thicknessArr, setThicknessArr] = useState<any[]>([]);
    const [price, setPrice] = useState<any>();
    const [productForm, setProductForm] = useState<ProductFormState>(productValues);
    const [openModalNeedToLogin,setOpenModalNeedToLogin] = useState<boolean>(false);

    useEffect(() => {
        fetch(`https://shyfonyer.shop/api/v1/products/${productId}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setOneProduct(data);
            });
        fetch(`https://shyfonyer.shop/api/v1/products/${productId}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setThicknessArr(data.thickness);
            });
        fetch(`https://shyfonyer.shop/api/v1/products/${productId}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setColorsArr(data.colors);
            });
    }, [productId]);

    useEffect(() => {
        if (localStorage.getItem('token')) {

            fetch(`https://shyfonyer.shop/api/v1/cart_items`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setCounterBasketElems(data.length));
                    console.log('basket length', data.length);
                });
        } else {

        }
    }, []);

    useEffect(() => {
        if (oneProduct && productForm && productForm.thickness !== '0') {
            setPrice(oneProduct.prices.filter(elem => elem.thickness === productForm.thickness)[0].price);
        } else if (oneProduct) {
            setPrice(oneProduct.prices[0].price);
        }
    }, [productForm.thickness, oneProduct]);

    const minusCount = () => {
        setCount((prev: any) => {
            if (prev <= 1) return 1
            return prev - 1;
        });
    }
    const plusCount = () => {
        setCount((prev: any) => {
            if (prev >= 99) return 99
            return prev + 1
        });
    }

    const handleColorChange = (e: any) => {
        const { value, checked } = e.target;
        if (checked) {
            setProductForm({ ...productForm, 'color': value });
        }
    }

    const handleThicknessChange = (e: any) => {
        const { value, checked } = e.target;
        if (checked) {
            setProductForm({ ...productForm, 'thickness': value });
        }
    }

    const handleSubmit = () => {

        if (localStorage.getItem('token')) {

            fetch(`https://shyfonyer.shop/api/v1/cart_items`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setCounterBasketElems(data.length+1))
                    console.log('basket length', data.length);
                })
                .catch(error=>console.log(error));

            
            let thicknessId;
            thicknessArr.map((elem, index) => {
                if (productForm.thickness === elem.size) thicknessId = index;
            })
            let colorId;
            colorsArr.map((elem: any, index) => {
                if (productForm.color === elem.name) colorId = index;
            })
            fetch(`https://shyfonyer.shop/api/v1/cart_items?[cart_item]product_id=${productId}&[cart_item]quantity=${count}&[cart_item]product_width=${productForm.width}&[cart_item]product_length=${productForm.height}&[cart_item]product_thickness_id=${thicknessId}&[cart_item]product_color_id=${colorId}`, {
                // fetch(`http://164.90.237.173/api/v1/cart_items`, {
                method: 'POST',
                // body: JSON.stringify({cart_item:{
                //     product_id:productId,
                //     quantity:count,
                //     product_width:productForm.width,
                //     product_length:productForm.height,
                //     product_thickness_id:thicknessId,
                //     product_color_id:colorId,
                // }}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch(error=>console.log(error));
            
        } else {
            setOpenModalNeedToLogin(true);
            // dispatch(modalIsAction(true));
            console.log('fuck fuck fuck, you need to logIn');
        }
    }


    const colorsArray = colorsArr.map((elem, index) => {
        return <span key={elem.hex + index}>
            <input onChange={handleColorChange} type="radio" name='color' id={`black${index}`} value={elem.name} />
            <label className='label-color' htmlFor={`black${index}`}><span style={{ backgroundColor: elem.hex }} className="black"></span></label>
        </span>
    })

    const thicknessShow = thicknessArr.map((elem, index) => {
        return <span key={elem.size + index}>
            <input onChange={handleThicknessChange} type="radio" name='thickness' id={`thickness${index}`} value={elem.size} />
            <label className='label-thickness' htmlFor={`thickness${index}`}><span className="thickness">{elem.size} мм</span></label>
        </span>
    })

    const showPrice = oneProduct ? Math.round((+productForm.height) * (+productForm.width) / 1000000 * (price) * (+count) * 100) / 100 : 'something going wrong';

    return (
        <div className='product-page__main-form'>
            <h1>ФРЕЗЕРУВАННЯ "{oneProduct ? oneProduct.name : 'error server'}"</h1>
            <p>Артикул: {oneProduct ? oneProduct.article_number : 'error server'}</p>
            <p>Виробник: {oneProduct ? oneProduct.company : 'error server'}</p>
            <p>{oneProduct ? oneProduct.description : 'error server'}</p>
            <div className='product-page__form-field'>
                <h3>від {oneProduct ? price : 'error'} грн/м²</h3>
            </div>
            <div className='product-page__form-field'>
                <h3>Колір плівки: {productForm.color}</h3>
                {colorsArray}
            </div>
            <div className='product-page__form-field'>
                <h3>Товщина фасаду</h3>
                {thicknessShow}
            </div>
            <div className='product-page__form-field facade-calculator'>
                <div>
                    <label htmlFor="height">
                        <h3>Висота фасаду (мм)</h3>
                    </label>
                    <input onChange={(e) => setProductForm({ ...productForm, 'height': e.target.value })} value={productForm.height} type="text" name="" id="height" />
                </div>
                <div>
                    <label htmlFor="width">
                        <h3>Ширина фасаду (мм)</h3>
                    </label>
                    <input onChange={(e) => setProductForm({ ...productForm, 'width': e.target.value })} value={productForm.width} type="text" name="" id="width" />
                </div>
                <div className='product-page__form-field__count'>
                    <h3>Кількість</h3>
                    <div className='product-page__form-field__count-wrapper'>
                        <button className='product-page__form-field_plus-minus' onClick={minusCount}>-</button>
                        <input onChange={(e) => setCount(e.target.value)} value={count} type="text" name="" id="count" />
                        <button className='product-page__form-field_plus-minus' onClick={plusCount}>+</button>
                    </div>
                </div>

            </div>
            <p className='product-page__form-field__calculate-price'>
                {showPrice} грн
            </p>
            <button onClick={handleSubmit} className='product-page__main-form__addToBasket'>ДОДАТИ В КОШИК</button>
            <NeedToLogin active={openModalNeedToLogin} setActive={setOpenModalNeedToLogin}/>
        </div>
    );
}

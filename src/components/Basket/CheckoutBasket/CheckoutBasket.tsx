import { useEffect, useState } from 'react';
import './CheckoutBasket.scss';
import { useSelector } from 'react-redux';

interface DataBasketElem {
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

export const CheckoutBasket = () =>{
    const [dataBasket, setDataBasket] = useState<DataBasketElem[] | []>([]);
    const checkoutData = useSelector((state:any)=>state.checkout);
    
    const showOrders = dataBasket.sort((a, b) => +a.id > +b.id ? 1 : -1).map((elem) => {
        return <div key={elem.article_number + elem.total_price + elem.product_color.name} className='checkout-basket__one_order'>
            <div>
                <img src={elem.product_photo} alt="facade" />
            </div>
            <div>
                <h1>facade {elem.company} {elem.product_name}</h1>
                <p>Quantity: {elem.quantity}</p>
                <p>Size: {elem.product_length} x {elem.product_width}</p>
                <p>Color: {elem.product_color.name}</p>
                <p>Price m2: {elem.product_price}</p>
                <p>Need to pay: {elem.total_price}</p>
            </div>
        </div>
    });

    const handleCreateAnOrder = () =>{
        console.log(checkoutData);
        if (localStorage.getItem('token')) {
        if(checkoutData.delivery.delivery_location_id===0){
            // console.log(`http://164.90.237.173/api/v1/orders?[order]first_name=${checkoutData.information.first_name}&[order]last_name=${checkoutData.information.second_name}&[order]email=${checkoutData.information.email}&[order]phone_number=${checkoutData.information.phone_number}&[order]payment_method_id=${checkoutData.payment}&[order]delivery_location_id=0&[order]warehouse_address_id=1`);
            fetch(`https://shyfonyer.shop/api/v1/orders?[order]first_name=${checkoutData.information.first_name}&[order]last_name=${checkoutData.information.second_name}&[order]email=${checkoutData.information.email}&[order]phone_number=${checkoutData.information.phone_number}&[order]payment_method_id=${checkoutData.payment}&[order]delivery_location_id=0&[order]warehouse_address_id=1`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                console.log(data);
                });  
        }else if(checkoutData.delivery.delivery_location_id===1){
            console.log('1 - home-address');
            fetch(`https://shyfonyer.shop/api/v1/orders?[order]first_name=${checkoutData.information.first_name}&[order]last_name=${checkoutData.information.second_name}&[order]email=${checkoutData.information.email}&[order]phone_number=${checkoutData.information.phone_number}&[order]street_name=${checkoutData.delivery.street}&[order]building_number=${checkoutData.delivery.house}&[order]apartment_number=${checkoutData.delivery.apartment}&[order]entrance_number=${checkoutData.delivery.entrance}&[order]payment_method_id=${checkoutData.payment}&[order]delivery_location_id=1&[order]comment=${checkoutData.delivery.comment}`, {
                method: 'POST',

                // headers: {
                //     'Content-type': 'application/json; charset=UTF-8',
                // },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        }
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetch(`https://shyfonyer.shop/api/v1/cart_items`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                // headers: {
                //     'Accept': 'application/json',
                //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
                // },
            })
                .then((response) => response.json())
                .then((data) => {
                    setDataBasket(data);
                });
        } 
    }, []);

    return (
        <div className='checkout-basket'>
            {showOrders}
            <button onClick={handleCreateAnOrder}>ОФОРМИТИ ЗАМОВЛЕННЯ</button>
        </div>
    );
}
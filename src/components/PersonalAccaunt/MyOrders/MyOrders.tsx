import { useEffect, useState } from 'react';
import './MyOrders.scss';
import { OneOrder } from '../OneOrder/OneOrder';


interface ShowPersonalOrdersType {
    apartment_number:string;
    building_number:string;
    cart_id:number;
    comment:string;
    company_id:number;
    company_status:string;
    created_at:string;
    delivery_location:string;
    delivery_location_id:number;
    email:string;
    entrance_number:string;
    first_name:string;
    id:number;
    last_name:string;
    payment_method:string;
    payment_method_id:number;
    phone_number:string;
    street_name:string;
    updated_at:string;
    user_id:number;
    warehouse_address_id:any
    warehouse_status:string;
}

export const MyOrders: React.FC = () => {
    const [showPersonalOrders, setShowPersonalOrders] = useState<boolean>(false);
    const [allOrders, setAllOrders] = useState<ShowPersonalOrdersType[] | []>([]);


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setShowPersonalOrders(true);
            fetch(`https://shyfonyer.shop/api/v1/orders`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setAllOrders(data);
                });
        } else {
            setShowPersonalOrders(false);
        }
    }, []);

    const showAllOrders = (allOrders && allOrders.length > 0) ? allOrders.map(elem => {
        return <div key={elem.id}><OneOrder id={elem.id} /></div>
    }) : [];

    return (
        <div className='my-orders'>
            {showPersonalOrders ? <div>
                <h1>My Orders</h1>
                {showAllOrders}
            </div> : <p>to see your personal data you need to login</p>}
        </div>
    );
}
import { useEffect, useState } from 'react';
import './OneOrder.scss';
import { OneProductImage } from '../OneProductImage/OneProductImage';

interface OneOrderProps{
    id:number;
}
interface OneUserOrdersType{
    order:{
        id:number | null,
        company_status:string,
    };
    products:any[];
}

export const OneOrder: React.FC<OneOrderProps> = ({id}) =>{
    const [oneUserOrders,setOneUserOrders] = useState<OneUserOrdersType>({
        order:{
            id:null,
            company_status:'',
        },
        products:[]
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetch(`https://shyfonyer.shop/api/v1/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setOneUserOrders(data);
                });
        } 
    }, []);

    const showProductsPhoto = oneUserOrders.products.map(elem=><div key={elem.product_photo}><OneProductImage photoUrl={elem.product_photo} /></div>);

    return (
        <div className='one-order'>
            {oneUserOrders.products.length>0?<div>
                <p>№ замовлення:{oneUserOrders.order.id}</p>
                <p>{oneUserOrders.order.company_status==='waiting_for_order'?'Оброблюється':'десь щось відбувається'}</p>
                <div className='one-order__images'>
                {showProductsPhoto}
                </div>
            </div>:<div>fucking server</div>}
        </div>
    );
}

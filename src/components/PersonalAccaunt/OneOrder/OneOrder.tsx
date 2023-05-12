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
                    setOneUserOrders(data);
                });
        } 
    }, []);

    const showProductsPhoto = oneUserOrders.products.map(elem=><div key={elem.product_photo+elem.id}>
        <p>{elem.company}</p>
        <p>{elem.total_price} грн</p>
        <OneProductImage photoUrl={elem.product_photo} />
        </div>);

    return (
        <div className='one-order'>
            {oneUserOrders.products.length>0?<div>
                <div  className='one-order__header'>
                    <p>№ замовлення:{oneUserOrders.order.id}</p>
                    <p>Статус: {oneUserOrders.order.company_status==='waiting_for_order'?'Оброблюється':'десь щось відбувається'}</p>
                </div>
<div className='one-order__images'>
                {showProductsPhoto}
                </div>
            </div>:<div>Щось пішло не так</div>}
        </div>
    );
}

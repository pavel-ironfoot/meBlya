import { useEffect, useState } from 'react';
import { OneProductImage } from '../OneProductImage/OneProductImage';
import { OneOrderProps, OneUserOrdersType } from '../../../utils/types-and-interfaces';
import { oneOrderUseEffect } from '../../../utils/helpfulFunction';

import './OneOrder.scss';

export const OneOrder: React.FC<OneOrderProps> = ({ id }) => {
    const [oneUserOrders, setOneUserOrders] = useState<OneUserOrdersType>({
        order: {
            id: null,
            company_status: '',
        },
        products: []
    });

    useEffect(() => {
        oneOrderUseEffect(id, setOneUserOrders);
    }, []);

    const showProductsPhoto = oneUserOrders.products.map(elem => <div key={elem.product_photo + elem.id}>
        <p>{elem.company}</p>
        <p>{elem.total_price} грн</p>
        <OneProductImage photoUrl={elem.product_photo} />
    </div>);

    return (
        <div className='one-order'>
            {oneUserOrders.products.length > 0 ? <div>
                <div className='one-order__header'>
                    <p>№ замовлення:{oneUserOrders.order.id}</p>
                    <p>Статус: {oneUserOrders.order.company_status === 'waiting_for_order' ? 'Оброблюється' : 'десь щось відбувається'}</p>
                </div>
                <div className='one-order__images'>
                    {showProductsPhoto}
                </div>
            </div> : <div>Щось пішло не так</div>}
        </div>
    );
}

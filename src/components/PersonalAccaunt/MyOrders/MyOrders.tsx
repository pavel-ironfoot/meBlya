import { useEffect, useState } from 'react';
import { OneOrder } from '../OneOrder/OneOrder';
import { ShowPersonalOrdersType } from '../../../utils/types-and-interfaces';
import { myOrdersUseEffect } from '../../../utils/helpfulFunction';

import './MyOrders.scss';

export const MyOrders: React.FC = () => {
    const [showPersonalOrders, setShowPersonalOrders] = useState<boolean>(false);
    const [allOrders, setAllOrders] = useState<ShowPersonalOrdersType[] | []>([]);

    useEffect(() => {
        myOrdersUseEffect(setShowPersonalOrders, setAllOrders);
    }, []);

    const showAllOrders = (allOrders && allOrders.length > 0) ? allOrders.map(elem => {
        return <div key={elem.id}><OneOrder id={elem.id} /></div>
    }) : [];

    return (
        <div className='my-orders'>
            {showPersonalOrders ? <div>
                {showAllOrders}
            </div> : <p>щоб побачити інформацію потрібно зареєструватись</p>}
        </div>
    );
}
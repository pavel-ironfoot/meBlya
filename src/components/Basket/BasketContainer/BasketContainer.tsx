
import { useEffect, useState } from 'react';
import './BasketContainer.scss';
import { NavLink } from 'react-router-dom';

interface BasketContainerProps {
    active: boolean;
    setActive: any;
}

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

export const BasketContainer: React.FC<BasketContainerProps> = ({ active, setActive }) => {

    const [showBasketMenu, setShowBasketMenu] = useState(false);
    const [dataBasket, setDataBasket] = useState<DataBasketElem[] | []>([]);
    

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setShowBasketMenu(true);
            fetch(`https://shyfonyer.shop/api/v1/cart_items`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setDataBasket(data);
                });
        } else {
            setShowBasketMenu(false);
        }
    }, [active]);

    const deleteOneOrder = (id:number) => {
        fetch(`https://shyfonyer.shop/api/v1/cart_items/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                
                fetch(`https://shyfonyer.shop/api/v1/cart_items`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setDataBasket(data);
                });
            });
    }

    const handleIncrease =(id:number) =>{
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
                fetch(`https://shyfonyer.shop/api/v1/cart_items`, {
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

    const handleDecrease =(id:number) =>{
        fetch(`https://shyfonyer.shop/api/v1/cart_items/${id}?action_item=decrease`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                fetch(`https://shyfonyer.shop/api/v1/cart_items`, {
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

    let showTotalPrice =0;

    const showOrders =(dataBasket && dataBasket.length>0)? dataBasket.sort((a, b) => +a.id > +b.id ? 1 : -1).map((elem) => {
        showTotalPrice+=+elem.total_price;
        return <div key={elem.article_number + elem.total_price} className='basket-container__one_order'>
            <div>
                <img src={elem.product_photo} alt="facade" />
            </div>
            <div>
                <h1>facade {elem.company} {elem.product_name}</h1>
                <p>vendor code: {elem.article_number}</p>
                <p>size: {elem.product_length} x {elem.product_width}</p>
                <p>color: {elem.product_color.name}</p>
                <p>price m2: {elem.product_price}</p>
                <p>need to pay: {elem.total_price}</p>
                <div><span onClick={()=>handleDecrease(elem.id)}>---------</span>{elem.quantity}<span onClick={()=>handleIncrease(elem.id)}>++++++++</span></div>
                <button onClick={()=>deleteOneOrder(elem.id)}>X</button>
            </div>
        </div>
    }):[];

    return (
        <div onClick={() => setActive(false)} className={active ? "basket-container active-basket" : "basket-container"}>
            <div onClick={e => e.stopPropagation()} className='basket-container__content'>
                <button className='basket-container__close-button' onClick={() => setActive(false)}>X</button>

                {showBasketMenu ? <div>
                    <h3>Your orders:</h3>
                    {showOrders}
                <div className='basket-container__total-price'>
                   <h3>total price: {showTotalPrice}</h3>
                </div>
                <div className='basket-container__make-an-order'>
                    <button onClick={() => setActive(false)}><h2>Continue shopping</h2></button>
                    {dataBasket.length===0?<></>:<NavLink onClick={() => setActive(false)} to={`/show-page/checkout`}><button><h2>create an order</h2></button></NavLink>}                    
                </div>    
                </div> :
                    <h3>You need to logIn</h3>}
            </div>
        </div>
    );

}
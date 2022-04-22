import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ContentLoader from 'react-content-loader';
import Cart from '../cart/Cart';

const Orders = ({isLoading}) => {
    const [order, setOrder] = React.useState([]);

    React.useEffect( () => {
        try {
            (async () => {
                const { data } = await axios.get('https://625d747595cd5855d62136ef.mockapi.io/order');
                // setOrder(data.map(obj => obj.items).flat());
                setOrder(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            })()
        } catch (error) {
            alert(error.message);
        }
    }, [])
    return(
       <>
       {order.length > 0 ? <>
       <div className="d-flex align-center">
            <Link to={process.env.PUBLIC_URL + '/'}>
                <img className="cu-p" src="img/btn-left.svg" alt="back" />
            </Link>
            <h1 className="ml-10">Мои покупки</h1>
        </div>
        <div className="cart-wrapper">
            {isLoading.length > 0 ? order.map((item, i) => {
                return (
                    <Cart 
                        key={i}
                        {...item} 
                        isLoading={isLoading}/>
                )
            }) 
            : [...Array(5)].map((item, i) => {
                return (
                    <ContentLoader
                        key={i}
                        speed={2}
                        width={210}
                        height={260}
                        viewBox="0 0 150 188"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="90"/>
                        <rect x="0" y="105" rx="4" ry="4" width="150" height="15"/>
                        <rect x="0" y="125" rx="4" ry="4" width="90" height="15"/>
                        <rect x="0" y="160" rx="4" ry="4" width="80" height="24"/>
                        <rect x="117" y="153" rx="8" ry="8" width="32" height="32"/>
                    </ContentLoader> 
                ) 
            })}
        </div></> 
        : <div className="text-center cart-favorite">
            <img
                width={70}
                height={70}
                src="img/order-not.jpg"
                alt="empty"
                className="cart-empty-img m-auto d-block"/>
            <h2>У вас нет заказов</h2>
            <p>Оформите хотя бы один заказ.</p>
            <Link to={process.env.PUBLIC_URL + '/'}>
                <button className="greenButton">
                    <img src="img/btn-back.svg" alt="btn-back"/>
                    Вернуться назад
                </button>
            </Link>
            
        </div>}
        
        </>
       
    );
}

export default Orders;
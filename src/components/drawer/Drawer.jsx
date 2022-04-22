import React from 'react'
import axios from 'axios';

import { useCart } from '../hooks/useCart';
import Empty from './Empty';

import './Drawer.scss';

const dalay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({ onClickCart, drawer, onDeleteItem }) => {
    const { card, setCard, total } = useCart();
    const [clickOrder, setClickOrder] = React.useState(null);
    const [isClickOrder, setIsClickOrder] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://625d747595cd5855d62136ef.mockapi.io/order', {
                items: card
            });
            setClickOrder(data.id);
            setIsClickOrder(true);
            setCard([]);

            for (let index = 0; index < card.length; index++) {
                const item = card[index];
                await axios.delete(`https://625d747595cd5855d62136ef.mockapi.io/cart/${item.id}`);
                await dalay(1000);
            }

           
        } catch (error) {
            alert('Произошла ошибка при создании заказа')
        }
        setIsLoading(false)
    }

    return ( drawer ?
        <div className="drawer-overlay"  >
            <div className="drawer" >
            
                    <div className="d-flex justify-between align-center">
                        <h1>Корзина</h1>
                        <img onClick={onClickCart} src="img/cross.svg" alt="cross" className="ml-10 cu-p"/>
                    </div>
                    {card.length > 0 ? <>
                        <div className="card-wrapper">
                        {card.map(item => {
                            return ( 
                                <div className="card-item d-flex align-center">
                                    <img width={70} height={50} src={item.imgUrl} alt="sneakers" />
                                    <div className="card-block ml-20">
                                        <div className="card-block__title">
                                            {item.title}
                                        </div>
                                        <b className="card-block__price">
                                            {item.price}
                                        </b>
                                    </div>
                                    <img onClick={() => onDeleteItem(item.id)} src="img/cross.svg" alt="cross" className="ml-10 cu-p"/>
                                </div>
                            )
                        })}
                    </div> 
                    <>
                        <div className="drawer-cart">
                        <div className="drawer-total">
                            Итого:
                            <div className="drawer-total-doted"></div>
                            <b className="drawer-total-price">
                                {total} руб.
                            </b>
                        </div>
                        <div className="drawer-tax">
                            Налог:
                            <div className="drawer-tax-doted"></div>
                            <b className="drawer-tax-price">
                                {(total / 100 * 5).toFixed(0)} руб.
                            </b>
                        </div>
                        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                            Оформить заказ
                            <img src="img/btn-right.svg" alt="btn-right"/>
                        </button>
                    </div>
                    </>
                    </>
                    :   
                        <Empty 
                            title={isClickOrder ? "Заказ оформлен!" : "Корзина пустая"  }
                            descr={isClickOrder ? `Ваш заказ ${clickOrder} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." }
                            image={isClickOrder ? "img/order.jpg" : "img/empty.jpg" }
                            width={isClickOrder ? 83 : 120 }/>
                    }
                </div>
        </div>
    : null);
}

export default Drawer;
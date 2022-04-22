import React from 'react';
import AppContext from '../../context';

import './Cart.scss';

const Cart = ({ title, price, imgUrl, id, onAddItem, onAddFavorite}) => {

    const { isAddItem , isAddFavorite } = React.useContext(AppContext);
    
    const onAddItems = () => {
        onAddItem({title, price, imgUrl, id, parentId: id});
    }

    const onClickFavorite = () => {
        onAddFavorite({title, price, imgUrl, id, parentId: id})
    }
    
    return (
        <div className="cart-item">
            {onAddFavorite && (
                <img onClick={onClickFavorite} src={isAddFavorite(id) ? "img/forever-add.svg" : "img/forever.svg"} alt="forever" className="cart-f cu-p" />
            )}
            <img src={imgUrl} alt="sneakers" className="cart-img m-auto" />
            <div className="cart-title">
                {title}
            </div>
            <div className="d-flex justify-between align-center">
                <div className="cart-block">
                    <p>Цена:</p>
                    <b className="cart-price">
                        {price} руб.
                    </b>
                </div>
                {onAddItem && (
                    <img width={32} height={32} onClick={onAddItems} src={isAddItem(id) ? "img/add-check.svg" : "img/btn-plus.svg"} alt="btn-plus" className="btn-plus cu-p" />
                ) }
                </div>
            
        </div>
        
            
    );
}

export default Cart;
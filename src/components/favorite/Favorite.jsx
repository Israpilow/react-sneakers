import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context';

import Cart from '../cart/Cart'

const Favorite = () => {
    
    const { favorite, onAddFavorite, onAddItem } = React.useContext(AppContext);
    return(
       <>
       {favorite.length > 0 ? <>
       <div className="d-flex align-center">
            <Link to={process.env.PUBLIC_URL + '/'}>
                <img className="cu-p" src="img/btn-left.svg" alt="back" />
            </Link>
            <h1 className="ml-10">Мои закладки</h1>
        </div>
        <div className="cart-wrapper">
                {favorite.map((item, i) => <Cart {...item} onAddFavorite={onAddFavorite} key={i} onAddItem={onAddItem} />)}
        </div></> 
        : <div className="text-center cart-favorite">
            <img
                width={70}
                height={70}
                src="img/marker.jpg"
                alt="empty"
                className="cart-empty-img m-auto d-block"/>
            <h2>Закладок нет :(</h2>
            <p>Вы ничего не добавляли в закладки</p>
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

export default Favorite;
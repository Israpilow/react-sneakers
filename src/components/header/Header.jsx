import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context';

import './Header.scss';

const Header = ({ onClickCart }) => {
    const { card } = React.useContext(AppContext)
    const total = card.reduce((sum, obj) => obj.price + sum, 0)
    return (
        <div className="header d-flex justify-between">
            <Link to={process.env.PUBLIC_URL + '/'}>
                <div className="header-block__left d-flex align-center">
                        <img width={40} height={40} src="img/logo.png" alt="logo" className="header-logo" />
                    <div className="header-title ml-10">
                        <h2>REACT SNEAKERS</h2>
                        <div className="header-descr">
                            Магазин лучших кроссовок
                        </div>
                    </div>
                </div>
            </Link>
            <div className="header-block__right ">
                <div className="header-cart cu-p d-flex align-center" onClick={onClickCart}>
                    <img  src="img/cart.svg" alt="cart" className="header-cart__img" />
                    <b className="pl-10">{total} руб.</b>
                </div>
                <Link to={process.env.PUBLIC_URL + '/favorite'}>
                    <img src="img/favorite.svg" alt="favorite" className="header-favorite__img cu-p " />
                </Link>
                
                <Link to={process.env.PUBLIC_URL + '/orders'}>
                    <img src="img/user.svg" alt="user" className="header-user__img cu-p" />
                </Link>
            </div>
        </div>
    );
}

export default Header;
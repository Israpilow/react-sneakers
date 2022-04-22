import React from 'react';

import AppContext from '../../context';

const Empty = (props) => {
    const { title, descr, image, width } = props;
    const { onClickCart } = React.useContext(AppContext);
    return (
        <div className="cart-empty text-center">
            <img
                width={width}
                height={120}
                src={image}
                alt="empty"
                className="cart-empty-img m-auto d-block"/>
            <h2>{title}</h2>
            <p>{descr}</p>
            <button onClick={onClickCart} className="greenButton">
                <img src="img/btn-back.svg" alt="btn-left"/>
                Вернуться назад
            </button>
        </div>
    );
}

export default Empty;
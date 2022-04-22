import React from 'react';
import AppContext from '../../context';

export const useCart = () => {
    const { card, setCard } = React.useContext(AppContext);

    const total = card.reduce((sum, obj) => obj.price + sum, 0);

    return { card, setCard, total }
}
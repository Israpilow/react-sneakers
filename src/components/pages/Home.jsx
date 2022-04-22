import React from 'react';
import Cart from '../cart/Cart';

import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

const Home = () => {
    const { cart, onChangeInput, change, onAddFavorite, loading, onAddItem } = React.useContext(AppContext)
    const renderItems = () => {
        return (
            loading.length > 0 ? cart.filter(item => item.title.toLowerCase().includes(change.toLowerCase())).map((item, i) => {
                return (
                    <Cart
                        {...item}
                        key={item.id}
                        loading={loading}
                        change={change}
                        onAddItem={onAddItem}
                        chackFavorite={false}
                        onAddFavorite={onAddFavorite}/>
                ) 
            }) : [...Array(10)].map((item, i) => {
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
                }) 
            
        )
    }
    return (
        <div className="cart">
            <div className="cart-header d-flex justify-between align-center">
                <h1>{change ? `Поиск по "${change}"` : 'Все кроссовки'}</h1>
                <div className="search">
                    <img src="img/search.svg" alt="search"/>
                    <input 
                        type="text" 
                        placeholder="Поиск..."
                        value={change}
                        onChange={onChangeInput}/>
                </div>
            </div>
            <div className="cart-wrapper">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;
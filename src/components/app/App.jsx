import React from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';

import Header from '../header/Header';
import Home from '../pages/Home';
import Drawer from '../drawer/Drawer';
import Favorite from '../favorite/Favorite';
import Orders from '../pages/Orders'

import AppContext from '../../context';

import './App.scss';
import './Media.scss';

function App() {

    const [drawer, setDrawer] = React.useState(false);
    const [cart, setCart] = React.useState([]);
    const [card, setCard] = React.useState([]);
    const [favorite, setFavorite] = React.useState([])
    const [change, setChange] = React.useState('');
    const [loading, setLoading] = React.useState([]);
    const [order, setOrder] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState([]);
    React.useEffect(() => {
        try {
            (async() => {
                await axios
                    .get('https://625d747595cd5855d62136ef.mockapi.io/items')
                    .then(res => {
                        setCart(res.data);
                        setLoading(res.data);
                    })
                await axios
                    .get('https://625d747595cd5855d62136ef.mockapi.io/cart')
                    .then(res => {
                        setCard(res.data);
                    })

                await axios
                    .get('https://625d747595cd5855d62136ef.mockapi.io/favorite')
                    .then(res => {
                        setFavorite(res.data);
                    })
                await axios
                    .get('https://625d747595cd5855d62136ef.mockapi.io/order')
                    .then(res => {
                        setOrder(res.data);
                        setIsLoading(res.data)
                    })
            })()
        } catch (error) {}
    }, [])
    const onAddItem = async(obj) => {
        try {
            const findItem = card.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCard(card.filter(item => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://625d747595cd5855d62136ef.mockapi.io/cart/${findItem.id}`);
            } else {
                setCard([
                    ...card,
                    obj
                ]);
                const {data} = await axios.post('https://625d747595cd5855d62136ef.mockapi.io/cart', obj);
                setCard((prev) => prev.map((item) => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            alert(error.message)
        }

    }

    const onAddFavorite = async(obj) => {
        try {
            const findItem = favorite.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setFavorite(favorite.filter(item => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://625d747595cd5855d62136ef.mockapi.io/favorite/${findItem.id}`);
            } else {
                setFavorite([...favorite, obj]);
                const { data } = await axios.post('https://625d747595cd5855d62136ef.mockapi.io/favorite', obj);
                setFavorite((prev) => prev.map((item) => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
               
            }
        } catch (error) {
            alert(error.message)
        }
        // try {
        //     if (favorite.find((item) => Number(item.id) === Number(obj.id))) {
        //         await axios.delete(`https://625d747595cd5855d62136ef.mockapi.io/favorite/${obj.id}`)
        //         setFavorite(favorite.filter(item => Number(item.id) !== Number(obj.id)))

        //     } else {
        //         await axios.post('https://625d747595cd5855d62136ef.mockapi.io/favorite', obj)
        //         setFavorite([
        //             ...favorite,
        //             obj
        //         ]);
        //     }
        // } catch (error) {
        //     alert(error.message)
        // }
    }

    const onClickCart = (e) => {
        setDrawer(!drawer)
        e.target.offsetParent.overflow = 'hidden'
    }

    const onChangeInput = (e) => {
        const value = e.target.value;
        setChange(value)
    }

    const onDeleteItem = async(id) => {
        try {
            setCard(card.filter(elem => elem.id !== id))
            await axios.delete(`https://625d747595cd5855d62136ef.mockapi.io/cart/${id}`)
        } catch (error) {
            alert(error.message)
        }
    }

    const onAddOrder = (obj) => {
        setOrder([
            ...order,
            obj
        ]);
    }

    const isAddItem = (id) => {
        return card.some(obj => {
            return Number(obj.parentId) === Number(id)
        });
    }

    const isAddFavorite = (id) => {
        return favorite.some(obj => {
            return Number(obj.parentId) === Number(id)
        })
    }
    return (
        <AppContext.Provider
            value={{
                cart,
                card,
                onChangeInput,
                change,
                favorite,
                isAddItem,
                isAddFavorite,
                onClickCart,
                setCard,
                onAddFavorite,
                onAddItem,
                onAddOrder,
                order,
                loading
            }}>
            <div className="App clear">
                <Drawer
                    card={cart.map(item => item.id)}
                    onClickCart={onClickCart}
                    drawer={drawer}
                    onDeleteItem={onDeleteItem}
                    opened={onClickCart}/>
                <Header onClickCart={onClickCart}/>

                <Routes >
                    <Route path={process.env.PUBLIC_URL + '/'} element={
                        <Home />
                    }/>

                    <Route path={process.env.PUBLIC_URL + '/favorite'} element={
                        <Favorite />
                    }/>
                    <Route path={process.env.PUBLIC_URL + '/orders'} element={
                        <Orders isLoading = {isLoading} />
                    }/>
                </Routes>

            </div>

        </AppContext.Provider>

    );
}

export default App;

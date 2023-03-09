import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

import DISCOUNT_CODES from '../mocks/discountCodesMock';
import { parseWithTwoDecimals } from '../utils';

export const Context = createContext();

const Provider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const value = localStorage.getItem('cart');
    return value ? JSON.parse(value) : [];
  });

  const [discount, setDiscount] = useState(0);

  const addToCart = (item) => {
    const newItems = [...cart, item];
    updateCart(newItems);
  };

  const updateCart = (newItems) => {
    setCart(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const removeFromCart = (id) => {
    const newItems = cart.filter((item) => item.id !== id);
    updateCart(newItems);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getTotalItems = () => cart.length;

  const isProductInCart = (id) => !!cart.find((item) => item.id === id);

  const isCartEmpty = () => cart.length === 0;

  const getTotalPrice = () => {
    let total = cart.reduce(function (partial, item) {
      return partial + item.price;
    }, 0);
    return parseWithTwoDecimals(total);
  };

  const getDiscount = (code) => {
    const discountFactor = DISCOUNT_CODES[code] ?? 0;
    setDiscount(discountFactor);
  };

  const applyDiscount = () => {
    const totalWithDiscount = getTotalPrice() * discount;
    return parseWithTwoDecimals(totalWithDiscount);
  };

  const getTotalAfterDiscount = () => parseWithTwoDecimals(getTotalPrice() - applyDiscount());

  const value = {
    cart,
    discount,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    isProductInCart,
    isCartEmpty,
    getTotalPrice,
    getDiscount,
    applyDiscount,
    getTotalAfterDiscount,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

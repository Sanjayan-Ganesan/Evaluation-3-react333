import React, { createContext, useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const { isAuth } = useContext(AuthContext);
  const [cartitem, setcartitem] = useState([]);

  const cartitemcart = (productId) =>
    cartitem.find((item) => item.productId === productId) || {};

  const getCartItemCountByProductId = (productId) => {
    let item = cartitem.find((item) => item.productId === productId) || {};
    return item.count || 0;
  };

  const addItemToCart = async (cartInfo) => {
    return axios
      .post("http://localhost:8080/cartitem", { ...cartInfo })
      .then(({ data }) => {
        setcartitem([...cartitem, data]);
      });
  };

  const removeItemFromCart = async (productId) => {
    let item = cartitemcart(productId);
    if (item.id) {
      return axios
        .delete(`http://localhost:8080/cartitem/${item.id}`)
        .then(() => {
          let updatedcartitem = cartitem.filter((cI) => cI.id !== item.id);
          setcartitem(updatedcartitem);
        });
    }
  };

  const updateItemCount = async (productId, newCount) => {
    if (newCount === 0) {
      return removeItemFromCart(productId);
    } else {
      let item = cartitem.find((item) => item.productId === productId) || {};
      if (item.id) {
        return axios
          .patch(`http://localhost:8080/cartitem/${item.id}`, {
            count: newCount,
          })
          .then(({ data }) => {
            let updatedcartitem = cartitem.map((cI) => {
              if (cI.id === item.id) {
                return data;
              } else {
                return cI;
              }
            });
            setcartitem(updatedcartitem);
          });
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      axios.get("http://localhost:8080/cartitem").then(({ data }) => {
        setcartitem(data);
      });
    }
  }, [isAuth]);

  return <CartContext.Provider value={{
    cartitemCount: cartitem.length,
    cartitem,
    getCartItemCountByProductId,
    addItemToCart,
    removeItemFromCart,
    updateItemCount,
  }}>{children}</CartContext.Provider>;
};

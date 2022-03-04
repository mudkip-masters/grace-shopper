import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../../store";
import { fetchCart } from "../../store/order";

const Cart = () => {
  const user = useSelector((state) => state.auth);
  console.log(`User is here: ${typeof user.id}`);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, []);

  // const handleQuantity = (e, orderId) => {
  //   let quantity = e.target.value;
  //   dispatch(increaseQuantity(orderId, quantity));
  // };

  console.log(cart);
  return (
    <div>
      <header>Your Cart:</header>
      {/* <p></p>
      <div>
        {cart.length > 0
          ? cart.map((order) => {
              return (
                <ul key={order.id}>
                  <li>Order Name: {order.name} </li>
                  <li>
                    Order Quantity :
                    <input
                      type={"number"}
                      value={order.qty}
                      min="0"
                      onChange={(e) => handleQuantity(e, order.id)}
                    />
                  </li>
                  <li>Order Price : {order.price} </li>
                </ul>
              );
            })
          : "Your card is empty"}
      </div>
      Total Price:
      {cart.reduce((previous, current) => {
        return (previous += current.price);
      }, 0)}
      <p></p>
      <button>Check Out</button> */}
    </div>
  );
};

export default Cart;

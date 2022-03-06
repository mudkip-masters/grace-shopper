import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../../store';
import { fetchCart } from '../../store/order';
import { fetchCartItems } from '../../store/orderProducts';

const Cart = () => {
  const user = useSelector((state) => state.auth);

  const order = useSelector((state) => state.order);
  const orderProducts = useSelector((state) => state.orderProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  useEffect(() => {
    dispatch(fetchCart(user.id));
    // console.log("user id is: ", user.id);
  }, [user]);

  // const handleQuantity = (e, orderId) => {
  //   let quantity = e.target.value;
  //   dispatch();
  // };

  console.log(`Here is our cart ${order.id}`);

  if (!order.products) {
    return <h1>"cart is empty"</h1>;
  }

  return (
    <div>
      {
        <>
          <header>Your Cart:</header>
          <div>
            {order.products.map((product) => {
              return (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <p>{product.orderProduct.quantity}</p>
                </div>
              );
            })}
          </div>
        </>
        // ))
      }
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

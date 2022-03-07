import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../../store";
import {
  addCart,
  decreaseQuantity,
  fetchCart,
  fulfillCart,
  increaseQuantity,
  removeCart,
} from "../../store/order";

const Cart = () => {
  const user = useSelector((state) => state.auth);

  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, [user]);

  const handleClick = () => {
    dispatch(fulfillCart(user.id));
    dispatch(addCart(user.id));
  };

  const handleIncreaseQuantity = (productId, orderId) => {
    dispatch(increaseQuantity(productId, user.id, orderId));
  };
  const handleDecreaseQuantity = (productId, orderId) => {
    dispatch(decreaseQuantity(productId, user.id, orderId));
  };
  const handleRemove = (productId, orderId) => {
    dispatch(removeCart(productId, user.id, orderId));
  };

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
                  <p>
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(product.id, order.id)
                      }
                    >
                      +
                    </button>
                    {product.orderProduct.quantity}
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(product.id, order.id)
                      }
                    >
                      -
                    </button>
                    <button onClick={() => handleRemove(product.id, order.id)}>
                      Delete
                    </button>
                  </p>
                </div>
              );
            })}
          </div>
        </>
      }

      <button onClick={handleClick}>CHECK OUT</button>
    </div>
  );
};

export default Cart;

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

  // console.log(`Here is our cart ${JSON.parse(localStorage.getItem("cart"))}`);
  console.log(`Here is our cart ${order}`);

  if (!order.products) {
    return <h1>"cart is empty"</h1>;
  }

  return (
    <div>
      {
        <>
          <header>Your Cart:</header>
          <div>
            {order.products.length < 1 ? (
              <h1>Your cart is empty!</h1>
            ) : (
              order.products.map((product) => {
                return (
                  <div key={product.id}>
                    <p>{product.name}</p>
                    <img src={product.imageURL} width="100" height="100" />
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
                      <button
                        onClick={() => handleRemove(product.id, order.id)}
                      >
                        Delete
                      </button>
                    </p>
                    <p>
                      Price: {product.price * product.orderProduct.quantity}
                    </p>
                    <hr />
                  </div>
                );
              })
            )}
            <p>
              Total Price:{" "}
              {order.products.reduce((acc, product) => {
                return (acc += product.price * product.orderProduct.quantity);
              }, 0)}
            </p>
          </div>
        </>
      }

      <button onClick={handleClick}>CHECK OUT</button>
    </div>
  );
};

export default Cart;

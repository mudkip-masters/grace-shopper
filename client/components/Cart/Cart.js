import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../../store';
import Confirmation from './Confirmation';
import {
  addCart,
  decreaseQuantity,
  fetchCart,
  fulfillCart,
  increaseQuantity,
  removeCart,
} from '../../store/order';

const Cart = () => {
  const user = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order) || { products: [] };

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

  if (!order.products) {
    return <Confirmation />;
  }

  return (
    <div>
      {
        <>
          <h1>Your Cart:</h1>
          <div>
            {order.products.length < 1 ? (
              <h1>Your cart is empty!</h1>
            ) : (
              order.products.map((product) => {
                return (
                  <div key={product.id}>
                    <h2>{product.name}</h2>
                    <img src={product.imageURL} />
                    <h1>
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
                    </h1>
                    <h2>
                      Price: {product.price * product.orderProduct.quantity}
                    </h2>
                    <hr />
                  </div>
                );
              })
            )}
            <h2>
              Total Price:{' '}
              {order.products.reduce((acc, product) => {
                return (acc += product.price * product.orderProduct.quantity);
              }, 0)}
            </h2>
          </div>
        </>
      }

      <button onClick={handleClick}>CHECK OUT</button>
    </div>
  );
};

export default Cart;

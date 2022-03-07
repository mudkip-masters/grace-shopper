import axios from "axios";
// action type
const ADD_TO_CART = "ADD_TO_CART";
const FETCH_CART = "FETCH_CART";

// action creator
const _addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};

const _fetchCart = (cart) => {
  return {
    type: FETCH_CART,
    cart,
  };
};
// thunks creator

//create new cart
export const addCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/cart`);
      dispatch(_addToCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//add to cart, find cart if exists, or create
export const addToCart = (userId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/addToCart`, {
        productId,
        quantity,
      });
      dispatch(_addToCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//finding a users cart based on querying the orders model for an order that has their id
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/cart`);
      dispatch(_fetchCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fulfillCart = (userId) => {
  return async () => {
    try {
      await axios.put(`/api/users/${userId}/order`);
    } catch (error) {
      console.log(error);
    }
  };
};

// increase quantity
export const increaseQuantity = (productId, userId, orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}/cart`, {
        orderId,
        productId,
        type: "increase", //
      });
      dispatch(fetchCart(userId)); // after update the amount to see the current orderProduct
    } catch (error) {
      console.log(error);
    }
  };
};

// decrease quantity
export const decreaseQuantity = (productId, userId, orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}/cart`, {
        orderId,
        productId,
        type: "decrease",
      });
      dispatch(fetchCart(userId));
    } catch (error) {
      console.log(error);
    }
  };
};

//removeCart;
export const removeCart = (productId, userId, orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/users/${userId}/cart/${orderId}/${productId}`
      );
      dispatch(fetchCart(userId));
    } catch (error) {
      console.log(error);
    }
  };
};

// reducers
export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.cart;
    case FETCH_CART:
      return action.cart;
    default:
      return state;
  }
}

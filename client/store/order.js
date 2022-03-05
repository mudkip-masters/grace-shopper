import axios from "axios";
// action type
const ADD_CART = "ADD_CART";
const FETCH_CART = "FETCH_CART";

// action creator
const _AddCart = (cart) => {
  return {
    type: ADD_CART,
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

//creating a cart for a user
export const AddCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/cart`);
      dispatch(_AddCart(data));
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
// reducers

export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case ADD_CART:
      return action.cart;
    case FETCH_CART:
      return action.cart;
    default:
      return state;
  }
}

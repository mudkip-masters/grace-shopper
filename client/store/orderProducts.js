import axios from 'axios';
// action type
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';
// action creator
const _AddCartItem = (product) => {
  return {
    type: ADD_CART_ITEM,
    product,
  };
};

const _fetchCartItems = (cart) => {
  return {
    type: FETCH_CART_ITEMS,
    cart,
  };
};
// thunks creator
export const AddCartItem = (orderId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/OrderProduct', {
        orderId,
        productId,
        quantity,
      });
      dispatch(_AddCartItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCartItems = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/OrderProduct/${orderId}`);
      dispatch(_fetchCartItems(data));
    } catch (err) {
      console.log(err);
    }
  };
};
// reducers

export default function orderProductsReducer(state = {}, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return action.product;
    case FETCH_CART_ITEMS:
      return action.cart;
    default:
      return state;
  }
}

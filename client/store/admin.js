import axios from 'axios';

const FETCH_PRODUCT = 'FETCH_PRODUCT';
const GOT_PRODUCT = 'GOT_PRODUCT';
const TOKEN = 'token';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
};
const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

export const removeProduct = (id) => {
  return async (dispatch) => {
    try {
      const { product } = await axios.delete(`/api/admin`);
      dispatch(addProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
};

export const postProduct = (product) => {
  return async (dispatch) => {
    try {
      const { product } = await axios.post('/api/admin', product);
      dispatch(addProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
};
export default function adminReducer(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.product;

    default:
      return state;
  }
}

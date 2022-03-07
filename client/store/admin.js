import axios from 'axios';

const FETCH_PRODUCT = 'FETCH_PRODUCT';
const GOT_PRODUCT = 'GOT_PRODUCT';
const TOKEN = 'token';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';

const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  };
};

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

export const editProductItem = (product) => {
  return async (dispatch) => {
    try {
      const { productToEdit } = await axios.put(
        `/api/admin/${product.id}`,
        product
      );
      dispatch(editProduct(productToEdit));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeProduct = (id) => {
  return async (dispatch) => {
    try {
      const { product } = await axios.delete(`/api/admin/${id}`);
      dispatch(deleteProduct(product));
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
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}

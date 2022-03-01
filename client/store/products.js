import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';

const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const setProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products');
      dispatch(_setProducts(products));
    } catch (error) {}
  };
};

import axios from 'axios';
// action type
const SET_PRODUCTS = 'SET_PRODUCTS';

// action creator
const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};
// thunks
export const setProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products');
      dispatch(_setProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};
// reducers
let initialState = [];

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

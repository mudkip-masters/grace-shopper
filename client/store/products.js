import axios from 'axios';
// action type
const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';

// action creator
const setAllProducts = (products) => {
  return {
    type: SET_ALL_PRODUCTS,
    products,
  };
};
// thunks creator
export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data: allProducts } = await axios.get('/api/products');
      dispatch(setAllProducts(allProducts));
    } catch (error) {
      console.log(error);
    }
  };
};
// reducers
let initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS: {
      return action.products;
    }
    default:
      return state;
  }
}

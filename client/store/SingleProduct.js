import Axios from 'axios';

const SET_PRODUCT = 'SET_PRODUCT';

export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/api/products/${id}`);
      dispatch(setProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

let initialState = {};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}

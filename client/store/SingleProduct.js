import axios from 'axios';
//action creator
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

// action creator
const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

// thunks creator
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: singleProduct } = await axios.get(`/api/products/${id}`);
      dispatch(setSingleProduct(singleProduct));
    } catch (err) {
      console.log(err);
    }
  };
};

const initalState = {};

export default function productReducer(state = initalState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT: {
      return action.product;
    }
    default: {
      return state;
    }
  }
}

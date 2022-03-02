import Axios from "axios";
//action creator
const SET_PRODUCT = "SET_PRODUCT";

// action creator
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  };
};

// thunks creator
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

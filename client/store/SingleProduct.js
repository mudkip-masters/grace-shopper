import Axios from "axios";
//action creator
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

// action creator
export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,

    product,
  };
};

// thunks creator
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/api/products/${id}`);
      dispatch(setSingleProduct(data));

    } catch (err) {
      console.log(err);
    }
  };
};

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:

      console.log("here is action", action);
      return { ...action.product };
    default:
      return state;
  }
}

import axios from "axios";


// action type
const SET_PRODUCTS = "SET_PRODUCTS";
const UPDATE_CART = "UPDATE_CART"

// action creator

const setProducts = (product) => {
  type: SET_PRODUCTS,
  product,
}

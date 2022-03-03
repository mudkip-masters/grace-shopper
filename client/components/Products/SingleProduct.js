import React, { useEffect, useState } from "react";
import { fetchSingleProduct } from "../../store/SingleProduct";
import { useDispatch, useSelector } from "react-redux";

const SingleProduct = (props) => {
  const dispatch = useDispatch();

  const product =
    useSelector((state) => {
      return state.product;
    }) || [];

  useEffect(() => {
    dispatch(fetchSingleProduct(props.match.params.id));
  }, []);

  console.log(props.match.params.id);

  return (
    <div>
      <ul>
        <li>{product.name}</li>
        <li>{product.imageURL}</li>
        <li>{product.description}</li>
        <li>{product.price}</li>
        <li>{product.calories}</li>
      </ul>
    </div>
  );
};

export default SingleProduct;

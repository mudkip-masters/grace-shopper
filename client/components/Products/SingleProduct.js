import React, { useEffect, useState } from "react";
import { fetchSingleProduct } from "../../store/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../../store";
import { addCart } from "../../store/order";

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);

  const product =
    useSelector((state) => {
      return state.product;
    }) || [];

  useEffect(() => {
    dispatch(fetchSingleProduct(props.match.params.id));
  }, []);

  console.log(`user.id: ${user.id}`);

  const handleClick = () => {
    dispatch(addCart(user.id, props.match.params.id));
  };

  return (
    <div>
      <ul>
        <li>{product.name}</li>
        <li>{product.imageURL}</li>
        <li>{product.description}</li>
        <li>{product.price}</li>
        <li>{product.calories}</li>
      </ul>
      <button onClick={() => handleClick()}>Add To Cart</button>
    </div>
  );
};

export default SingleProduct;

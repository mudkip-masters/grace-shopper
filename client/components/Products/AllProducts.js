import React, { useEffect, useState } from "react";
import { setProducts } from "../../store/products";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../../store/order";

const AllProducts = () => {
  const dispatch = useDispatch();

  const products =
    useSelector((state) => {
      return state.products;
    }) || [];

  useEffect(() => {
    dispatch(setProducts());
  }, []);

  return (
    <div>
      {products === undefined || products === []
        ? "No food"
        : products.map((product) => {
            return (
              <div key={product.id}>
                <p>
                  <Link to={`/products/${product.id}`}>
                    Food Name:
                    {product.name}
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                </p>
                <p>
                  <img src={product.imageURL} width="300" height="300" />
                </p>
                <p>
                  <u>Food description: </u>
                  {product.description}
                </p>
                <p>
                  <u>Food Price: </u> {product.price}
                </p>
                <p>
                  <u>Product calories: </u>
                  {product.calories}
                </p>
              </div>
            );
          })}
    </div>
  );
};

export default AllProducts;

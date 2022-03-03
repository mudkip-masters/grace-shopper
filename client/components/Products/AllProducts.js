import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { setProducts } from "../../store/products";
import { connect, useDispatch, useSelector } from "react-redux";

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
    <div className="product">
      {products.length > 0 &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default AllProducts;

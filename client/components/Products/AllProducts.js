import React, { useEffect, useState } from 'react';
import { setProducts } from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
        ? 'No food'
        : products.map((product) => {
            return (
              <div class="allproductcontainer">
                <div class="square">
                  <img src={product.imageURL} class="mask" />
                  <div class="foodtitle">{product.name}</div>
                  <p>{product.description}</p>

                  <div>
                    <Link
                      to={`/products/${product.id}`}
                      target="_"
                      class="button"
                    >
                      View Meal
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default AllProducts;

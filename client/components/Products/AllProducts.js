import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');

  const { products } = useSelector((state) => {
    return {
      products: state.products,
    };
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      {products === undefined || products === []
        ? 'No food'
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
                  <img src={product.imageURL} />
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

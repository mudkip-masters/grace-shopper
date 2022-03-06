import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [price, setPrice] = useState('');

  const { products } = useSelector((state) => {
    return {
      products: state.products,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      {products === undefined || products === []
        ? 'No food'
        : products.map((product) => {
            return (
              <div key={product.id} className="allProductCards">
                <br />
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageURL} style={{ width: '200px' }} />
                </Link>
                <br />
                <h3 className="singleDescription">{product.name}</h3>$
                {product.price}
              </div>
            );
          })}
    </div>
  );
};

export default AllProducts;

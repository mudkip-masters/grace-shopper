import React from 'react';

const ProductDetails = ({ product, user, authenticated }) => {
  return (
    <div>
      <section>
        <div>
          <img src={product.background_image} alt="" />
        </div>
        <section>
          <h1>{product.title}</h1>
          <p>USD ${product.price}</p>
          <p>Description: {product.description}</p>
          <br />
        </section>
      </section>
    </div>
  );
};

export default ProductDetails;

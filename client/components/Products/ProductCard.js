import React from 'react';
import { Link } from 'react-router-dom';
const ProductCard = ({ id, title, image, price, user, authenticated }) => {
  return (
    <div>
      <Link to={`/products/ProductsDetails/${id}`}>
        <section>
          <img className="product-image" src={image} alt="" />
        </section>
      </Link>
      <section>
        <h3>{title}</h3>
        <p>USD ${price}</p>
        {user && authenticated && (
          <button onClick={handleAddCart} className="add-button">
            Add to Cart
          </button>
        )}
      </section>
    </div>
  );
};

export default ProductCard;

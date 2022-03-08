import React, { useEffect, useState } from 'react';
import { fetchSingleProduct } from '../../store/SingleProduct';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../../store';
import { addCart, addToCart } from '../../store/order';

const SingleProduct = (props) => {
  const [state, setState] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const product =
    useSelector((state) => {
      return state.product;
    }) || [];

  useEffect(() => {
    dispatch(fetchSingleProduct(props.match.params.id));
  }, []);

  const handleClick = () => {

    dispatch(addToCart(user.id, product, state));

  };

  const handleChange = (evt) => {
    setState(evt.target.value);
  };

  return (
    <div id="container">
      <div class="product-details">
        <h1>{product.name}</h1>
        <span class="hint-star star">
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star-o" aria-hidden="true"></i>
        </span>

        <p class="information">{product.description}</p>

        <div class="control">
          <h3>Quantity:</h3>
          <input
            name="quantity"
            type="number"
            value={state}
            onChange={handleChange}
            min="1"
            max="10"
          />
          <br></br>
          <br></br>
          <button class="btn" onClick={() => handleClick()}>
            <span class="price">$ {product.price}</span>
            <span class="shopping-cart">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </span>
            <span class="buy">Add To Cart</span>
          </button>
        </div>
      </div>

      <div class="product-image">
        <img src={product.imageURL} width="300" height="300" />

        <div class="info">
          <h2> Description</h2>
          <ul>
            <li>
              <strong>Price : </strong>$ {product.price}
            </li>
            <li>
              <strong>Calories : </strong>
              {product.calories}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

// {
/* <div>
<img src={product.imageURL} width="300" height="300" />
<ul>
  <li>{product.name}</li>
  <li>{product.description}</li>
  <li>{product.price}</li>
  <li>{product.calories}</li>
</ul>
<form id="quantity-form">
  <label>Quantity:</label>
  <input
    name="quantity"
    type="number"
    value={state}
    onChange={handleChange}
    min="1"
    max="10"
  />
</form>
<button onClick={() => handleClick()}>Add To Cart</button>
</div>
); */
// }

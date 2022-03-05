import React, { useEffect, useState } from 'react';
import { fetchSingleProduct } from '../../store/SingleProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleProduct = (props) => {
  const { singleProduct } = useSelector((state) => {
    return {
      singleProduct: state.singleProduct,
    };
  });

  const [addedToCart, setAddedToCart] = useState(false);
  // const [customerData, setCustomerData] = useState(() => {
  //   const localStorage = JSON.parse(localStorage.getItem('data'));
  //   return localStorage || [];
  // });
  const [purchaseQty, setPurchaseQty] = useState(0);

  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  useEffect(() => {
    setAddedToCart(false);
  }, []);

  // source for localStorge 'https://www.js-tutorials.com/react-js/how-to-use-localstorage-with-reactjs/#:~:text=The%20localStorage%20is%20used%20to%20store%20temporary%20data,value%20pairs%20in%20the%20browser%20for%20later%20use.'
  // useEffect(() => {
  //   localStorage.setItem('data', JSON.stringify(setCustomerData));
  // }, [setCustomerData]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setCustomerData([
      ...customerData,
      {
        id: productId,
        imageURL: imageURL,
        description: description,
        price: price,
        calories: calories,
        quantity: purchaseQty,
      },
    ]);
    setAddedToCart(true);
  };
  const { id, imageURL, description, price, calories } = singleProduct;

  return (
    <div>
      <img src={imageURL} />
      <h2>{description}</h2>
      <h4>Calories: {calories}</h4>
      <h4>Price: {price}</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="QTY">QTY:</label>
        <input
          type="number"
          id="QTY"
          name={quantity}
          min="1"
          max={quantity}
          onChange={(ev) => setPurchaseQty(ev.target.value)}
        />
        <button type="submit"> Add to Cart</button>
        <div>
          {addedToCart ? (
            <h3 style={{ color: 'blue' }}>{purchaseQty} item added to cart!</h3>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
};

export default SingleProduct;

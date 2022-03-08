import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/order';

/**
 * COMPONENT
 *
 */

const Home = (props) => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.username);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Welcome, {username}</h3>
      <div style={{ textAlign: 'center' }}>
        <img
          className="home-img"
          src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="home_pic"
        />
      </div>
    </div>
  );
};

export default Home;

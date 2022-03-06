<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/order';
=======
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/order";
>>>>>>> 78ae052aafe01db3c2d3d43e8f1f3a2f1a489554

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
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

export default Home;

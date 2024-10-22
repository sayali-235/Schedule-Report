import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../redux/modalSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  
  return (
    <div>
      <h2>Welcome, To Fleet Edge !</h2>
      <button onClick={() => dispatch(openModal())}>Schedule Your Report</button>
    </div>
  );
};

export default Home;

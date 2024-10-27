import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../redux/modalSlice';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleOpenModal = () => {
    dispatch(openModal());
    navigate('/schedule-report');
  };

  return (
    <div className="home-container">
      <h2>
        Welcome{currentUser ? `, ${currentUser.name || currentUser.email}` : ''} to Fleet Edge!
      </h2>
      <button className="schedule-button" onClick={handleOpenModal}>
        Schedule Your Report
      </button>
    </div>
  );
};

export default Home;

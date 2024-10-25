import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import InputField from '../Component/InputField';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const storedData = localStorage.getItem(currentUser.email);
      if (storedData) {
        navigate('/edit-schedule');  
      } else {
        navigate('/home'); 
      }
    }
  }, [isAuthenticated, navigate, currentUser]);

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <InputField label="Email:" type="email" value={email} onChange={setEmail} />
        <InputField label="Password:" type="password" value={password} onChange={setPassword} />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

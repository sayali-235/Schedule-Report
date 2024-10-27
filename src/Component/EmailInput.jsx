import React, { useState } from 'react';
import './EmailInput.css';

const EmailInput = ({ emailList, setEmailList }) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [email, setEmail] = useState('');
  const isValidEmail = emailRegex.test(email);

  const handleAddEmail = () => {
    if (!email) {
      return alert('Please enter an email address.');
    }
    if (emailList.length >= 5) {
      return alert('You can only add up to 5 email addresses.');
    }
    if (!emailList.includes(email) && isValidEmail) {
      setEmailList((prevList) => [...prevList, email]);
      setEmail('');
    } else {
      alert(!isValidEmail ? 'Please add a valid email.' : 'Email already exists.');
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmailList((prevList) => prevList.filter((email) => email !== emailToRemove));
  };

  return (
    <div>
      <div className="email-input-container">
        <div className="email-input">
          <label>Enter email ids</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={handleAddEmail}>+ Add</button>
      </div>
      {emailList.length > 0 && (
        <div className="email-list-box">
          {emailList.map((emailItem, index) => (
            <div key={index} className="email-chip">
              {emailItem}
              <button className="remove-email" onClick={() => handleRemoveEmail(emailItem)}>x</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailInput;

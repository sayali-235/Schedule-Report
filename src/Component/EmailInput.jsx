import React, { useEffect, useState } from 'react';
import './EmailInput.css';

const EmailInput = (props) => {
  const { emailList, setEmailList } = props;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const [email, setEmail] = useState('');
  const isvalidEmail = emailRegex.test(email);

  useEffect(() => {

  }, [emailList]);

  const handleAddEmail = () => {
    if (!email) {
      alert('Please enter an email address.');
      return;
  }
    else if (email && !emailList.includes(email)) {
      if (emailList.length >= 5) {
        alert('You can only add up to 5 email addresses.');
        return;
      }
      if (isvalidEmail) {
        setEmailList([...emailList, email]);
        setEmail('');
      } else {
        alert('Please add a valid email.');
      }
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmailList(emailList.filter((email) => email !== emailToRemove));
  };
  const Email='Add';
  const addEmail=()=>{
    if(Email=='Add'){
      Email='cancel'
    }else{
      Email='Add'
    }
  }

  return (
    <div>
      <div className="email-input-container"><div className='email-input'>
          <label>Enter email ids</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className='add-button' onClick={handleAddEmail}>+ Add</button>
      </div>
      {
        emailList?.length !== 0 &&
        <div className="email-list-box">
          {emailList.map((emailItem, index) => (
            <div key={index} className="email-chip">
              {emailItem}
              <button className="remove-email" onClick={() => handleRemoveEmail(emailItem)}>x</button>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default EmailInput;

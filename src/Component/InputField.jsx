import React from 'react';

const InputField = ({ label, type, value, onChange }) => (
  <div className="login-input-group">
    <label className="login-label">{label}</label>
    <input className="login-input" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default InputField;

import React from 'react';
import './Button.scss';

const Button = ({text, link}) => (
  <div className="btn-div">
    <button className="green-btn">
      <a href={link}>{text}</a>
    </button>
    <button className="shadow-btn" />
  </div>
);


export default Button;
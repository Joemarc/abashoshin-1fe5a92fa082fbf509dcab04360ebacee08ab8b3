import React from 'react';
import './Footer.scss';
import ABAShoshin from '../../../../assets/images/LogoABAShoshinEmpty.svg';

const Footer = () => (
  <div className="footer">
    <div className="footer-links">
      <a href="#"><i className="fab fa-instagram" /></a>
      <a href="#"><i className="fab fa-facebook" /></a>
      <a href="#"><i className="fab fa-twitter" /></a>
      <a href="#"><i className="fab fa-pinterest" /></a>
    </div>
    <img className="logo" src={ABAShoshin} alt="Logo ABA Shoshin"/>
  </div>
);


export default Footer;
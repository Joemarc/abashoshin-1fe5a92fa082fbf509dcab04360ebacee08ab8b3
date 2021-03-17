import React from 'react';
import './Navbar.scss';
import ABAShoshin from '../../../../assets/images/LogoABAShoshinEmpty.svg';

const isUserLogged = (user, isLoading) => {
  let rightNav;
  if (isLoading) {
    rightNav = <div className="links">
      <a href="/connexion">Connexion</a>
      <a href="/inscription">Inscription</a>
    </div>;
  } else if (user && !isLoading) {
    rightNav = <div className="links">
      <a href={`/users/profile`}>Mon profil</a>
    </div>;
  }
  return rightNav;
}

const Navbar = ({user, isLoading}) => (
    <div>
      <header>
        <nav>
          <img className="logo" src={ABAShoshin} alt="Logo ABA Shoshin"/>
          <input type="checkbox" id="btnMenu" />
          <label htmlFor="btnMenu" className="toggleMenu">
            <i className="fas fa-bars" />
          </label>
            <div className="links">
              <a href="/ressources">Ressources</a>
              <a href="/formations">Formation Initiale</a>
            </div>
          <div className="right-links">
            {isUserLogged(user, isLoading)}
          </div>
        </nav>
      </header>
    </div>
);


export default Navbar;
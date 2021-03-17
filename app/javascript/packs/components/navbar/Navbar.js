import React from 'react';
import './Navbar.scss'

const isUserLogged = (user, isLoading) => {
  let rightNav;
  if (isLoading) {
    rightNav = <div className="links">
      <a href="/connexion">Connexion</a>
      <a href="/inscription">Inscription</a>
    </div>;
  } else if (user && !isLoading) {
    rightNav = <div className="links">
      <a href={`/users/${user.id}`}>Mon profil</a>
    </div>;
  }
  return rightNav;
}

const Navbar = ({user, isLoading}) => (
    <div>
      <header>
        <nav>
          <label id="logo">
            ABA Shoshin
          </label>
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
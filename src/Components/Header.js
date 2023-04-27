import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../CSS/Header.css';

function Header() {
  const history = useHistory();
  const [inputDesable, setInput] = useState(false);

  const isInputDesabled = () => (inputDesable ? setInput(false) : setInput(true));

  const profileBtn = () => {
    history.push('/profile');
  };

  const verifyRoute = () => {
    const { pathname } = history.location;
    switch (pathname) {
    case '/foods':
      return 'Foods';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
    }
  };
  return (
    <div className="bigHeader">
      {verifyRoute() === 'Foods' || verifyRoute() === 'Drinks'
        ? (
          <>
            <div className="header">
              <h5 data-testid="page-title">{ verifyRoute() }</h5>
              <div className="headerButtons">
                <button
                  className="search"
                  type="button"
                  onClick={ () => isInputDesabled() }
                >
                  <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
                </button>
                <button
                  className="profile"
                  type="button"
                  onClick={ profileBtn }
                >
                  <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
                </button>
              </div>
            </div>
            {(inputDesable && <SearchBar />)}
          </>
        )
        : (
          <div className="header">
            <h5 data-testid="page-title">{ verifyRoute() }</h5>
            <div className="headerButtons">
              <button
                className="profile"
                type="button"
                onClick={ profileBtn }
              >
                <img
                  data-testid="profile-top-btn"
                  src={ profileIcon }
                  alt="profile-icon"
                />
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

export default Header;

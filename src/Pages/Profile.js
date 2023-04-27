import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../CSS/Profile.css';

function Profile() {
  const history = useHistory();
  const emailDoLocal = JSON.parse(localStorage.getItem('user')) || { email: '' };
  const clearDoLocal = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="conteinerProfile">
      <Header />
      <div className="profileInfor">
        <p
          data-testid="profile-email"
          className="profile-email"
        >
          { emailDoLocal.email }
        </p>
        <div className="conteinerButtons">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="profileBnt"
            onClick={ () => { history.push('/done-recipes'); } }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="profileBnt"
            onClick={ () => { history.push('/favorite-recipes'); } }
          >
            Favorite Recipes
          </button>
        </div>
        <div className="conteinerLogout">
          <button
            type="button"
            data-testid="profile-logout-btn"
            className="profile-logout-btn"
            onClick={ () => { clearDoLocal(); } }
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

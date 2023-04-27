import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../CSS/FavoriteRecipes.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState();
  const [renderAgain, setRenderAgain] = useState(false);
  const [copied, setCopied] = useState('');

  const getLocalStorage = () => {
    const favoritesLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorite(favoritesLocal);
  };

  const copyLink = ({ target }) => {
    const { id, name } = target;
    if (name === 'food') {
      copy(`http://localhost:3000/foods/${id}`);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
    }
    setCopied(id);
  };

  const unfavoriteRecipe = ({ target }) => {
    const { name } = target;
    const favoritesLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const changeRecipes = favoritesLocal.filter((element) => element.id !== name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(changeRecipes));
    setRenderAgain(!renderAgain);
  };

  const filterByCategory = ({ target }) => {
    const { name } = target;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (name !== 'all') {
      setFavorite(favorites.filter((element) => element.type === name));
    } else {
      getLocalStorage();
    }
  };

  useEffect(() => {
    getLocalStorage();
    setCopied('');
  }, [renderAgain]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {

  }, [favorite]);

  return (
    <div>
      { favorite
        && (
          <div>
            <Header />
            <div className="favoritAllFilter">
              <button
                onClick={ filterByCategory }
                name="all"
                type="button"
                data-testid="filter-by-all-btn"
                className="favoritButton"
              >
                All

              </button>
              <button
                onClick={ filterByCategory }
                name="food"
                type="button"
                data-testid="filter-by-food-btn"
                className="favoritButton"
              >
                Food

              </button>
              <button
                onClick={ filterByCategory }
                name="drink"
                type="button"
                data-testid="filter-by-drink-btn"
                className="favoritButton"
              >
                Drink

              </button>
            </div>
            {favorite.map((item, index) => {
              if (item.type === 'food') {
                return (
                  <div key={ index } className="favoriteConteiner">
                    <Link
                      to={ `/foods/${item.id}` }
                      className="favoritLink"
                    >
                      <div className="linkContainer">
                        <div>
                          <img
                            data-testid={ `${index}-horizontal-image` }
                            className="favoritImg"
                            src={ item.image }
                            alt="foto da receita"
                            width="200px"
                          />
                        </div>
                        <div className="favoritInfor">
                          <p
                            data-testid={ `${index}-horizontal-top-text` }
                          >
                            { `${item.nationality} - ${item.category}` }
                          </p>
                          <h3 data-testid={ `${index}-horizontal-name` }>{item.name}</h3>
                        </div>
                      </div>
                    </Link>
                    <div className="favoritButtons">
                      <button
                        onClick={ copyLink }
                        id={ item.id }
                        name={ item.type }
                        src={ shareIcon }
                        data-testid={ `${index}-horizontal-share-btn` }
                        type="button"
                        className="favorite-bnt"
                      >
                        <img
                          id={ item.id }
                          name={ item.type }
                          src={ shareIcon }
                          alt="copiar-link"
                        />
                      </button>
                      <button
                        name={ item.id }
                        src={ blackHeartIcon }
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        type="button"
                        onClick={ unfavoriteRecipe }
                        className="favorite-bnt"
                      >
                        <img name={ item.id } src={ blackHeartIcon } alt="favoritar" />
                      </button>
                      { copied === item.id && <p>Link copied!</p> }
                    </div>
                  </div>);
              }
              return (
                <div key={ index } className="favoriteConteiner">
                  <Link
                    to={ `/drinks/${item.id}` }
                    className="favoritLink"
                  >
                    <div className="linkContainer">
                      <div>
                        <img
                          data-testid={ `${index}-horizontal-image` }
                          className="favoritImg"
                          src={ item.image }
                          alt="foto da receita"
                          width="200px"
                        />
                      </div>
                      <div className="favoritInfor">
                        <p
                          data-testid={ `${index}-horizontal-top-text` }
                        >
                          { `${item.alcoholicOrNot}` }
                        </p>
                        <h3 data-testid={ `${index}-horizontal-name` }>{item.name}</h3>
                      </div>
                    </div>
                  </Link>
                  <div className="favoritButtons">
                    <button
                      onClick={ copyLink }
                      id={ item.id }
                      name={ item.type }
                      src={ shareIcon }
                      data-testid={ `${index}-horizontal-share-btn` }
                      type="button"
                    >
                      <img
                        id={ item.id }
                        name={ item.type }
                        src={ shareIcon }
                        alt="copiar-link"
                      />
                    </button>
                    <button
                      name={ item.id }
                      src={ blackHeartIcon }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      type="button"
                      onClick={ unfavoriteRecipe }
                    >
                      <img name={ item.id } src={ blackHeartIcon } alt="favoritar" />
                    </button>
                    { copied === item.id && <p>Link copied!</p> }
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}

export default FavoriteRecipes;

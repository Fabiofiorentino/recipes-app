import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../CSS/FavoriteRecipesBtn.css';

function FavoriteRecipesBtn({ id, recipe }) {
  const history = useHistory();
  const { pathname } = history.location;
  const [favorited, setFavorited] = useState(false);

  const verifyRecipeId = () => {
    const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const exists = favoritedRecipes.some((element) => element.id === id);
    if (exists) {
      setFavorited(true);
    }
  };

  const favoriteRecipeBtn = () => {
    const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (pathname.includes('/drinks')) {
      const newObj = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
      favoritedRecipes.push(newObj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritedRecipes));
    } else {
      const newObj = {
        id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      favoritedRecipes.push(newObj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritedRecipes));
    }
    setFavorited(true);
  };

  const removeFavorite = () => {
    const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const removed = favoritedRecipes.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
    setFavorited(false);
  };

  useEffect(() => {
    verifyRecipeId();
  }, []);

  if (favorited) {
    return (
      <button
        src={ blackHeartIcon }
        onClick={ () => removeFavorite() }
        type="button"
        data-testid="favorite-btn"
        className="favorite-btn"
      >
        <img src={ blackHeartIcon } alt="favoritar" />
      </button>
    );
  }

  return (
    <button
      onClick={ () => favoriteRecipeBtn() }
      type="button"
      data-testid="favorite-btn"
      className="favorite-btn"
      src={ whiteHeartIcon }
    >
      <img src={ whiteHeartIcon } alt="favoritar" />
    </button>
  );
}

FavoriteRecipesBtn.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.shape().isRequired,
};

export default FavoriteRecipesBtn;

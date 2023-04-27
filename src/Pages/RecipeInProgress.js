import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteRecipesBtn from '../Components/FavoriteRecipesBtn';
import ShareRecipeBtn from '../Components/ShareRecipeBtn';
import '../CSS/RecipeInProgress.css';

function RecipeInProgress({ match }) {
  const { id } = match.params;
  const history = useHistory();
  const { pathname } = history.location;
  const [actualRecipe, setActualRecipe] = useState();
  const [ingredients, setIngredients] = useState();
  const [measures, setMeasures] = useState();
  const [usedIngredients, setUsedIngredients] = useState();
  const [teste, setTeste] = useState(false);
  const localStorageFirst = (pathname.includes('foods') ? {
    cocktails: {},
    meals: { [id]: [] },
  }
    : {
      cocktails: { [id]: [] },
      meals: { },
    });
  const setInProgressRecipes = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageFirst));
      setTeste(!teste);
    }
  };
  const getUsedIngredients = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (pathname.includes('/drinks')) {
      const { cocktails } = inProgressRecipes;
      setUsedIngredients(cocktails[id]);
    }
    if (pathname.includes('/foods')) {
      const { meals } = inProgressRecipes;
      setUsedIngredients(meals[id]);
    }
  };
  const onChangeCheckbox = ({ target }) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let { meals } = inProgressRecipes;
    let { cocktails } = inProgressRecipes;
    if (target.checked) {
      if (pathname.includes('foods')) {
        meals = { ...meals,
          [id]: [...meals[id], target.value] };
        localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
        getUsedIngredients();
      } else {
        cocktails = { ...cocktails,
          [id]: [...cocktails[id], target.value] };
        localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
        getUsedIngredients();
      }
    }
    if (!target.checked) {
      if (pathname.includes('foods')) {
        meals = { ...meals,
          [id]: [...meals[id].filter((element) => element !== target.value)] };
        localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
        getUsedIngredients();
      } else {
        cocktails = { ...cocktails,
          [id]: [...cocktails[id].filter((element) => element !== target.value)] };
        localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
        getUsedIngredients();
      }
    }
  };
  const getDrinkById = async () => {
    const reponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const drink = await reponse.json();
    setActualRecipe(drink.drinks[0]);
  };
  const getFoodById = async () => {
    const reponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const meal = await reponse.json();
    setActualRecipe(meal.meals[0]);
  };
  const getFood = () => {
    if (pathname.includes('drinks')) {
      getDrinkById();
    } else {
      getFoodById();
    }
  };
  const getIngredients = () => {
    const keys = Object.keys(actualRecipe);
    const a = keys.filter((element) => element.includes('Ingredient'));
    const ingredientes = [];
    a.forEach((element) => {
      if (actualRecipe[element] !== null && actualRecipe[element] !== '') {
        ingredientes.push(actualRecipe[element]);
      }
    });
    const m = keys.filter((element) => element.includes('Measure'));
    const measure = [];
    m.forEach((item) => {
      if (actualRecipe[item] !== null && actualRecipe[item] !== ' ') {
        measure.push(actualRecipe[item]);
      }
    });
    setIngredients(ingredientes);
    setMeasures(measure);
  };
  useEffect(() => {
    setInProgressRecipes();
    getFood();
    getUsedIngredients();
  }, []);
  useEffect(() => {
    if (actualRecipe) {
      getIngredients();
    }
  }, [actualRecipe]);
  const inputs = () => ingredients.map((element, index) => (
    <div key={ index } data-testid={ `${index}-ingredient-step` }>
      <input
        name={ `${element} ${measures[index] || ''}` }
        id={ `${index}-ingredient` }
        type="checkbox"
        value={ `${element} ${measures[index] || ''}` }
        onChange={ onChangeCheckbox }
        checked={ usedIngredients.includes(`${element} ${measures[index] || ''}`) }
        className="input"
      />
      <label htmlFor={ `${index}-ingredient` }>
        { `${element} ${measures[index] || ''}` }
      </label>
    </div>
  ));
  useEffect(() => { getFood(); }, [teste]);
  const finishRecipe = () => {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    if (pathname.includes('/drinks')) {
      const newObj = {
        id: actualRecipe.idDrink,
        type: 'drink',
        nationality: '',
        category: actualRecipe.strCategory,
        alcoholicOrNot: actualRecipe.strAlcoholic,
        name: actualRecipe.strDrink,
        image: actualRecipe.strDrinkThumb,
        tags: [],
      };
      done.push(newObj);
      localStorage.setItem('doneRecipes', JSON.stringify(done));
    } else {
      const newObj = {
        id: actualRecipe.idMeal,
        type: 'food',
        nationality: actualRecipe.strArea,
        category: actualRecipe.strCategory,
        alcoholicOrNot: '',
        name: actualRecipe.strMeal,
        image: actualRecipe.strMealThumb,
        tags: [...actualRecipe.strTags.split(',')],
      };
      done.push(newObj);
      localStorage.setItem('doneRecipes', JSON.stringify(done));
    }
    history.push('/done-recipes');
  };
  const buttonFinish = () => (
    <button
      className="finish-recipe-btn"
      data-testid="finish-recipe-btn"
      type="button"
      disabled={ (ingredients.length !== usedIngredients.length) }
      onClick={ finishRecipe }
    >
      Finish Recipe
    </button>);
  return (
    <div>
      {actualRecipe && ingredients && usedIngredients
      && (
        <div>
          {pathname.includes('/drinks')
            ? (
              <div>
                <div className="img">
                  <img
                    data-testid="recipe-photo"
                    className="photo"
                    src={ actualRecipe.strDrinkThumb }
                    alt="bebida"
                  />
                </div>
                <div className="table">
                  <div className="names">
                    <h2 data-testid="recipe-title">{actualRecipe.strDrink}</h2>
                    <p data-testid="recipe-category">{actualRecipe.strCategory}</p>
                  </div>
                  <div className="buttons">
                    <ShareRecipeBtn recipe={ actualRecipe } id={ id } />
                    <FavoriteRecipesBtn id={ id } recipe={ actualRecipe } />
                  </div>
                </div>
                <div className="conteinerIngred">
                  <h2>Ingredients</h2>
                  <hr />
                  { inputs() }
                </div>
                <div className="containerInstruc">
                  <h2>Instructions</h2>
                  <hr />
                  <p data-testid="instructions">{actualRecipe.strInstructions}</p>
                </div>
                { buttonFinish() }
              </div>
            ) : (
              <div>
                <div className="img">
                  <img
                    data-testid="recipe-photo"
                    className="photo"
                    src={ actualRecipe.strMealThumb }
                    alt="comida"
                  />
                </div>
                <div className="table">
                  <div className="names">
                    <h2 data-testid="recipe-title">{actualRecipe.strMeal}</h2>
                    <p data-testid="recipe-category">{actualRecipe.strCategory}</p>
                  </div>
                  <div className="buttons">
                    <ShareRecipeBtn recipe={ actualRecipe } id={ id } />
                    <FavoriteRecipesBtn id={ id } recipe={ actualRecipe } />
                  </div>
                </div>
                <div className="conteinerIngred">
                  <h2>Ingredients</h2>
                  <hr />
                  { inputs() }
                </div>
                <div className="containerInstruc">
                  <h2>Instructions</h2>
                  <hr />
                  <p data-testid="instructions">{actualRecipe.strInstructions}</p>
                </div>
                { buttonFinish() }
              </div>
            )}
        </div>
      )}
    </div>
  );
}
RecipeInProgress.propTypes = {
  match: PropTypes.shape().isRequired, id: PropTypes.string.isRequired,
};
export default RecipeInProgress;

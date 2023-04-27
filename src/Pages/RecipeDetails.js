import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecommendedDrinks from '../Components/RecommendedDrinks';
import RecommendedFoods from '../Components/RecommendedFoods';
import FavoriteRecipesBtn from '../Components/FavoriteRecipesBtn';
import ShareRecipeBtn from '../Components/ShareRecipeBtn';
import '../CSS/RecipeDetails.css';

function RecipeDetails({ match }) {
  const { id } = match.params;
  const history = useHistory();
  const { pathname } = history.location;
  const [actualRecipe, setActualRecipe] = useState();
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState();
  const [measures, setMeasures] = useState();
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    cocktails: {},
    meals: {},
  };
  const [teste, setTeste] = useState(false);

  const verifyInProgressRecipe = () => {
    if (pathname.includes('/drinks')) {
      const { cocktails } = inProgress;
      return Object.keys(cocktails).includes(id);
    }
    if (pathname.includes('/foods')) {
      const { meals } = inProgress;
      return Object.keys(meals).includes(id);
    }
  };
  const goToRecipesDetails = () => {
    let { meals } = inProgress;
    let { cocktails } = inProgress;
    if (pathname.includes('/foods')) {
      if (!Object.keys(meals).includes(id)) {
        meals = { ...meals,
          [id]: [],
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
      }
      history.push(`/foods/${id}/in-progress`);
    }
    if (pathname.includes('/drinks')) {
      if (!Object.keys(cocktails).includes(id)) {
        cocktails = { ...cocktails,
          [id]: [],
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
      }
      history.push(`/drinks/${id}/in-progress`);
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
  const getDrinkById = async () => {
    setLoading(true);
    const reponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const drink = await reponse.json();
    setActualRecipe(drink.drinks[0]);
    setLoading(false);
  };
  const getFoodById = async () => {
    setLoading(true);
    const reponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const meal = await reponse.json();
    setActualRecipe(meal.meals[0]);
    setLoading(false);
  };

  useEffect(() => {
    if (actualRecipe) {
      getIngredients();
    }
  }, [actualRecipe]);

  const getFood = () => {
    if (pathname.includes('drinks')) {
      getDrinkById();
    } else {
      getFoodById();
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  useEffect(() => {
    getFood();
  }, [teste]);

  const replaceYoutubeLink = (string) => string.replace('watch?v=', 'embed/');

  if (loading) {
    return <p>carregando</p>;
  }

  return (
    <div>
      { ingredients && measures
      && (
        <div>
          <div>
            {pathname.includes('/drinks')
              ? (
                <div className="container">
                  <div className="img">
                    <img
                      data-testid="recipe-photo"
                      className="photo"
                      src={ actualRecipe.strDrinkThumb }
                      alt={ actualRecipe.strDrink }
                    />
                  </div>
                  <div className="table">
                    <div className="names">
                      <h2 data-testid="recipe-title">{actualRecipe.strDrink}</h2>
                      <p data-testid="recipe-category">{actualRecipe.strAlcoholic}</p>
                    </div>
                    <div className="buttons">
                      <ShareRecipeBtn recipe={ actualRecipe } id={ id } />
                      <FavoriteRecipesBtn id={ id } recipe={ actualRecipe } />
                    </div>
                  </div>
                  <div className="conteinerIngred">
                    <h3>Ingredientes</h3>
                    <hr />
                    <ul>
                      {ingredients.map((element, index) => (
                        <li
                          key={ element }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          <span>{`${element} `}</span>
                          <span>{ measures[index] || ''}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="containerInstruc">
                    <h3>Instructions</h3>
                    <hr />
                    <p data-testid="instructions">{actualRecipe.strInstructions}</p>
                  </div>
                  <div className="conteinerRecomend">
                    <h3>Recomendação</h3>
                    <hr />
                    <div>
                      <RecommendedFoods
                        setTeste={ setTeste }
                        teste={ teste }
                        setLoading={ setLoading }
                      />
                    </div>
                  </div>
                </div>
              )
              : (
                <div>
                  <div className="img">
                    <img
                      data-testid="recipe-photo"
                      className="photo"
                      src={ actualRecipe.strMealThumb }
                      alt={ actualRecipe.strMeal }
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
                    <h3>Ingredientes</h3>
                    <hr />
                    <ul>
                      {ingredients.map((element, index) => (
                        <li
                          key={ element }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          <span>{`${element}  `}</span>
                          <span>{ measures[index] || ''}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="containerInstruc">
                    <h3>Instructions</h3>
                    <hr />
                    <p data-testid="instructions">
                      {actualRecipe.strInstructions}
                    </p>
                  </div>
                  <div className="containerVideo">
                    <iframe
                      className="video"
                      data-testid="video"
                      title="Vídeo de receita"
                      width="420"
                      height="345"
                      src={ replaceYoutubeLink(actualRecipe.strYoutube) }
                    />
                  </div>
                  <div className="conteinerRecomend">
                    <h3>Recomendações</h3>
                    <hr />
                    <RecommendedDrinks
                      setTeste={ setTeste }
                      teste={ teste }
                      setLoading={ setLoading }
                    />
                  </div>
                </div>
              )}
          </div>
          <div className="conteinerButton">
            <button
              className="start-recipe-btn"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => goToRecipesDetails() }
            >
              { verifyInProgressRecipe() === true ? <span>Continue Recipe</span>
                : <span>Start Recipe</span>}

            </button>
          </div>
        </div>)}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeDetails;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../CSS/RecommendedFoods.css';

function RecommendedFoods({ setTeste, teste, setLoading }) {
  const [recommendedFoods, SetRecommendedFoods] = useState([]);

  const recommendationFoods = async () => {
    const length = 6;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foods = await response.json();
    SetRecommendedFoods(foods.meals.slice(0, length));
  };

  useEffect(() => {
    recommendationFoods();
  }, []);

  return (
    <div style={ { display: 'flex' } } className="recommendations">
      { recommendedFoods.map((card, index) => (
        <Link
          onClick={ () => {
            setTeste(!teste);
            setLoading(true);
          } }
          key={ index }
          to={ `/foods/${card.idMeal}` }
          className="linkRecipes"
        >
          <div data-testid={ `${index}-recomendation-card` } className="card">
            <h2 data-testid={ `${index}-recomendation-title` }>{ card.strMeal }</h2>
            <img
              alt="food"
              data-testid={ `${index}-card-img` }
              src={ card.strMealThumb }
              width="300"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

RecommendedFoods.propTypes = {
  setTeste: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  teste: PropTypes.bool.isRequired,
};

export default RecommendedFoods;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../CSS/RecommendedDrinks.css';

function RecommendedDrinks({ setTeste, teste, setLoading }) {
  const [recommendedDrinks, setRecommendedDrinks] = useState([]);

  const recommendationDrinks = async () => {
    const length = 6;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinks = await response.json();
    setRecommendedDrinks(drinks.drinks.slice(0, length));
  };

  useEffect(() => {
    recommendationDrinks();
  }, []);

  return (
    <div style={ { display: 'flex' } } className="recommendations">
      { recommendedDrinks.map((card, index) => (

        <Link
          onClick={ () => {
            setLoading(true);
            setTeste(!teste);
          } }
          key={ index }
          to={ `/drinks/${card.idDrink}` }
          className="linkRecipes"
        >
          <div data-testid={ `${index}-recomendation-card` } className="card">
            <h2 data-testid={ `${index}-recomendation-title` }>{ card.strDrink }</h2>
            <img
              alt="food"
              data-testid={ `${index}-card-img` }
              src={ card.strDrinkThumb }
              width="300"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

RecommendedDrinks.propTypes = {
  setTeste: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  teste: PropTypes.bool.isRequired,
};

export default RecommendedDrinks;

import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/Cards.css';

function Cards({ index, image, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="card">
      <img
        alt="food"
        className="imgCard"
        data-testid={ `${index}-card-img` }
        src={ image }
        width="300"
      />
      <h3 data-testid={ `${index}-card-name` } className="cardName">{ name }</h3>
    </div>
  );
}

Cards.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Cards;

import React, { useContext } from 'react';
import Context from '../Context/Context';
import '../CSS/DrinkFilterButtons.css';

function ButtonDrink() {
  const { categoryFilter,
    setCategoryFilter, categoriesDrink } = useContext(Context);

  const toggleFilters = (value) => {
    if (categoryFilter === value) {
      setCategoryFilter('All');
    } else {
      setCategoryFilter(value);
    }
  };

  return (
    <div className="drinkButtons">
      { categoriesDrink
        .map((categorie, index) => (
          <button
            className="filterDrinkButtons"
            value={ categorie.strCategory }
            key={ index }
            data-testid={ `${categorie.strCategory}-category-filter` }
            type="button"
            onClick={ ({ target }) => { toggleFilters(target.value); } }
          >
            {categorie.strCategory}
          </button>))}
      <button
        className="filterDrinkButtons"
        type="button"
        onClick={ ({ target }) => { setCategoryFilter(target.value); } }
        value="All"
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

export default ButtonDrink;

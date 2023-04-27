import React, { useContext } from 'react';
import Context from '../Context/Context';
import '../CSS/FoodFilterButtons.css';

function FoodFilterButtons() {
  const { categoriesFood,
    setCategoryFilter,
    categoryFilter } = useContext(Context);

  const toggleFilters = (value) => {
    if (categoryFilter === value) {
      setCategoryFilter('All');
    } else {
      setCategoryFilter(value);
    }
  };

  return (
    <div className="foodButtons">
      { categoriesFood
        .map((categorie, index) => (
          <button
            className="filterFoodButtons"
            value={ categorie.strCategory }
            key={ index }
            data-testid={ `${categorie.strCategory}-category-filter` }
            type="button"
            onClick={ ({ target }) => { toggleFilters(target.value); } }
          >
            {categorie.strCategory}
          </button>))}
      <button
        className="filterFoodButtons"
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

export default FoodFilterButtons;

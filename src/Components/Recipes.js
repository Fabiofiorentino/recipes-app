import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Cards from './Cards';
import Context from '../Context/Context';
import FoodFilterButtons from './FoodFilterButtons';
import DrinkFilterButtons from './DrinkFilterButtons';
import '../CSS/Recipes.css';

function Recipes() {
  const { cards, initialFoods, renderCards, initialDrinks,
    categoryFilter, filterByFoodCategory, filterByDrinksCategory } = useContext(Context);
  const history = useHistory();
  const { pathname } = history.location;

  const verifyRoute = () => {
    switch (pathname) {
    case '/foods':
      return 'Foods';
    case '/drinks':
      return 'Drinks';
    default:
    }
  };

  useEffect(() => {
    if (initialFoods !== undefined || initialDrinks !== undefined) {
      if (pathname === '/foods') {
        filterByFoodCategory();
      } else if (pathname === '/drinks') {
        filterByDrinksCategory();
      }
    }
  }, [categoryFilter]);

  useEffect(() => {
    switch (pathname) {
    case '/foods':
      if (initialFoods !== undefined) {
        renderCards(initialFoods);
      }
      break;
    case '/drinks':
      if (initialDrinks !== undefined) {
        renderCards(initialDrinks);
      }
      break;
    default:
    }
  }, [initialFoods, initialDrinks]);

  return (
    <div>
      { initialDrinks && initialFoods
       && (
         <div>
           {verifyRoute() === 'Foods'
             ? (
               <div>
                 <FoodFilterButtons />
                 <div className="food">
                   { cards.map((card, index) => (
                     <Link
                       key={ index }
                       to={ `/foods/${card.idMeal}` }
                       className="linkRecipes"
                     >
                       <Cards
                         index={ index }
                         image={ card.strMealThumb }
                         name={ card.strMeal }
                       />
                     </Link>
                   ))}
                 </div>
               </div>
             )
             : (
               <div>
                 <DrinkFilterButtons />
                 <div className="drink">
                   { cards.map((card, index) => (
                     <Link
                       key={ index }
                       to={ `/drinks/${card.idDrink}` }
                       className="linkRecipes"
                     >
                       <Cards
                         index={ index }
                         image={ card.strDrinkThumb }
                         name={ card.strDrink }
                       />
                     </Link>
                   ))}
                 </div>
               </div>
             )}
         </div>)}
    </div>
  );
}

export default Recipes;

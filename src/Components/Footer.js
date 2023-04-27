import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import foodsIcon from '../images/mealIcon.svg';
import '../CSS/Footer.css';
import Context from '../Context/Context';

function Footer() {
  const history = useHistory();
  const { renderCards, initialFoods,
    initialDrinks, setCategoryFilter } = useContext(Context);

  useEffect(() => {

  }, [initialDrinks, initialFoods]);

  const drinksButton = () => {
    setCategoryFilter('All');
    renderCards(initialDrinks);
    history.push('/drinks');
  };
  const foodsButton = () => {
    setCategoryFilter('All');
    renderCards(initialFoods);
    history.push('/foods');
  };

  return (
    <div className="conteinerFooter">
      { initialDrinks && initialFoods
       && (
         <div className="footer">
           <button
             className="footerButton"
             type="button"
             onClick={ drinksButton }
           >
             <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks" />
           </button>

           <button
             className="footerButton"
             type="button"
             onClick={ foodsButton }
           >
             <img data-testid="food-bottom-btn" src={ foodsIcon } alt="foods" />
           </button>
         </div>) }
    </div>
  );
}

export default Footer;

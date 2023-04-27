import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../CSS/DoneRecipes.css';
import '../CSS/Header.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneFoods, setDoneFoods] = useState();
  const [doneDrinks, setDoneDrinks] = useState();
  const [allDoneRecipes, setDoneRecipes] = useState();
  const [cardsRecipes, setCardsRecipes] = useState();
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const x = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(x);
  }, []);

  useEffect(() => {
    if (allDoneRecipes) {
      setCardsRecipes(allDoneRecipes);
      setDoneFoods(allDoneRecipes.filter((foods) => foods.type === 'food'));
      setDoneDrinks(allDoneRecipes.filter((drinks) => drinks.type === 'drink'));
    }
  }, [allDoneRecipes]);

  const filterButton = (value) => {
    if (value) {
      setCardsRecipes(value);
    }
  };

  const copyLink = ({ target }) => {
    const { id, name } = target;
    if (name === 'food') {
      copy(`http://localhost:3000/foods/${id}`);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
    }
    setCopied(id);
  };
  return (
    <div>
      { allDoneRecipes && doneFoods && doneDrinks && cardsRecipes
     && (
       <div>
         <Header />
         <div className="doneAllFilter">
           <button
             type="button"
             data-testid="filter-by-food-btn"
             className="buttonFilter"
             onClick={ () => filterButton(doneFoods) }
           >
             Food
           </button>
           <button
             type="button"
             data-testid="filter-by-drink-btn"
             className="buttonFilter"
             onClick={ () => filterButton(doneDrinks) }
           >
             Drinks
           </button>
           <button
             type="button"
             data-testid="filter-by-all-btn"
             className="buttonFilter"
             onClick={ () => filterButton(allDoneRecipes) }
           >
             All
           </button>
         </div>
         <div className="bigConteiner">
           { cardsRecipes.map((recipe, index) => (recipe.type === 'food' ? (
             <div key={ index } className="doneConteiner">
               <NavLink
                 to={ `/foods/${recipe.id}` }
                 activeClassName="is-active"
                 className="is-active"
               >
                 <div className="navConteiner">
                   <div className="conteinerImg">
                     <img
                       data-testid={ `${index}-horizontal-image` }
                       className="doneImg"
                       src={ recipe.image }
                       alt={ recipe.name }
                     />
                   </div>
                   <div className="doneInfor">
                     <p
                       data-testid={ `${index}-horizontal-top-text` }
                     >
                       {`${recipe.nationality} - ${recipe.category}`}

                     </p>
                     <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
                     <h4 data-testid={ `${index}-horizontal-done-date` }>
                       {recipe.doneDate}
                     </h4>
                     { recipe.tags.map((tag) => (
                       <p
                         key={ tag }
                         data-testid={ `${index}-${tag}-horizontal-tag` }
                       >
                         {tag}
                       </p>
                     ))}
                   </div>
                 </div>
               </NavLink>
               <div className="doneButton">
                 <button
                   id={ recipe.id }
                   name={ recipe.type }
                   type="button"
                   onClick={ copyLink }
                   src={ shareIcon }
                   data-testid={ `${index}-horizontal-share-btn` }
                   className="share-bnt"
                 >
                   <img
                     id={ recipe.id }
                     name={ recipe.type }
                     src={ shareIcon }
                     alt="share icon"
                   />
                 </button>
                 { copied === recipe.id && <p>Link copied!</p> }
               </div>

             </div>)
             : (
               <div key={ index } className="doneConteiner">
                 <NavLink
                   to={ `/drinks/${recipe.id}` }
                   activeClassName="is-active"
                   className="is-active"
                 >
                   <div className="navConteiner">
                     <div className="conteinerImg">
                       <img
                         data-testid={ `${index}-horizontal-image` }
                         className="doneImg"
                         src={ recipe.image }
                         alt={ recipe.name }
                       />
                     </div>
                     <div className="doneInfor">
                       <p data-testid={ `${index}-horizontal-top-text` }>
                         {recipe.category}
                       </p>
                       <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
                       <h4
                         data-testid={ `${index}-horizontal-top-text` }
                       >
                         {recipe.alcoholicOrNot}
                       </h4>
                       <h4 data-testid={ `${index}-horizontal-done-date` }>
                         {recipe.doneDate}
                       </h4>
                     </div>
                   </div>
                 </NavLink>
                 <div className="doneButton">
                   <button
                     id={ recipe.id }
                     name={ recipe.type }
                     type="button"
                     onClick={ copyLink }
                     src={ shareIcon }
                     data-testid={ `${index}-horizontal-share-btn` }
                     className="share-bnt"
                   >
                     <img
                       id={ recipe.id }
                       name={ recipe.type }
                       src={ shareIcon }
                       alt="share icon"
                     />
                   </button>
                   { copied === recipe.id && <p>Link copied!</p> }
                 </div>
               </div>
             )))}
         </div>
       </div>)}
    </div>
  );
}

export default DoneRecipes;

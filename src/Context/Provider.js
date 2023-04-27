import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Context from './Context';

function Provider({ children }) {
  const lengthCategories = 5;
  const history = useHistory();
  const { pathname } = history.location;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchMethod, setSearchMethod] = useState();
  const [data, setData] = useState();
  const [searchBar, setSearchBar] = useState('');
  const [cards, setCards] = useState([]);
  const [initialFoods, setInitialFoods] = useState();
  const [initialDrinks, setInitialDrinks] = useState();
  const [categoriesFood, setcategoriesFood] = useState([]);
  const [categoriesDrink, setcategoriesDrink] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const favoriteRecipes = [];

  const localStorageFirst = {
    meals: {},
    cocktails: {},
  };

  const doneRecipes = [];

  const getFetchTypeMeal = () => {
    switch (searchMethod) {
    case ('ingrediente'):
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBar}`;
    case ('nome'):
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBar}`;
    case ('primeira-letra'):
      if (searchBar.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        return `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBar}`;
      }
      break;
    default:
    }
  };

  const fetchInitialFoods = async () => {
    const length = 12;
    const mealsResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foods = await mealsResponse.json();
    const initialFood = { meals: foods.meals.slice(0, length) };
    setInitialFoods(initialFood);
    const drinksResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinks = await drinksResponse.json();
    const initialDrink = { drinks: drinks.drinks.slice(0, length) };
    setInitialDrinks(initialDrink);
  };

  const getFetchTypeDrink = () => {
    switch (searchMethod) {
    case ('ingrediente'):
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchBar}`;
    case ('nome'):
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchBar}`;
    case ('primeira-letra'):
      if (searchBar.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchBar}`;
      }
      break;
    default:
    }
  };

  const getFetchCategoriesFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const foodsCategories = await response.json();
    const food = { categories: foodsCategories.meals.slice(0, lengthCategories) };
    setcategoriesFood(food.categories);
  };

  const getFetchCategoriesDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const drinksCategories = await response.json();
    const drink = { categories: drinksCategories.drinks.slice(0, lengthCategories) };
    setcategoriesDrink(drink.categories);
  };

  const renderCards = (foods) => {
    const foodsOrDrinks = foods.meals || foods.drinks;
    if (foodsOrDrinks === null || foodsOrDrinks === undefined) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.'); // fiz isso por causa do Lint - Danilo
    }
    const maxLength = 12;
    const cardsToRender = foodsOrDrinks.length > maxLength
      ? foodsOrDrinks.slice(0, maxLength)
      : foodsOrDrinks;
    setCards(cardsToRender);
  };

  const submitSearch = async () => {
    const URL = (pathname === '/foods' ? getFetchTypeMeal() : getFetchTypeDrink());
    const response = await fetch(URL);
    const foods = await response.json();
    setData(foods);
    renderCards(foods);
  };

  const goToDetails = () => {
    switch (pathname) {
    case ('/foods'):
      if (data.meals.length === 1) {
        history.push(`/foods/${data.meals[0].idMeal}`);
      }
      break;
    case ('/drinks'):
      if (data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      }
      break;
    default:
    }
  };

  const filterByFoodCategory = async () => {
    if (categoryFilter !== 'All') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryFilter}`);
      const dataa = await response.json();
      renderCards(dataa);
    } else {
      renderCards(initialFoods);
    }
  };

  const filterByDrinksCategory = async () => {
    if (categoryFilter !== 'All') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryFilter}`);
      const dataa = await response.json();
      renderCards(dataa);
    } else {
      renderCards(initialDrinks);
    }
  };

  const setFavoriteRecipes = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  };

  const setDoneRecipes = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
  };

  const setInProgressRecipes = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageFirst));
    }
  };

  useEffect(() => {
    fetchInitialFoods();
    getFetchCategoriesDrink();
    getFetchCategoriesFood();
    setFavoriteRecipes();
    setDoneRecipes();
    setInProgressRecipes();
  }, []);

  useEffect(() => {
    if (typeof data === 'object') {
      const value = Object.keys(data)[0];
      return data[value] === null ? true : goToDetails();
    }
  }, [data]);

  const initialState = { setEmail,
    setPassword,
    email,
    password,
    setSearchMethod,
    data,
    submitSearch,
    searchBar,
    setSearchBar,
    cards,
    setCards,
    categoriesFood,
    setcategoriesFood,
    categoriesDrink,
    setcategoriesDrink,
    initialFoods,
    initialDrinks,
    renderCards,
    setCategoryFilter,
    categoryFilter,
    filterByDrinksCategory,
    filterByFoodCategory };
  return (
    <div>
      <Context.Provider value={ initialState }>
        { children }
      </Context.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

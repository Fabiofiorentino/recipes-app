import React, { useContext } from 'react';
import Context from '../Context/Context';
import '../CSS/SearchBar.css';

function SearchBar() {
  const { setSearchMethod, submitSearch, searchBar, setSearchBar } = useContext(Context);
  return (
    <div className="searchBar">
      <div className="conteiner-search-input">
        <input
          type="text"
          value={ searchBar }
          onChange={ ({ target }) => { setSearchBar(target.value); } }
          placeholder="Pesquisa"
          className="search-input"
          data-testid="search-input"
        />
      </div>
      <div className="allLabelRadio">
        <label htmlFor="1">
          <input
            name="seach-bar"
            type="radio"
            id="1"
            value="ingrediente"
            onChange={ ({ target }) => setSearchMethod(target.value) }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="2" value="nome">
          <input
            value="nome"
            name="seach-bar"
            type="radio"
            id="2"
            onChange={ ({ target }) => setSearchMethod(target.value) }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="3">
          <input
            name="seach-bar"
            type="radio"
            id="3"
            value="primeira-letra"
            onChange={ ({ target }) => setSearchMethod(target.value) }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <div className="conteiner-search-btn">
        <button
          className="exec-search-btn"
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => submitSearch() }
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

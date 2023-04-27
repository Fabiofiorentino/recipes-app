import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('', () => {
  test('', () => {
    renderWithRouterAndContext('/foods');
    const btn = screen.getByTestId('search-top-btn');
    userEvent.click(btn);
    const searchBar = screen.getByTestId('search-input');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(name);
    userEvent.click(firstLetter);
    userEvent.click(ingredient);
    userEvent.type(searchBar, 'banana');
    userEvent.click(execSearchBtn);
  });
});

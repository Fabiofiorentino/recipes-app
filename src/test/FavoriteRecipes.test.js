import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

afterEach(() => {
  jest.resetAllMocks();
});

const localStorageMock = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
},
{
  id: '53060',
  type: 'food',
  nationality: 'Croatian',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Burek',
  image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
},
];

const localStorageMockDrink = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
}];

const localStorageMockMeal = [
  {
    id: '53060',
    type: 'food',
    nationality: 'Croatian',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Burek',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  },
];

const x = '0-horizontal-share-btn';

const render = () => renderWithRouterAndContext('/favorite-recipes');

describe('Testa página de Favoritos', () => {
  test('', () => {
    window.document.execCommand = jest.fn(() => true);
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMockDrink));
    render();
    const copyButton = screen.getByTestId(x);
    userEvent.click(copyButton);
    const favButton = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favButton);
    const filter1 = screen.getByTestId('filter-by-all-btn');
    const filter2 = screen.getByTestId('filter-by-food-btn');
    const filter3 = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filter3);
    userEvent.click(filter2);
    userEvent.click(filter1);
  });

  test('', () => {
    window.document.execCommand = jest.fn(() => true);
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMockMeal));
    render();
    const copyButton = screen.getByTestId(x);
    userEvent.click(copyButton);
    const linkText = screen.getByText(/link copied!/i);
    expect(linkText).toBeInTheDocument();
  });

  test('', () => {
    window.document.execCommand = jest.fn(() => true);
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));
    render();
    const copyButton = screen.getByTestId(x);
    userEvent.click(copyButton);
    const favButton = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favButton);
    const filter1 = screen.getByTestId('filter-by-all-btn');
    const filter2 = screen.getByTestId('filter-by-food-btn');
    const filter3 = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filter3);
    userEvent.click(filter2);
    userEvent.click(filter1);
  });

  test('', () => {
    global.localStorage.setItem('favoriteRecipes', null);
    render();
  });
});

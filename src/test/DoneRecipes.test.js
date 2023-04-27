import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

const mockLocalStorage = [
  {
    id: '52804',
    type: 'food',
    nationality: 'Canadian',
    category: 'Miscellaneous',
    alcoholicOrNot: '',
    name: 'Poutine',
    image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
    doneDate: 'teste',
    tags: [
      'UnHealthy',
      'Speciality',
      'HangoverFood',
    ],
  },
  {
    id: '53060',
    type: 'food',
    nationality: 'Croatian',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Burek',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    doneDate: 'teste',
    tags: [
      'Streetfood',
      ' Onthego',
    ],
  },
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    doneDate: 'teste',
    tags: [],
  },
];

const render = () => renderWithRouterAndContext('/done-recipes');

describe('Testes Tela de Receitas Prontas', () => {
  test('Se há o boto de compartilhar ', () => {
    window.document.execCommand = jest.fn(() => true);
    global.localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorage));
    render();
    const buttonshare = screen.getByTestId('2-horizontal-share-btn');
    expect(buttonshare).toBeInTheDocument();
    userEvent.click(buttonshare);
  });
  test('Os botões de filtro', () => {
    window.document.execCommand = jest.fn(() => true);
    global.localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorage));
    render();
    const buttonshare = screen.getByTestId('1-horizontal-share-btn');
    expect(buttonshare).toBeInTheDocument();
    userEvent.click(buttonshare);
    const foodFilter = screen.getByTestId('filter-by-food-btn');
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    const allFilter = screen.getByTestId('filter-by-all-btn');
    userEvent.click(foodFilter);
    userEvent.click(drinkFilter);
    userEvent.click(allFilter);
  });
  test('Os botões de filtro', () => {
    global.localStorage.setItem('doneRecipes', null);
    render();
  });
});

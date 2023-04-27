import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

afterEach(() => {
  jest.resetAllMocks();
});

const localStorageMockDrink = {
  cocktails: {
    15997: [],
  },
  meals: {},
};

const localStorageMockMeal = {
  cocktails: {},
  meals: {
    52977: [],
  },
};

describe('Testa página de Progresso de Receitas', () => {
  test('Testa página de progresso de uma comida', async () => {
    global.localStorage.setItem('inProgressRecipes',
      JSON.stringify(localStorageMockMeal));
    renderWithRouterAndContext('foods/52977/in-progress');
    const lentils = await screen.findByRole('checkbox', { name: /lentils 1 cup/i });
    const onion = await screen.findByRole('checkbox', { name: /onion 1 large/i });
    const carrots = await screen.findByRole('checkbox', { name: /carrots 1 large/i });
    const tomato = await screen.findByRole('checkbox', { name: /tomato puree 1 tbs/i });
    const cumin = await screen.findByRole('checkbox', { name: /cumin 2 tsp/i });
    const paprika = await screen.findByRole('checkbox', { name: /paprika 1 tsp/i });
    const mint = await screen.findByRole('checkbox', { name: /mint 1\/2 tsp/i });
    const thyme = await screen.findByRole('checkbox', { name: /thyme 1\/2 tsp/i });
    const blackPepper = await screen.findByRole('checkbox',
      { name: /black pepper 1\/4 tsp/i });
    const redPepper = await screen.findByRole('checkbox',
      { name: /red pepper flakes 1\/4 tsp/i });
    const vegetable = await screen.findByRole('checkbox',
      { name: /vegetable stock 4 cups/i });
    const water = await screen.findByRole('checkbox', { name: /water 1 cup/i });
    const salt = await screen.findByRole('checkbox', { name: /sea salt pinch/i });
    const finishBtn = await screen.findByRole('button', { name: /finish recipe/i });
    userEvent.click(lentils);
    userEvent.click(onion);
    userEvent.click(carrots);
    userEvent.click(tomato);
    userEvent.click(cumin);
    userEvent.click(paprika);
    userEvent.click(mint);
    userEvent.click(thyme);
    userEvent.click(blackPepper);
    userEvent.click(redPepper);
    userEvent.click(vegetable);
    userEvent.click(water);
    userEvent.click(salt);
    userEvent.click(finishBtn);
  });
});

describe('testa pagina de comida em progresso', () => {
  test('testa a página de progresso de uma bebida', async () => {
    global.localStorage.setItem('inProgressRecipes',
      JSON.stringify(localStorageMockDrink));
    renderWithRouterAndContext('drinks/15997/in-progress');
    const galliano = await screen.findByRole('checkbox', {
      name: /galliano 2 1\/2 shots/i,
    });
    const ginger = await screen.findByRole('checkbox', {
      name: /ginger ale/i,
    });
    const ice = await screen.findByRole('checkbox', {
      name: /ice/i,
    });
    const finishBtn = await screen.findByRole('button', { name: /finish recipe/i });
    userEvent.click(galliano);
    userEvent.click(galliano);
    userEvent.click(galliano);
    userEvent.click(ginger);
    userEvent.click(ice);
    userEvent.click(finishBtn);
  });
});

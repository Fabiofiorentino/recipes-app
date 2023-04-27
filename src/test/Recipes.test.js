import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

afterEach(() => jest.clearAllMocks());
const two = 2000;

describe('Testa Recipes-food', () => {
  test('se há os botões', async () => {
    await waitFor(() => renderWithRouterAndContext('/foods'));
    await new Promise((r) => setTimeout(r, two));
    const drinksIcon = await screen.findByAltText(/drinks/i);
    const button = await screen.findByText('Beef');
    const buttonAll = await screen.findByText('All');
    const button2 = await screen.findByRole('button', { name: /Breakfast/i });
    const button3 = await screen.findByRole('button', { name: /Chicken/i });
    const button4 = await screen.findByRole('button', { name: /Dessert/i });
    const button5 = await screen.findByRole('button', { name: /Goat/i });
    expect(button).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
    expect(button4).toBeInTheDocument();
    expect(button5).toBeInTheDocument();
    userEvent.click(buttonAll);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(drinksIcon);
  });

  test('Drinks há os botões', async () => {
    await waitFor(() => renderWithRouterAndContext('/drinks'));
    await new Promise((r) => setTimeout(r, two));
    const buttonAll = await screen.findByText('All');
    const buttonDrink = await screen.findByRole('button', { name: /Cocktail/i });
    userEvent.click(buttonDrink);
    userEvent.click(buttonAll);
  });

  // test('', async () => {
  //   const { history } = renderWithRouterAndContext('/foods');
  //   expect(history.location.pathname).toContain('foods');
  //   expect(screen.findByRole('button', {
  //     name: /beef/i })).toBeInTheDocument();
  // });
});

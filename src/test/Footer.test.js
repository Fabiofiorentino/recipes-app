import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Teste do Footer', () => {
  test('Testa se os componentes estão definidos', async () => {
    await waitFor(() => renderWithRouterAndContext('/foods'));
    const drinksIcon = await screen.findByAltText(/drinks/i);
    const foodsIcon = await screen.findByAltText(/foods/i);

    expect(drinksIcon).toBeInTheDocument();
    expect(foodsIcon).toBeInTheDocument();
    userEvent.click(drinksIcon);
  });

  test('Testa se os componentes estão definidos', async () => {
    await waitFor(() => renderWithRouterAndContext('/foods'));
    const foodsIcon = await screen.findByAltText(/foods/i);
    userEvent.click(foodsIcon);
  });
});

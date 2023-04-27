import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

afterEach(() => jest.clearAllMocks());

describe('Teste Página de Detalhes de Comida', () => {
  test('Testa detalhes de uma comida', async () => {
    const { history } = await waitFor(() => renderWithRouterAndContext('foods/52977'));
    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeDefined();
    const title = await screen.findByRole('heading', { name: /recipes details/i });
    expect(title).toBeDefined();
    const fav = await screen.findByTestId('favorite-btn');
    userEvent.click(fav);
    const fav2 = await screen.findByTestId('favorite-btn');
    userEvent.click(fav2);
    const btn = await screen.findByRole('button', { name: /start recipe/i });
    userEvent.click(btn);
    history.goBack();
    const btn2 = await screen.findByRole('button', { name: /continue recipe/i });
    userEvent.click(btn2);
  });
});

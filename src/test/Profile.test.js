import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Teste do Profile', () => {
  test('Testa o botão Done Recipes', () => {
    renderWithRouterAndContext('/profile');
    const buttond = screen.getByRole('button', { name: /Done Recipes/i });

    expect(buttond).toBeInTheDocument();
    userEvent.click(buttond);
  });
  test('Testa o botão Favorite Recipes', () => {
    renderWithRouterAndContext('/profile');
    const buttonf = screen.getByRole('button', { name: /Favorite Recipes/i });

    expect(buttonf).toBeInTheDocument();
    userEvent.click(buttonf);
  });
  test('Testa o botão Logout', () => {
    renderWithRouterAndContext('/profile');
    const buttonl = screen.getByRole('button', { name: /Logout/i });

    expect(buttonl).toBeInTheDocument();
    userEvent.click(buttonl);
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testes de 45% de cobertura Header', () => {
  test('Testa rota /foods', () => {
    renderWithRouterAndContext('/foods');
    const profileBtn = screen.getByRole('button', { name: /profile/i });
    const pageTitle = screen.getByRole('heading', { name: /Foods/i });
    const searchBtn = screen.getByRole('button', { name: /search/i });

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId('exec-search-btn');
    expect(inputSearch).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(inputSearch).not.toBeInTheDocument();
    userEvent.click(profileBtn);
  });

  test('Testa rota /drinks', () => {
    renderWithRouterAndContext('/drinks');

    const profileBtn = screen.getByRole('button', { name: /profile/i });
    const pageTitle = screen.getByRole('heading', { name: /Drinks/i });
    const searchBtn = screen.getByRole('button', { name: /search/i });

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  test('Testa rota /profile', () => {
    renderWithRouterAndContext('/profile');
    const profileBtn = screen.getByRole('button', { name: /profile/i });
    const pageTitle = screen.getByRole('heading', { name: /Profile/i });

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  test('Testa rota /done-recipes', () => {
    renderWithRouterAndContext('/done-recipes');
    const profileBtn = screen.getByRole('button', { name: /profile/i });
    const pageTitle = screen.getByRole('heading', { name: /Done recipes/i });

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
});
describe('', () => {
  test('Testa rota /profile', () => {
    renderWithRouterAndContext('/favorite-recipes');
    const profileBtn = screen.getByRole('button', { name: /profile/i });
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    const profile = screen.getByRole('heading', { name: /Profile/i });
    expect(profile).toBeInTheDocument();
  });
  test('Testa rota /favorites-recipes', () => {
    renderWithRouterAndContext('/favorite-recipes');
    const profileBtn = screen.getByRole('button', { name: /profile/i });
    const pageTitle = screen.getByRole('heading', { name: /Favorite Recipes/i });

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
});

import { screen, cleanup } from '@testing-library/react';
import renderWithRouterAndContext from './test/helpers/renderWithRouterAndContext'
import userEvent from '@testing-library/user-event';

describe('Testa 45% de cobertura da tela de login', () => {
  beforeEach(cleanup);
  test('se o botão inicia desabilitado', () => {
    const { history } = renderWithRouterAndContext()
    history.push('/');
    const button = screen.getByTestId("login-submit-btn");
    expect(button).toBeDisabled;
  })

  test('se escreve no input email e senha', () => {
    renderWithRouterAndContext()
    jest.spyOn(Storage.prototype, 'setItem');
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Senha');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputPassword, '1234567');
    const button = screen.getByTestId("login-submit-btn");
    userEvent.click(button);
    expect(localStorage.setItem).toBeCalled();
  })
})

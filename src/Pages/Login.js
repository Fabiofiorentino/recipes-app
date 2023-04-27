import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import '../CSS/Login.css';

function Login() {
  const { setEmail, setPassword, email, password } = useContext(Context);
  const history = useHistory();
  const verifyButton = () => {
    const senha = 6;
    const regex = /\S+@\S+\.\S+/;
    return !(regex.test(email)
    && email.length > senha && password.length > senha);
  };

  const buttonSubmit = () => {
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div className="conteinerLogin">
      <div className="pageLogin">
        <h3 className="textLogin">Login</h3>
        <input
          value={ email }
          placeholder="Email"
          type="email"
          name="email"
          onChange={ ({ target }) => setEmail(target.value) }
          data-testid="email-input"
          className="loginInput"
        />
        <input
          value={ password }
          placeholder="Senha"
          type="password"
          name="password"
          onChange={ ({ target }) => setPassword(target.value) }
          data-testid="password-input"
          className="loginInput"
        />
        <button
          name="button"
          type="button"
          disabled={ verifyButton() }
          onClick={ buttonSubmit }
          data-testid="login-submit-btn"
          className="login-submit-btn"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;

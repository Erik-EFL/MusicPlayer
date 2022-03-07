import React, { Component } from 'react';
import logo from './logo.svg';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isButtomDisabled: true,
    };
  }

  render() {
    const {
      name,
      isButtomDisabled,
    } = this.state;

    return (
      <div data-testid="page-login">
        <div className="login-container">
          <img src={ logo } alt={ `Imagem de ${logo}` } />
          <div className="login">
            <input
              type="text"
              name="login"
              id="login"
              data-testid="login-name-input"
              placeholder="Name"
            />
            <button
              type="button"
              data-testid="login-submit-button"
              onChange={ this.handleChange }
            >
              Entrar
            </button>
          </div>
        </div>

      </div>
    );
  }
}

export default Login;

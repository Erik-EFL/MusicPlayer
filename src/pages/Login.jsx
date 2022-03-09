import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import logo from './logo.svg';
// import './Login.css';
import { createUser } from '../services/userAPI';
import Loading from './Components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      name: '',
      loading: false,
      logged: false,
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState(() => ({
      name: value,
      buttonDisabled: value.length < Number('3'),
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        loading: false,
        logged: true,
      });
    });
  }

  render() {
    const { name, buttonDisabled, logged, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading === true
          ? <Loading />
          : (
            <div className="login-container">
              <img src={ logo } alt={ `Imagem de ${logo}` } />
              <div className="login">
                <form>
                  <input
                    type="text"
                    data-testid="login-name-input"
                    onChange={ (event) => this.handleChange(event) }
                    placeholder="Name"
                    value={ name }
                  />
                  <button
                    type="submit"
                    data-testid="login-submit-button"
                    onClick={ (event) => this.handleSubmit(event) }
                    disabled={ buttonDisabled }
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          )}
        {logged && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;

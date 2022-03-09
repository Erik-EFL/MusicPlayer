import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      name: user.name,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? <Loading />
          : (
            <>
              <h3 data-testid="header-user-name">{ name }</h3>
              <Link to="/search" data-testid="link-to-search" />
              <Link to="/favorites" data-testid="link-to-favorites" />
              <Link to="/profile" data-testid="link-to-profile" />
            </>
          )}
      </header>
    );
  }
}

export default Header;

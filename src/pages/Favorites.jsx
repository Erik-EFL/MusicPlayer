import React, { Component } from 'react';
import Header from './Components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />
      </div>
    );
  }
}

export default Favorites;

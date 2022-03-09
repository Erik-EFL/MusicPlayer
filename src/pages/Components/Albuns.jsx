import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Albuns extends Component {
  render() {
    const { album } = this.props;

    return (
      <div className="album-card">
        <img src={ album.artworkUrl100 } alt="" />
        <h3 className="albumTitle">{album.collectionName}</h3>
        <p className="artistName">{album.artistName}</p>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          Visualizar álbum
        </Link>
      </div>
    );
  }
}

Albuns.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Albuns;

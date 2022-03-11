import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const {
      trackName, previewUrl, trackId, handleChange, favoriteSongs,
    } = this.props;
    return (
      <div>
        <div className="music-card">
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <form>
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ handleChange }
                checked={ favoriteSongs.includes(trackId) }
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  handleChange: PropTypes.func,
  favoriteSongs: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default MusicCard;

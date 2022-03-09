import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Components/Header';
import Loading from './Components/Loading';
import MusicCard from './Components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
      musics: [],
      album: '',
      artist: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getSongs(id);
  }

  getSongs = async (id) => {
    const allSongs = await getMusics(id);
    const { artistName, collectionName } = allSongs[0];
    const songList = allSongs.filter((_song, index) => index !== 0);
    this.setState({
      musics: songList,
      artist: artistName,
      album: collectionName,
      loading: false,
    });
  }

  render() {
    const { name, musics, loading, album, artist } = this.state;
    return (
      <div data-testid="page-album">
        <Header user={ name } />
        {loading
          ? <Loading />
          : (
            <>
              <div className="albumInfo">
                <p data-testid="artist-name">{artist}</p>
                <p data-testid="album-name">{album}</p>
              </div>
              <div className="songList">
                {musics.map((item) => (
                  <MusicCard
                    key={ item.trackId }
                    trackName={ item.trackName }
                    previewUrl={ item.previewUrl }
                    trackId={ item.trackId }
                  />
                ))}
              </div>
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

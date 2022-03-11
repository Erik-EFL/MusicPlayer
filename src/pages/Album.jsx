import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Components/Header';
import Loading from './Components/Loading';
import MusicCard from './Components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: '',
      artist: '',
      favoriteSongs: [],
      loading: true,
      musics: [],
      name: '',
    };
  }

  componentDidMount = () => {
    this.checkedFavSongs();
    const { match: { params: { id } } } = this.props;
    this.getSongs(id);
  }

  handleChange = async ({ target }) => {
    this.setState({
      loading: true },
    async () => {
      const { musics } = this.state;

      const listItems = musics.find(
        ({ trackId }) => trackId === parseInt(target.id, 10),
      );

      if (target.checked) {
        await addSong(listItems);
        this.setState((prevState) => ({
          favoriteSongs: [...prevState.favoriteSongs, listItems.trackId],
        }));
      } else {
        await removeSong(listItems);
        const showFavList = await getFavoriteSongs();
        const newFavList = showFavList.reduce((acc, current) => {
          if (current.trackId !== target.id) acc.push(current.target.id);
          return acc;
        }, []);
        this.setState({
          favoriteSongs: newFavList,
        });
      }
      this.setState({ loading: false });
    });
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

  checkedFavSongs = async () => {
    const favSongs = await getFavoriteSongs();
    const favListIds = favSongs.map(({ trackId }) => trackId);
    this.setState({
      favoriteSongs: favListIds,
    });
  }

  render() {
    const { name, musics, loading, album, artist, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header name={ name } loading={ loading } />
        {loading
          ? <Loading />
          : (
            <div className="container-list">
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
                    handleChange={ this.handleChange }
                    favoriteSongs={ favoriteSongs }
                  />
                ))}
              </div>
            </div>
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

import React, { Component } from 'react';
import Header from './Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Components/Loading';
import Albuns from './Components/Albuns';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      search: '',
      buttonDisabled: true,
      loading: false,
      albumList: [],
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    const artist = artistName;
    this.setState({
      artistName: '',
      loading: true,
    }, async () => {
      const album = await searchAlbumsAPI(artist);
      this.setState({
        loading: false,
        search: artist,
        albumList: album,
      });
    });
  }

  handleChange = ({ target: { value } }) => {
    this.setState(() => ({
      artistName: value,
      buttonDisabled: value.length < Number('2'),
    }));
  }

  render() {
    const { artistName, search, buttonDisabled, loading, albumList } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading
          ? <Loading />
          : (
            <div className="search-container">
              <form>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  value={ artistName }
                  onChange={ (event) => this.handleChange(event) }
                />
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ buttonDisabled }
                  onClick={ (event) => this.handleClick(event) }
                >
                  Pesquisar
                </button>
              </form>
              {search && (
                <p>
                  {`Resultado de álbuns de: ${search}`}
                </p>
              )}
              {
                !albumList.length
                  ? <p>Nenhum álbum foi encontrado</p>
                  : (
                    <div className="album-container">
                      {albumList.map(
                        (album) => <Albuns album={ album } key={ album.collectionId } />,
                      )}
                    </div>
                  )
              }
            </div>
          )}
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AlbumList from './AlbumList';

class App extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchItem: '',
      searching: false,
      albums: [],
      numAlbums: null
    }
  }

  handleChange(event) {
    this.setState({ searchItem: event.target.value })
  }

  handleSubmit(event) {
    this.setState({searching: true, albums: []})
    const artist = this.state.searchItem.replace(' ', '+');
    event.preventDefault();
    axios.get(`https://itunes.apple.com/search?term=${artist}&entity=album&limit=200&explicit=No`)
    .then(result => result.data)
    .then(albums => {
      this.setState({
        searching: false,
        albums: albums.results,
        numAlbums: albums.resultCount
      })
    })
  }

  render() {
    const albums = this.state.albums;
    const searching = this.state.searching;
    return (
      <div className="search">
        <header className="search-box">
          <h1 className="app-title">Search for albums from your favorite artists on iTunes:</h1>
            <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.searchItem} onChange={this.handleChange}/>
            <input type="submit" value="Submit"/>
          </form> 
        </header>
        {searching && <h1>Searching!</h1>}
        {albums!==[] && albums.length>0 && <AlbumList albums={albums} />}
      </div>
    );
  }
}

export default App;

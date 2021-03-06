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
      numAlbums: null,
      artist: ''
    }
  }

  handleChange(event) {
    this.setState({ searchItem: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.searchItem.length===0) {
      alert('Artist name is empty. Please enter an artist to search!');
      return;
    }
    this.setState({searching: true, albums: []})
    const artist = this.state.searchItem;
    const search = artist.replace(' ', '+');
    axios.get(`https://itunes.apple.com/search?term=${search}&entity=album&limit=200&explicit=No`)
    .then(result => result.data)
    .then(albums => {
      //filter allows to exclude false positives; so if searching for 'PitBull', this will not list albums for 'Pitbull feat. Rihanna' although it will be returned from iTunes
      const results = albums.results.filter(album => album.artistName.toLowerCase()===this.state.searchItem.toLowerCase());
      const numOfAlbums = results.length;
      if (numOfAlbums===0) {
        alert(`Your search for ${artist} did not return any result!`);
        this.setState({ 
          searching: false,
          searchItem: '' 
        });
        return;
      }
      this.setState({
        searching: false,
        albums: results,
        numAlbums: numOfAlbums,
        artist
      })
    })
  }

  render() {
    const albums = this.state.albums;
    const searching = this.state.searching;
    return (
      <div className="search">
        <div className="search-box">
          <h1 className="app-title">Search for albums from your favorite artists on iTunes:</h1>
            <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.searchItem} onChange={this.handleChange}/>
            <input type="submit" value="Submit"/>
          </form> 
        </div>
        {searching && <h1>Searching!</h1>}
        <div className="list">
          {albums.length>0 && <AlbumList albums={albums} artist={this.state.artist}/>}
        </div>
      </div>
    );
  }
}

export default App;

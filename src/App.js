import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchItem: '',
      searching: false,
      albums: []
    }
  }

  handleChange(event) {
    this.setState({ searchItem: event.target.value })
  }

  handleSubmit(event) {
    this.setState({searching: true})
    const artist = this.state.searchItem.replace(' ', '+');
    console.log('artist is ', artist)
    event.preventDefault();
    axios.get(`https://itunes.apple.com/search?term=${artist}&entity=album&limit=200`)
    .then(result => result.data)
    .then(albums => {
      this.setState({searching: false})
      console.log('albums are ', albums)
    })
  }

  render() {
    return (
      <div className="Search">
        <header className="Search-Box">
          <h1 className="App-Title">Search for albums from your favorite artists on iTunes:</h1>
            <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.searchItem} onChange={this.handleChange}/>
            <input type="submit" value="Submit"/>
          </form> 
        </header>
        <p className="Album-List">
          <code>Meow!</code>
        </p>
        {this.state.searching && <h1>Searching!</h1>}
      </div>
    );
  }
}

export default App;

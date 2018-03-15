import React, { Component } from 'react';
import './AlbumList.css';

class AlbumList extends Component {

  render() {
    const albums = this.props.albums;
    return (
      <div>
        {albums.map(album =>
          <div className="album-container" key={album.collectionId}>
            <img className="image" src={album.artworkUrl100} alt={album.collectionName}></img>
            <div className="name">Album Name: {album.collectionName}</div>
            <div className="price">Price: ${album.collectionPrice}</div>
            <div className="tracks">Number of Track: {album.trackCount}</div>
            <div className="genre">Genre: {album.primaryGenreName}</div>
          </div>
        )}
      </div>
    );
  }
}

export default AlbumList;
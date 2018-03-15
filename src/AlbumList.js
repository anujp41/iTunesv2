import React, { Component } from 'react';
import './AlbumList.css';

class AlbumList extends Component {

  render() {
    const albums = this.props.albums;
    const num = albums.length;
    const term = num > 1 ? 'albums' : 'album';
    const artist = this.props.artist;
    return (
      <div>
        <h1>{artist} has {num} {term} on iTunes listed below:</h1>
        {albums.map(album =>
          <div className="album-container" key={album.collectionId}>
            <img className="image" src={album.artworkUrl100} alt={album.collectionName}></img>
            <div className="name"><b>Album Name:</b> {album.collectionName}</div>
            <div className="tracks"><b>Number of Track:</b> {album.trackCount}</div>
            <div className="genre"><b>Genre:</b> {album.primaryGenreName}</div>
            <div className="price"><b>Price:</b> ${album.collectionPrice}</div>
          </div>
        )}
      </div>
    );
  }
}

export default AlbumList;
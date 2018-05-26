import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router-dom';

import firebase from '../../firebase.js';

import './ArtistPage.css';

const md = new Remarkable({breaks:true});

class ArtistPage extends React.Component {

  state = {
    isEditing: false,
    newBody: ''
  }

  handleActivateEditMode = () => {
    this.setState({
      isEditing: true
    })
  }

  handleDeactivateEditMode = () => {
    this.setState({
      isEditing: false
    })
  }

  handleUpdateBody = (e) => {
    console.log('VALUE', e.target.value)
    this.setState({
      newBody: e.target.value
    })
  }

  writeArtistData = () => {
    console.log('ARTIST', this.props.artist, this.props.artistId, this.state)
    firebase.database().ref('/pages/' + this.props.artistId).set({
      albums: this.props.artist.albums,
      artist_name: this.props.artist.artist_name,
      body: this.state.newBody,
      image: this.props.artist.image
    });

    this.setState({isEditing: false});
  }

  render() {
    const { artist, match, isAdmin, Id } = this.props;
    console.log('this.props',this.props)

    let adminControls = null;
    if (isAdmin && !this.state.isEditing) {
      adminControls = (
        <i className="Page-edit material-icons" onClick={this.handleActivateEditMode}>edit</i>
      )
    } else if (isAdmin && this.state.isEditing) {
      adminControls = (
        <div>
          <button onClick={this.handleDeactivateEditMode}>cancel</button>
          <button onClick={this.writeArtistData}>submit</button>
        </div>
      )
    }

    return (
      <div className="ArtistPage-container">
        
        <h2 className="center-text">{artist.artist_name}</h2>
        <div className="ArtistPage-content">
          {artist.image &&
            <img
              alt="artist"
              src={artist.image}
              className="ArtistPage-img"
              width="300"
            />
          }
          {this.state.isEditing ?
            <textarea
              id="Page-markdown-content"
              onChange={this.handleUpdateBody}
              defaultValue={artist.body}
            />
            :
            <div className="ArtistPage-review">
              <div dangerouslySetInnerHTML={{ __html: md.render(artist.body) }} />
            </div>
          }
          {adminControls}
        </div>

        <ul>
        {artist.albums.map((album, i) => {
          return (
            <li key={`${album}-${1}`}>
              <Link to={`${match.url}/${album.toLowerCase().replace(/[. ,:-]+/g, "-")}`}>
                {album}
              </Link>
            </li>
          );
        })}
        </ul>
      </div>
    )
  }
};

export default ArtistPage;
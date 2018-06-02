import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import firebase from '../../firebase.js';

import './ArtistPage.css';

const md = new Remarkable({breaks:true});

class ArtistPage extends React.Component {

  state = {
    isEditing: false,
    newBody: '',
    expanded: false
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
    this.setState({
      newBody: e.target.value
    })
  }

  writeArtistData = () => {
    if (this.state.newBody) {
      firebase.database().ref('/pages/' + this.props.artist.id).update({
        body: this.state.newBody
      });
    }
    this.setState({isEditing: false});
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { artist, match, isAdmin } = this.props;
    const { isEditing } = this.state;

    let adminControls = null;
    if (isAdmin && !isEditing) {
      adminControls = (
        <div className="Page-admin-controls">
          <i className="Page-edit material-icons" onClick={this.handleActivateEditMode}>edit</i>
        </div>
      )
    } else if (isAdmin && isEditing) {
      adminControls = (
        <div className="Page-admin-controls">
          <button
            className="Page-edit-button"
            onClick={this.handleDeactivateEditMode}
          >
            cancel
          </button>
          <button
            className="Page-edit-button"
            onClick={this.writeArtistData}
          >
            submit
          </button>
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
          {isEditing ?
            <textarea
              id="Page-markdown-content"
              className="ArtistPage-review"
              onChange={this.handleUpdateBody}
              defaultValue={artist.body}
            />
            :
            <div className="ArtistPage-review">
              <div
                className={`ArtistPage-review-content${!this.state.expanded ? ' hide' : ''}`}
                  
                dangerouslySetInnerHTML={{ __html: md.render(artist.body) }}
              />
              <IconButton
                className="ArtistPage-review-expand-btn"
                style={this.state.expanded
                  ? {
                      transform: 'rotate(180deg)'
                    }
                  : null
                }
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
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
import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import firebase from '../../firebase.js';

import './ArtistPage.css';

const md = new Remarkable({breaks:true});

class ArtistPage extends React.Component {

  state = {
    isEditing: false,
    newBody: '',
    open: false,
    expanded: false
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
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
        <CardHeader
          avatar={
              <img
                alt="artist"
                src={artist.image}
                className="ArtistPage-img"
                width="60"
                onClick={this.handleClickOpen}
              />
          }
          title={<h2>{artist.artist_name}</h2>}
        />
        <div className="ArtistPage-content">
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

        <section className="ArtistPage-disco">
          <h4 className="ArtistPage-disco-heading">Selected Discography</h4>
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
        </section>

        <Dialog
          open={this.state.open}  
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
        >
          <img
            alt="artist"
            src={artist.image}
            style={{width: '100%', borderRadius: '3px'}}            
          />
        </Dialog>
      </div>
    )
  }
};

export default ArtistPage;
import React from 'react';
import Remarkable from 'remarkable';

import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import firebase from '../../firebase.js';

import './ArtistPage.css';

const md = new Remarkable({breaks:true});

class ArtistPage extends React.Component {

  state = {
    isEditing: false,
    newBody: '',
    open: false,
    expanded: false,
    reviewExpanded: null
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

  handleReviewExpandChange = album => (e, expanded) => {
    if (album.review) {
      this.setState({ 
        reviewExpanded: expanded ? album.title : false
      });
    }
  };

  render() {
    const { artist, user } = this.props;
    const { isEditing } = this.state;

    let adminControls = null;
    if ((user && user.isAdmin) && !isEditing) {
      adminControls = (
        <div className="Page-admin-controls">
          <i className="Page-edit material-icons" onClick={this.handleActivateEditMode}>edit</i>
        </div>
      )
    } else if ((user && user.isAdmin) && isEditing) {
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
          style={{padding: '16px 8px'}}
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

              <Button
                className="ArtistPage-review-expand-btn"
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                {this.state.expanded ? 'less' : 'more'}
                <ExpandMoreIcon style={this.state.expanded
                  ? {
                      transform: 'rotate(180deg)'
                    }
                  : null
                } />
              </Button>
            </div>
          }
          {adminControls}
        </div>

        <section className="ArtistPage-disco">
          <h4 className="ArtistPage-disco-heading">Selected Discography</h4>
          <div style={{padding: '0 8px'}}>
          {artist.albums.map((album, i) => {
            const heading = album.year && album.label ? `${album.title} - ${album.year}, ${album.label}` : album.title;
              return (
                <ExpansionPanel key={`${album.title}-${i}`} expanded={this.state.reviewExpanded === album.title} onChange={this.handleReviewExpandChange(album)} >
                  <ExpansionPanelSummary expandIcon={album.review ? <ExpandMoreIcon /> : null}>
                    <Typography>
                      {heading}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      {album.review}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })}
          </div>
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
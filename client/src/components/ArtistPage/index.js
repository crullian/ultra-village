import React from 'react';
import Remarkable from 'remarkable';

import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import firebase from '../../firebase.js';

import './ArtistPage.css';

const md = new Remarkable({breaks:true});

class ArtistPage extends React.Component {

  state = {
    isEditing: false,
    isEditingReview: false,
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

  handleActivateEditReviewMode = () => {
    this.setState({
      isEditingReview: true
    })
  }

  handleDeactivateEditReviewMode = () => {
    this.setState({
      isEditingReview: false
    })
  }

  handleUpdateBody = (e) => {
    firebase.database().ref('/pages/' + this.props.artist.id).update({
      body: e.target.value
    });
  }

  handleUpdateReview = (e, albumIndex, albumId) => {
    firebase.database().ref(`/pages/${this.props.artist.id}/albums/${albumIndex}/albums/${albumId}`).update({
      review: e.target.value
    });
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
    const { isEditing, isEditingReview } = this.state;

    let adminControls = null;
    let adminControlsReview = null;
    if ((user && user.isAdmin) && !isEditingReview) {
      adminControlsReview = (
        <div className="Page-admin-controls"style={{paddingRight: 5}}>
          <i className="Page-edit material-icons" onClick={this.handleActivateEditReviewMode}>edit</i>
        </div>
      )
    } else if ((user && user.isAdmin) && isEditingReview) {
      adminControlsReview = (
        <div className="Page-admin-controls">
          <button
            className="Page-edit-button"
            onClick={this.handleDeactivateEditReviewMode}
          >
            done
          </button>
        </div>
      )
    }
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
            done
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
              className="ArtistPage-review ArtistPage-review-content"
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
          <div>
          {artist.albums.map((albumList, i) => {
            return (
              <div key={`album-index-${i}`} style={{padding: '0 8px'}}>
                <h4 className="ArtistPage-disco-heading">{albumList.artist_name}</h4>
                {albumList.albums.map((album, j) => {
                  const heading = album.year && album.label ? `${album.title} - ${album.year}, ${album.label}` : album.title;
                  return (
                    <ExpansionPanel key={`${album.title}-${j}`} expanded={this.state.reviewExpanded === album.title} onChange={this.handleReviewExpandChange(album)} >
                      <ExpansionPanelSummary style={{cursor: album.review ? 'pointer' : 'default'}} expandIcon={album.review ? <ExpandMoreIcon /> : null}>
                        <Typography>
                          {heading}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div style={isEditingReview ? {width:'100%'} : null}>
                          {isEditingReview ? 
                            <textarea
                              id="Page-markdown-content"
                              className="ArtistPage-review-content"
                              onChange={(e) => this.handleUpdateReview(e, i, j)}
                              defaultValue={album.review}
                            /> 
                            : 
                            <div
                              className="ArtistPage-review-content"
                              dangerouslySetInnerHTML={{ __html: md.render(album.review) }}
                            />
                          }
                        </div>
                      </ExpansionPanelDetails>
                      {adminControlsReview && <Divider /> }
                      {adminControlsReview &&
                        <ExpansionPanelActions>
                          {adminControlsReview}
                        </ExpansionPanelActions>
                      }
                    </ExpansionPanel>
                  )
                })}
                </div>
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
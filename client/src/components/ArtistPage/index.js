import React, { useState, useEffect } from 'react';
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

const ArtistPage = ({ artist, user }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [reviewExpanded, setReviewExpanded] = useState(false);

  useEffect(() => {
    document.title = `Ultravillage | ${artist.artist_name}`;
  })

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleActivateEditMode = () => setIsEditing(true);

  const handleDeactivateEditMode = () => setIsEditing(false);

  const handleActivateEditReviewMode = () => setIsEditingReview(true);

  const handleDeactivateEditReviewMode = () => setIsEditingReview(false);

  const handleUpdateBody = (e) => {
    firebase.database().ref('/pages/' + artist.id).update({
      body: e.target.value
    });
  }

  const handleUpdateReview = (e, albumIndex, albumId) => {
    firebase.database().ref(`/pages/${artist.id}/albums/${albumIndex}/albums/${albumId}`).update({
      review: e.target.value
    });
  }

  const handleExpandClick = () => setExpanded(!expanded)

  const handleReviewExpandChange = album => (e, expanded) => {
    if (album.review) {
      setReviewExpanded(expanded ? album.title : false)
    }
  };


  let adminControls = null;
  let adminControlsReview = null;
  if ((user && user.isAdmin) && !isEditingReview) {
    adminControlsReview = (
      <div className="Page-admin-controls"style={{paddingRight: 5}}>
        <i className="Page-edit material-icons" onClick={handleActivateEditReviewMode}>edit</i>
      </div>
    )
  } else if ((user && user.isAdmin) && isEditingReview) {
    adminControlsReview = (
      <div className="Page-admin-controls">
        <button
          className="Page-edit-button"
          onClick={handleDeactivateEditReviewMode}
        >
          done
        </button>
      </div>
    )
  }
  if ((user && user.isAdmin) && !isEditing) {
    adminControls = (
      <div className="Page-admin-controls">
        <i className="Page-edit material-icons" onClick={handleActivateEditMode}>edit</i>
      </div>
    )
  } else if ((user && user.isAdmin) && isEditing) {
    adminControls = (
      <div className="Page-admin-controls">
        <button
          className="Page-edit-button"
          onClick={handleDeactivateEditMode}
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
              onClick={handleClickOpen}
            />
        }
        title={<h2>{artist.artist_name}</h2>}
      />
      <div className="ArtistPage-content">
        {isEditing ?
          <textarea
            id="Page-markdown-content"
            className="ArtistPage-review ArtistPage-review-content"
            onChange={handleUpdateBody}
            defaultValue={artist.body}
          />
          :
          <div className="ArtistPage-review">
            <div
              className={`ArtistPage-review-content${!expanded ? ' hide' : ''}`}
              dangerouslySetInnerHTML={{ __html: md.render(artist.body) }}
            />

            <Button
              className="ArtistPage-review-expand-btn"
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              {expanded ? 'less' : 'more'}
              <ExpandMoreIcon style={expanded
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
                  <ExpansionPanel key={`${album.title}-${j}`} expanded={reviewExpanded === album.title} onChange={handleReviewExpandChange(album)} >
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
                            onChange={(e) => handleUpdateReview(e, i, j)}
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
        open={open}
        onClose={handleClose}
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
};

export default ArtistPage;
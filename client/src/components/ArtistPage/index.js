import React, { useState, useEffect, Fragment } from 'react';
import Remarkable from 'remarkable';

import EditToggle from '../EditToggle';

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

const ArtistPage = ({ artist, userIsAdmin }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [reviewExpanded, setReviewExpanded] = useState(false);

  useEffect(() => {
    document.title = `Ultravillage | ${artist.artist_name}`;
  });

  const toggleEditMode = () => setIsEditing(!isEditing);

  const toggleEditReviewMode = () => setIsEditingReview(!isEditingReview);

  const handleUpdateBody = (e) => {
    firebase.database().ref('/pages/' + artist.id).update({
      body: e.target.value
    });
  }

  const handleUpdateReview = (albumIndex, albumId) => e => {
    firebase.database().ref(`/pages/${artist.id}/albums/${albumIndex}/albums/${albumId}`).update({
      review: e.target.value
    });
  }

  const handleReviewExpandChange = album => (e, expanded) => {
    if (album.review) {
      setReviewExpanded(expanded ? album.title : false)
    }
  };

  return (
    <div className="ArtistPage-container">
      <CardHeader
        title={<h2>{artist.artist_name}</h2>}
        style={{padding: '16px 8px'}}
        avatar={
          <img
            alt="artist"
            src={artist.image}
            className="ArtistPage-img"
            width="60"
            onClick={() => setOpen(true)}
          />
        }
      />
      <div className="ArtistPage-content">
        <EditToggle show={userIsAdmin} isEditing={isEditing} toggleHandler={toggleEditMode} />
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

          </div>
        }
        {!isEditing && (
          <Button
            className="ArtistPage-review-expand-btn"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            {expanded ? 'less' : 'more'}
            <ExpandMoreIcon
              style={expanded
                ? {transform: 'rotate(180deg)'}
                : null
              }
            />
          </Button>
        )}
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
                  <ExpansionPanel
                    key={`${album.title}-${j}`}
                    expanded={reviewExpanded === album.title}
                    onChange={handleReviewExpandChange(album)}
                  >
                    <ExpansionPanelSummary
                      style={{cursor: album.review ? 'pointer' : 'default'}}
                      expandIcon={album.review ? <ExpandMoreIcon /> : null}
                    >
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
                            onChange={handleUpdateReview(i, j)}
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
                    {userIsAdmin && (
                      <Fragment>
                        <Divider />
                        <ExpansionPanelActions>
                          <EditToggle
                            show={userIsAdmin}
                            isEditing={isEditingReview}
                            toggleHandler={toggleEditReviewMode}
                          />
                        </ExpansionPanelActions>
                      </Fragment>
                    )}
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
        onClose={() => setOpen(false)}
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
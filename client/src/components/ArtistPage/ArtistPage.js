import React, { useState, useEffect } from 'react';

import EditableContent from '../EditableContent';
import { byYear, byEntryNumber } from '../sortFunctions';

import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import firebase from '../../firebase.js';

import './ArtistPage.css';


const ArtistPage = ({ artist }) => {
  const [open, setOpen] = useState(null);
  const [reviewExpanded, setReviewExpanded] = useState(false);

  useEffect(() => {
    document.title = `Ultravillage | ${artist.artist_name}`;
  });

  const handleUpdateBody = e => {
    firebase.database().ref('/artists/' + artist.id).update({
      body: e.target.value
    });
  }

  const handleUpdateReview = (discographyId, album) => e => {
    firebase.database().ref(`/artists/${artist.id}/discography/${discographyId}/albums/${album.id}`).update({
      review: e.target.value
    });
  }

  const handleReviewExpandChange = album => (e, expanded) => {
    if (album.review) {
      setReviewExpanded(expanded ? album.title : false)
    }
  };

  const massageEntries = entries =>
    Object.entries(entries).map(entry => ({
      ...entry[1],
      id: entry[0]
    }));
  
  return (
    <div className="ArtistPage-container">
      <CardHeader
        title={<h2>{artist.artist_name}</h2>}
        style={{padding: '16px 8px'}}
        avatar={
          <div style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
            <img
              alt="artist"
              src={artist.image}
              className="ArtistPage-img"
              width="60"
              onClick={() => setOpen(artist.image)}
            />
            {artist.image_credit && <span style={{fontSize: 10}}>{artist.image_credit}</span>}
          </div>
        }
      />
      
      <EditableContent
        expandable={/\r|\n/.exec(artist.body)}
        changeHandler={handleUpdateBody}
        content={artist.body}
      />

      {artist.discography && 
        <section className="ArtistPage-disco">
          <h4 className="ArtistPage-disco-heading">Selected Discography</h4>
          <div>
          {massageEntries(artist.discography).sort(byEntryNumber).map((albumList, i) => (
            <div key={`album-index-${i}`} style={{padding: '0 8px'}}>
              <h4 className="ArtistPage-disco-heading">{albumList.artist_name}</h4>
              {massageEntries(albumList.albums).sort(byYear).map((album, j) => {
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
                      {album.image && (
                        <img 
                          src={album.image} 
                          width="12%" 
                          height="12%" 
                          onClick={() => setOpen(album.image)}
                        />
                      )}
                      <EditableContent
                        changeHandler={handleUpdateReview(albumList.id, album)}
                        content={album.review}
                      />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })}
              </div>
            ))}
          </div>
        </section>
      }

      <Dialog
        open={open}
        onClose={() => setOpen(null)}
        aria-labelledby="simple-dialog-title"
      >
        <img
          alt="artist"
          src={open}
          style={{width: '100%', borderRadius: '3px'}}
        />
      </Dialog>
    </div>
  )
};

export default ArtistPage;
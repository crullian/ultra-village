import React, { useState /*, useEffect */} from 'react';

import EditableContent from '../EditableContent';

import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import Typography from '@material-ui/core/Typography';

import firebase from '../../firebase.js';

import './ListPage.css';

const ListPage = ({ list }) => {
	const [open, setOpen] = useState(false);
	const handleUpdateBody = e => {
    firebase.database().ref('/lists/' + list.id).update({
      body: e.target.value
    });
  }
	return (
		<div className="ListPage-container">
			<CardHeader
        title={<h2>{list.title}</h2>}
        style={{padding: '16px 8px'}}
        avatar={
          <img
            alt="artist"
            src={list.image}
            className="ArtistPage-img"
            width="60"
            onClick={() => setOpen(true)}
          />
        }
      />
      <EditableContent
        content={list.body}
        changeHandler={handleUpdateBody}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
      >
        <img
          alt="artist"
          src={list.image}
          style={{width: '100%', borderRadius: '3px'}}
        />
      </Dialog>
		</div>
	)
};

export default ListPage;
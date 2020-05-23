import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import './EditToggle.css';

const EditToggle = ({show, isEditing, toggleHandler}) => {
	return show ? (
		<div className="Page-admin-controls">
	    <IconButton className="Page-edit" onClick={toggleHandler}>
	      {isEditing
	        ? <DoneOutlineIcon style={{ color: '#0d5ffc' }} />
	        : <EditIcon  style={{ color: '#0d5ffc' }} />
	      }
	    </IconButton>
	  </div>
  ) : null;
};

export default EditToggle;
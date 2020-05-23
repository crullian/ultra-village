import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import './EditToggle.css';

const styles = theme => ({
  iconColor: {
    color: theme.palette.brandBlue,
  }
});

const EditToggle = ({classes, show, isEditing, toggleHandler}) => {
	return show ? (
		<div className="Page-admin-controls">
	    <IconButton className="Page-edit" onClick={toggleHandler}>
	      {isEditing
	        ? <DoneOutlineIcon className={classes.iconColor} />
	        : <EditIcon  className={classes.iconColor} />
	      }
	    </IconButton>
	  </div>
  ) : null;
};

export default withStyles(styles, { withTheme: true })(EditToggle);
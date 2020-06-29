import React, { useState, useEffect } from 'react';

import EditableContent from '../EditableContent';

import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import firebase from '../../firebase.js';

import './ListPage.css';

const ListPage = ({ list, listId }) => {
	return (
		<div className="ListPage-container">
			List Page for {list.title}
		</div>
	)
};

export default ListPage;
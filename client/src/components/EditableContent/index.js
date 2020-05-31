import React, { useState } from 'react';
import Remarkable from 'remarkable';
import EditToggle from '../EditToggle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import useAuth from '../../hooks/useAuth';

import './EditableContent.css';

const md = new Remarkable({ breaks:true });

const EditableContent = ({ changeHandler, content, collapsible }) => {
	const user = useAuth();
	const [expanded, setExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	return (
		<div className="Editable-content-container">
			<EditToggle show={Boolean(user)} isEditing={isEditing} toggleHandler={() => setIsEditing(!isEditing)} />
			<div className="Editable-content-flex-container">
			{isEditing ? (
		    <TextareaAutosize
		      id="Page-markdown-content"
		      className="Editable-content-review Editable-content-review-content"
		      onChange={changeHandler}
		      defaultValue={content}
		    />
		 	) : (
		   	<div className="Editable-content-review">
			    <div
			    	className={`Editable-content-review-content${collapsible && !expanded ? ' hide' : ''}`}
			      dangerouslySetInnerHTML={{ __html: md.render(content) }}
			    />
		  	</div>
		  )}
		  {collapsible && !isEditing && (
	      <Button
	        className="Editable-content-review-expand-btn"
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
	  </div>
	)
}

export default EditableContent;

import React, { useState } from 'react';
import Remarkable from 'remarkable';
import EditToggle from '../EditToggle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import './EditableContent.css';

const md = new Remarkable({breaks:true});

const EditableContent = ({ userIsAdmin, changeHandler, content, collapsible }) => {
	const [expanded, setExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	return (
		<div className="Editable-content-container">
			<EditToggle show={userIsAdmin} isEditing={isEditing} toggleHandler={() => setIsEditing(!isEditing)} />
			<div className="Editable-content-flex-container">
			{isEditing ? (
		    <textarea
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

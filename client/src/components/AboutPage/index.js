import React from 'react';
import Remarkable from 'remarkable';

import firebase from '../../firebase.js';

import './AboutPage.css';

const md = new Remarkable({breaks:true});

class AboutPage extends React.Component {
  state = {
    isEditing: false,
    newContent: ''
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

  handleUpdateContent = (e) => {
    this.setState({
      newContent: e.target.value
    })
  }

  writeAboutData = () => {
    if (this.state.newContent) {
      firebase.database().ref('/').update({about: this.state.newContent});
    }
    this.setState({isEditing: false});
  }

  render() {
    const { user, content } = this.props;
    const { isEditing } = this.state;


    let adminControls = null;
    if ((user && user.isAdmin) && !isEditing) {
      adminControls = (
        <div className="Page-admin-controls about">
          <i className="Page-edit material-icons" onClick={this.handleActivateEditMode}>edit</i>
        </div>
      )
    } else if ((user && user.isAdmin) && isEditing) {
      adminControls = (
        <div className="Page-admin-controls about">
          <button
            className="Page-edit-button"
            onClick={this.handleDeactivateEditMode}
          >
            cancel
          </button>
          <button
            className="Page-edit-button"
            onClick={this.writeAboutData}
          >
            submit
          </button>
        </div>
      )
    }

    return (
      <div className="AboutPage-container">
        {adminControls}
        {/*<h2 className="center-text">Welcome to Ultra Village</h2>
        
        <p>Ultravillage is a guide to underground ambient and new age releases from the 1970’s and 1980s with a primary focus on American artists. The site may expand in the future to include artists from other musically fertile scenes in Germany, Australia, the UK and Japan.</p>

        <p>The long term goal of this site is to include album reviews and bios for every artist that fits the above description, except those who exclusively released their work on major labels or are already well documented in mainstream sources (So no Enya, no Windham Hill releases, no Clannad, etc.)</p>

        <p>If you are interested in writing for the site, please reach out to me at <a href="mailto:ultravillagers@gmail.com" target="_top">ultravillagers@gmail.com</a></p>*/}
        {isEditing ?
          <textarea
            id="Page-markdown-content"
            className="ArtistPage-review"
            onChange={this.handleUpdateContent}
            defaultValue={content}
          />
          :
          <div
            dangerouslySetInnerHTML={{ __html: md.render(content) }}
          />
        }
      </div>
    )
  }
};

export default AboutPage;
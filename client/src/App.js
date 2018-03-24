import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      items: null
    }
    this.initialFetchPages = this.initialFetchPages.bind(this);
    this.getUniqueArtistNames = this.getUniqueArtistNames.bind(this);
  }

  componentWillMount() {
    this.initialFetchPages();
  }

  initialFetchPages() {
    fetch('/api/pages').then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.error(`Network response was not ok: ${res}`)
      }
    }).then(json => {
      this.setState({
        items: json
      });
    }).catch(error => {
      console.error(`There was a problem with your fetch operation: ${error.message}`)
    });
  }

  getUniqueArtistNames(items) {
    const uniqueItems = [];
    items.forEach(function(item) {
      if(uniqueItems.indexOf(item['artist_name'].join(', ')) < 0) {
        console.log('SDF', item['artist_name'].join(', '))
        uniqueItems.push(item['artist_name'].join(', '));
      }
    });
    return uniqueItems.sort((a, b) => {
      var a_artist = a.replace('The ', '');
      var b_artist = b.replace('The ', '');
      if (a_artist < b_artist) {
        return -1;
      } else if (a_artist > b_artist) {
        return 1;
      }
    });
  }

  render() {
    const {items} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ultra Village</h1>
        </header>
        <ul>
        {items && this.getUniqueArtistNames(items).map(item => (
          <li key={item}>{item}</li>
        ))}
        </ul>
      </div>
    );
  }
}

export default App;

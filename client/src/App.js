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
    this.initialFetch = this.initialFetch.bind(this);
  }

  componentWillMount() {
    this.initialFetch();
  }

  initialFetch() {
    fetch('/api').then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.error(`Network response was not ok: ${res}`)
      }
    }).then(json => {
      this.setState({
        title: json.title,
        items: json.docs
      });
    }).catch(error => {
      console.error(`There was a problem with your fetch operation: ${error.message}`)
    });
  }

  render() {
    const {title, items} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{title}</h1>
        </header>
        <ul>
        {items && items.map(item => (
          <li key={item._id}>{item.title}</li>
        ))}
        </ul>
      </div>
    );
  }
}

export default App;

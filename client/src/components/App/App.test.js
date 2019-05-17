import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router
} from 'react-router-dom';

import { mount } from 'enzyme';

const wrapper = mount(
	<Router>
    <App />
  </Router>
);

const mockItems = [
	{
		artist_name: 'artist',
		albums: [],
		body: 'content',
		image: 'imageURL',
	},
	{
		artist_name: 'artist',
		albums: [],
		body: 'content',
		image: 'imageURL',
	},
	{
		artist_name: 'artist',
		albums: [],
		body: 'content',
		image: 'imageURL',
	}
];

describe('App root', () => {
	it('should render ok', () => {
	  expect(wrapper.find('App').exists()).toBe(true);
	});

	it('should show a loader initially', () => {
		expect(wrapper.find('Loader').exists()).toBe(true);
		expect(wrapper.find('ArtistList').exists()).toBe(false);
	});


	it('should render a list of entries when supplied data', () => {
    const AppInstance = wrapper.find('App').instance();
    AppInstance.setState({items: mockItems, isLoading: false});
    wrapper.update();
		expect(wrapper.find('ArtistList').exists()).toBe(true);
    expect(wrapper.find('Loader').exists()).toBe(false);
	});
});

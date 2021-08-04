import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import firebase from '../firebase.js'

const massageEntries = entries =>
  Object.entries(entries).map(entry => ({...entry[1], ...{id: entry[0]}}));

export const artistApi = createApi({
  reducerPath: 'artistApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
  	getArtistList: builder.query({
      queryFn() {
      	return new Promise((resolve, reject) => {
					const itemsRef = firebase.database().ref('/');
			    itemsRef.on('value', snapshot => {
			      const db = snapshot.val();
						resolve({data: {
			        about: db.about,
			        items: massageEntries(db.artists),
			        lists: massageEntries(db.lists),
			      }})
			    });
      	})
      }
    }),
    getArtistById: builder.query({
      queryFn(route) {
				return new Promise((resolve, reject) => {
					const itemsRef = firebase.database().ref(`/${route}`);
			    itemsRef.on('value', snapshot => {
			      resolve({data: snapshot.val()});
			    });
				})
      }
    }),
  }),
})

export const { useGetArtistByIdQuery, useGetArtistListQuery, useGetPokemonByNameQuery } = artistApi
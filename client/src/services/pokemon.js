import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import firebase from '../firebase.js'

const massageEntries = entries =>
  Object.entries(entries).map(entry => ({...entry[1], ...{id: entry[0]}}));

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), //fakeBaseQuery(),
  endpoints: (builder) => ({
  	getArtistList: builder.query({
      async queryFn() {
				let data = {};
				const itemsRef = firebase.database().ref('/');
		    itemsRef.on('value', snapshot => {
		      const db = snapshot.val();
		      console.log('DB', db)
		      data = {
		        about: db.about,
		        items: massageEntries(db.artists),
		        lists: massageEntries(db.lists),
		      };
		    });
				return {data: data}
      }
    }),
    getArtistById: builder.query({
      async queryFn(route) {
				let data = {};
				const itemsRef = firebase.database().ref(`/${route}`);
		    itemsRef.on('value', snapshot => {
		      data = snapshot.val();
		    });
				return {data: data}
      }
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetArtistByIdQuery, useGetArtistListQuery } = pokemonApi
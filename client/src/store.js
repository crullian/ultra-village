import { configureStore } from '@reduxjs/toolkit'
import { artistApi } from './services/artist'

export const store = configureStore({
	reducer: {
		[artistApi.reducerPath]: artistApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(artistApi.middleware)
})
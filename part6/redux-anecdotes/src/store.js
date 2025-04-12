import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteSlice'
import filterSlice from './reducers/filterSlice'
import notificationSlice from './reducers/notificationSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    filter: filterSlice,
    notification: notificationSlice
  }
})

export default store

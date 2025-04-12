import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNewAnecdote, updateAnecdote } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateVote(state, action) {
      const updated = action.payload
      return state.map(a => a.id === updated.id ? updated : a)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, updateVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    try {
      const anecdotes = await getAll()
      dispatch(setAnecdotes(anecdotes))
    } catch (error) {
      console.error('Failed to load anecdotes:', error)
    }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    try {
      const newAnecdote = await createNewAnecdote(content)
      dispatch(appendAnecdote(newAnecdote))
    } catch (error) {
      console.error('Failed to create anecdote:', error)
    }
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    try {
      const updated = await updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
      dispatch(updateVote(updated))
    } catch (error) {
      console.error('Failed to update vote:', error)
    }
  }
}

export default anecdoteSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { createNewAnecdote, updateAnecdote } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateVote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, updateVote, setAnecdotes } = anecdoteSlice.actions

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await createNewAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(updateVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer

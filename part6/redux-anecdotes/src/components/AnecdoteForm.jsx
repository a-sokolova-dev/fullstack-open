import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteSlice'
import { setNotification } from '../reducers/notificationSlice'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (content.trim()) {
      dispatch(createAnecdote(content))
      dispatch(setNotification(`you created '${content}'`, 5))
      setContent('')
    }
  }

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="anecdote"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

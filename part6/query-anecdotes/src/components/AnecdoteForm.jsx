import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const addAnecdote = async (newAnecdote) => {
  const response = await fetch('http://localhost:3001/anecdotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAnecdote),
  });

  if (!response.ok) {
    throw new Error('Failed to add anecdote');
  }

  return response.json();
};

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) => [
        ...oldData,
        newAnecdote,
      ]);
      dispatch({ type: 'SET_NOTIFICATION', message: `Anecdote added: "${newAnecdote.content}"` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', message: `Error: ${error.message}` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      dispatch({ type: 'SET_NOTIFICATION', message: 'too short anecdote, must have length 5 or more' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
      return;
    }
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' placeholder="Enter new anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

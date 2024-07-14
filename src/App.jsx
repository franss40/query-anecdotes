import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdote } from './requests'
import { notificationContext } from './notificationReducer'
import { useContext } from 'react'

const App = () => {
  const [message, messageDispatch] = useContext(notificationContext)
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(res => res.id === anecdote.id ? anecdote : res))
    }
  })

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    messageDispatch({ type: "ADD", payload: "added vote" })
    setTimeout(() => {
      messageDispatch({ type: "ADD", payload: "" })
    }, 5000)
  }

  if (result.isLoading) {return <div>Loading Data ...</div>}
  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }
  const anecdotes = result.data

  return (
      <div>
        <h3>Anecdote app</h3>

        <Notification value={message} />
        <AnecdoteForm />
        <br />
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
  )
}

export default App

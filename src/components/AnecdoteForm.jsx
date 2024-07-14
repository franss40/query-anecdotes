import { createAnecdote } from "./../requests"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { notificationContext, useMessageDispatch } from "../notificationReducer"
const AnecdoteForm = () => {
  const messageDispatch = useMessageDispatch(notificationContext)
  const queryClient = useQueryClient()

  const dispatch = (message) => {
    messageDispatch({
      type: "ADD",
      payload: message,
    })
    setTimeout(() => {
      messageDispatch({ type: "ADD", payload: "" })
    }, 5000)
  }

  const newMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch("La longitud debe de ser al menos de 5")
    }
  })

  const onCreate = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    newMutation.mutate({ content, votes: 0 })
    dispatch("added anecdote")
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({anecdotes, filter}) => {
        if (filter === '') {
          return [...anecdotes].sort((a, b) => b.votes - a.votes)
        }
        const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
        return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
    })

    const handleVote = (anecdote) => {
        dispatch(increaseVote(anecdote.id, {...anecdote, votes: anecdote.votes + 1}))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return ( 
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    );
}
 
export default Anecdote;
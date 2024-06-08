import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import NewAnecdote from './components/AnecdoteForm'
import Anecdote from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, [])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <Anecdote />
      <NewAnecdote />
    </div>
  )
}

export default App
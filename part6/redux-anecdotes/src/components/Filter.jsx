import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      const filterValue = event.target.value
      dispatch(filterChange(filterValue))
    }
  
    return (
      <div style={{ marginBottom: 10, marginTop: 10}}>
        filter <input onChange={handleChange} />
      </div>
    )
}
  
export default Filter
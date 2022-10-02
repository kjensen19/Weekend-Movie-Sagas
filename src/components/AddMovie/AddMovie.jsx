import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function AddMovie() {
    const history = useHistory()
    const dispatch = useDispatch()
    const intialValues = {
        url:'',
        title:'',
        description:'',
        genre:''
    } 
    const [movie, setMovie] = useState(intialValues)

    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
    
        setMovie({
          ...movie,
          [name]: value,
        });
      };

    const handleSubmit = () => {
        console.log('In handle submit', movie)
        dispatch({
            type: 'ADD_MOVIE',
            payload: movie
        })
        setMovie(intialValues)

    }

    return(
        <section className="inputSec">
            <form onSubmit={handleSubmit}>
                <input type="url" placeholder="Photo URL" value={movie.url} name='url' onChange={handleInputChange} />
                <input type="text" placeholder="Movie Title" value={movie.title} name='title' onChange={handleInputChange} />
                <input type="text" placeholder="Description" value={movie.description} name='description' onChange={handleInputChange} />
                <input type="dropdown" placeholder="genre" value={movie.genre} name='genre' onChange={handleInputChange} />
                <button onClick={() => history.push('/')}>Back to List</button>
                <button type="submit">Submit</button>
            </form>

        </section>
    )
}

export default AddMovie
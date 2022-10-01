import { useState } from 'react'

function AddMovie() {
    const [movies, setMovies] = useState({
        url:'',
        title:'',
        description:'',
        genre:''    
    })

    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
    
        setValues({
          ...values,
          [name]: value,
        });
      };

    const handleSubmit = () => {
        console.log('In handle submit')
    }

    return(
        <section className="inputSec">
            <form onSubmit={handleSubmit}>
                <input type="url" placeholder="Photo URL" value={movies.poster} onChange={handleInputChange} />
                <input type="text" placeholder="Movie Title" value={movies.title} onChange={handleInputChange} />
                <input type="text" placeholder="Description" value={movies.description} onChange={handleInputChange} />
                <input type="dropdown" placeholder="genre" value={movies.genre} onChange={handleInputChange} />
                <button>Back to List</button>
                <button type="submit">Submit</button>
            </form>

        </section>
    )
}

export default AddMovie
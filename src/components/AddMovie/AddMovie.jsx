import { useState } from 'react'

function AddMovie() {
    const [movies, setMovies] = useState({
        url:'',
        title:'',
        description:'',
        genre:''    
    })
    return(
        <section className="inputSec">
            <form>
                <input type="url" placeholder="Photo URL" value={url} />
                <input type="text" placeholder="Movie Title" value={title} />
                <input type="text" placeholder="Description" value={description} />
                <input type="dropdown" placeholder="genre" value={genre} />
            </form>

        </section>
    )
}

export default AddMovie
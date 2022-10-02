import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory} from 'react-router-dom'

function MovieDetails() {
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    
    useEffect(() => {
        const movieId = params.id

        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: movieId
        })

        return () => {
            dispatch({
                type: 'CLEAR_MOVIE_DETAILS'
            })
        }
    }, [params.id])

    const movieDetails = useSelector(store => store.movieDetails)
    console.log(movieDetails)
    return(
        <section>
            <h1>{movieDetails.title}</h1>
            <img src={movieDetails.poster} />
            <p>{movieDetails.description}</p>
            <ul>{movieDetails.array_agg.map(genre => {
                return(
                    <li>{genre}</li>
                )
            })}</ul>
            <button>EDIT</button>
            <button onClick={() => history.push('/')}>BACK TO MAIN</button>
        </section>
    )
}

export default MovieDetails;

// {movies.map(movie => {
//     return (
//         <MovieItem movie={movie}/>
//     );
// })}

// const params = useParams()
// const dispatch = useDispatch()

// // useEffect: dispatch to a Saga function that will get
// //            the bike details from our database!
// useEffect(() => {
//   const bikeId = params.id

//   dispatch({
//     type: 'FETCH_BIKE_DETAILS',
//     payload: bikeId
//   })

//   return () => {
//     dispatch({
//       type: 'CLEAR_BIKE_DETAILS'
//     })
//   }
// }, [params.id])

// const bikeDetails = useSelector(store => store.bikeDetails)
import { useHistory } from 'react-router-dom'



function MovieItem({ movie }) {
    const history = useHistory()
    console.log("Movie info equals (in item) ", movie)

    const handleDetailsClick = () => {
        console.log('movie id in details click', movie.id)
        history.push(`/movies/${movie.id}`)
    }
    return(
        <div key={movie.id} onClick={handleDetailsClick} className="crossBar">
            {/* <h3>{movie.title}</h3> */}
            <img src={movie.poster} alt={movie.title}/>
        </div>
    )
}

export default MovieItem



// function BikeItem({ bike }) {
//   const history = useHistory()

//   const handleDetailsClick = () => {
//     console.log(bike.id)
//     // dispatch({
//     //   type: 'FETCH_BIKE_DETAILS',
//     //   payload: bike.id
//     // })
//     history.push(`/bikes/${bike.id}`)
//   }

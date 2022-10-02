import { useHistory } from 'react-router-dom'
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';







function MovieItem({ movie }) {
    const history = useHistory()
    console.log("Movie info equals (in item) ", movie)

    const handleDetailsClick = () => {
        console.log('movie id in details click', movie.id)
        history.push(`/movies/${movie.id}`)
    }
    return(
        <Paper elevation={0} >
            <ImageListItem key={movie.img}  >
                <img
                    key={movie.id}
                    onClick={handleDetailsClick}
                    src={`${movie.poster}?w=496&fit=crop&auto=format`}
                    srcSet={`${movie.poster}?w=496&fit=crop&auto=format&dpr=2 2x`}
                    alt={movie.title}
                    loading="lazy"
                />
            </ImageListItem>
        </Paper>

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

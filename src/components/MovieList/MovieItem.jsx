import { useHistory } from 'react-router-dom'
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';







function MovieItem({ movie }) {
    const history = useHistory()
        //push to detail page
    const handleDetailsClick = () => {
        history.push(`/movies/${movie.id}`)
    }
    return(
            <Paper elevation={20}>
                <Paper elevation={15}>
                    <Paper elevation={10}>
                        <Paper elevation={5}>
                            <ImageListItem key={movie.img} className="frame">
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
                    </Paper>
                </Paper>
            </Paper>

    )
}

export default MovieItem






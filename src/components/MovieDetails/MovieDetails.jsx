import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import './MovieDetails.css'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TheatersIcon from '@mui/icons-material/Theaters';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';

//Setup for MUI more info section of card
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(-90deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function MovieDetails() {
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    const [expanded, setExpanded] = React.useState(false);

    //on page load use param (id) to get details
    //on exit clear
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    const movieDetails = useSelector(store => store.movieDetails)

    return(
        <Card sx={{width: 500, height: 950, }} className="infoCard">
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="Movie Icon">
                        <TheatersIcon />
                    </Avatar>
                }
                title={movieDetails.title}
            />
            <CardMedia
                component="img"
                image={movieDetails.poster}
                alt="Movie Poster"
                id="detailPoster"
            />
            <CardContent>
                <Typography variant="h5" color="text.secondary">
                    {movieDetails.title}
                </Typography>
            </CardContent>
            <CardActions >
                <IconButton aria-label="Edit">
                <EditIcon />
                </IconButton>
                <IconButton aria-label="Home" onClick={() => history.push('/')}>
                <HomeIcon />
                </IconButton>
                <label id="moreInfoLabel">More Info
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore>
                </label>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit >
                <CardContent className="moreInfo">
                <Typography paragraph>Genres:</Typography>
                <Typography paragraph>
                <ul>{movieDetails.array_agg.map(genre => {
                        return(
                            <li>{genre}</li>
                        )
                    })}</ul>
                </Typography>
                <Typography paragraph>
                {movieDetails.description}
                </Typography>
                <Typography paragraph>
                text
                </Typography>
                <Typography>
                    TEXT
                </Typography>
                </CardContent>
            </Collapse>
            </Card>
    )
        }

export default MovieDetails;

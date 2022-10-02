import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItem from './MovieItem';
import { useHistory } from 'react-router-dom'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import Paper from '@mui/material/Paper';




function MovieList() {
    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
            <Paper >
                <Box sx={{ width: 1, height: .75, paddingTop: 2 }}>
                    <ImageList variant="masonry" cols={4} gap={40}>
                        {movies.map((movie) => (
                            <Paper elevation={10}>
                                <MovieItem movie={movie} />
                            </Paper>
                        ))}
                    </ImageList>
                </Box>
            </Paper>
  );
}

export default MovieList;
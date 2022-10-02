import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItem from './MovieItem';
import { useHistory } from 'react-router-dom'

function MovieList() {
    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="outerFrame">
                <div className="movies">
                    <div className="imgFrame">
                        {movies.map(movie => {
                            return (
                                <MovieItem movie={movie}/>
                            );
                        })}
                    </div>
                </div>
            </section>
            <button onClick={()=>history.push('/add')}>Add movie</button>
        </main>


    );
}

export default MovieList;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.jsx';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies)
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails)
    yield takeEvery('ADD_MOVIE', addMovie)
    ;
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}
//get details(movie and genre)
function* fetchMovieDetails(action) {
    const movieId = action.payload
    const movieDetailsRes = yield axios({
        method: 'GET',
        url: `/api/movie/${movieId}`
    })
    yield put({
        type: 'SET_MOVIE_DETAILS',
        payload: movieDetailsRes.data
    })
}
//POST
function* addMovie(action) {
    yield axios({
        method: 'POST',
        url:'/api/movie',
        data: action.payload
    })
    yield put({
        type: 'FETCH_MOVIES'
    })
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
//detail view reducer and clear, set to array to prevent error on
//load
const movieDetails = (state = {array_agg: []}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload[0]
        case 'CLEAR_MOVIE_DETAILS':
            return {array_agg: []}
        default:
            return state;
    }
}

// Not Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

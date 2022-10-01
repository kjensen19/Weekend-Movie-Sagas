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
    ;
}


// const bikeDetails = (state = {}, action) => {
//     switch (action.type) {
//       case 'SET_BIKE_DETAILS':
//         return action.payload
//       case 'CLEAR_BIKE_DETAILS':
//         return {}
//       default:
//         return state
//     }

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function fetchMovieDetails(action) {
    const movieId = action.payload
    const movieDetailsRes = yield axios({
        method: 'GET',
        url: `/api/movies/${movieId}`
    })
    yield put({
        type: 'SET_MOVIE_DETAILS',
        payload: movieDetailsRes.data
    })
}

// function* fetchBikeDetails(action) {
//     const bikeId = action.payload
//     const bikeDetailsRes = yield axios({
//       method: 'GET',
//       url: `/api/bikes/${bikeId}`
//     })
//     yield put({
//       type: 'SET_BIKE_DETAILS',
//       payload: bikeDetailsRes.data
//     })
//   }

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

const movieDetails = (stat = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload
        case 'CLEAR_MOVIE_DETAILS':
            return {}
        default:
            return state;
    }
}

// const bikeDetails = (state = {}, action) => {
//     switch (action.type) {
//       case 'SET_BIKE_DETAILS':
//         return action.payload
//       case 'CLEAR_BIKE_DETAILS':
//         return {}
//       default:
//         return state
//     }
//   }

// Used to store the movie genres
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

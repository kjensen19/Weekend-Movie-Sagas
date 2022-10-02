import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import MovieList from '../MovieList/MovieList'
import '../MovieList/MovieList.css'
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path="/movies/:id">
          <MovieDetails />
        </Route>
        <Route exact path="/add">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;

// exact path="/bikes/:id"

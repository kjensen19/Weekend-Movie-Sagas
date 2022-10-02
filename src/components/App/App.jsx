import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import MovieList from '../MovieList/MovieList'
import '../MovieList/MovieList.css'
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react'
import Paper from '@mui/material/Paper';
import ButtonBar from './ButtonBar';




function App() {
  const [colorMode, setColorMode] = useState('dark')
  const darkTheme = createTheme({
    palette: {
      mode: `${colorMode}`,
    },
  });

  function toggleColor() {
    colorMode === 'light' ? setColorMode('dark') : setColorMode('light')
}
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper className={colorMode} elevation={8} color="inherit">
        <Router>
        <ButtonBar colorMode={colorMode} setColorMode={setColorMode}/>    
          <Route path="/" exact>
            <header>
              <title>Movie Gallery</title>
            </header>
            <MovieList />
          </Route>
          <Route exact path="/movies/:id">
            <MovieDetails />
          </Route>
          <Route exact path="/add">
            <AddMovie />
          </Route>
        </Router>
      </Paper>
    </ThemeProvider>

  );
}


export default App;


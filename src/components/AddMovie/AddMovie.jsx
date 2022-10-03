import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

import './AddMovie.css'



//MUI control for dropdown
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function AddMovie() {
    const history = useHistory()
    const dispatch = useDispatch()
    //set intial values for the input object to make resets easier
    //genre is an array so we can add multiples
    const intialValues = {
        poster:'',
        title:'',
        description:'',
        genre:[]
    } 
    const [movie, setMovie] = useState(intialValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie({
          ...movie,
          [name]: value,
        });
      };
      //dispatch add movie (which triggers SAGA POST)
    const handleSubmit = () => {
        dispatch({
            type: 'ADD_MOVIE',
            payload: movie
        })
        //reset input values
        setMovie(intialValues)
    }
    //Genre list for dropdown
    const genres = [
        'Adventure',
        'Animated',
        'Biographical',
        'Comedy',
        'Disaster',
        'Drama',
        'Epic',
        'Fantasy',
        'Musical',
        'Romantic',
        'Science Fiction',
        'Space-Opera',
        'Superhero'
    ]

    return(
        <Paper id="addContainer" >
            <form onSubmit={handleSubmit} color="inherit">
            <Stack  alignItems='center' color="inherit" spacing={4}>
                <h1>Add A Movie</h1>

                    <input
                        required
                        type="text" 
                        color="inherit" 
                        placeholder="Photo URL" 
                        value={movie.poster} 
                        name='poster' 
                        onChange={handleInputChange} 
                        />
                    <input required type="text" color="inherit" placeholder="Movie Title" value={movie.title} name='title' onChange={handleInputChange} />
                    <input required type="text" color="inherit" placeholder="Description" value={movie.description} name='description' onChange={handleInputChange} />
                    <InputLabel id="dropLabel">Genre:</InputLabel>
                    <Select
                        required
                        id="demo-multiple-checkbox"
                        multiple
                        value={movie.genre}
                        name="genre"
                        onChange={handleInputChange}
                        input={<OutlinedInput label="Genre" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        variant='filled'
                        placeholder='Genre'
                    >
                    {genres.map((g) => (
                        <MenuItem key={g} value={g} >
                            <Checkbox checked={movie.genre.indexOf(g) > -1} />
                            <ListItemText primary={g} />
                        </MenuItem>
            ))}     </Select>
                    <Stack direction={'row'} spacing={2}>
                        <Button className="class" variant='outlined' color="inherit" onClick={() => history.push('/')}>Back to List</Button>
                        <Button className="class" variant='outlined' color="inherit" type="submit">Submit</Button>
                    </Stack>
                    <h1>Image Preview:</h1>
                    <img src={movie.poster} />
                </Stack>
            </form>
        </Paper>
            

    )
}

export default AddMovie
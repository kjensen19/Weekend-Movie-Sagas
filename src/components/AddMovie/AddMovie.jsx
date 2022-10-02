import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';


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

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// export default function MultipleSelectCheckmarks() {
//   const [personName, setPersonName] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };

//   return (
//     <div>
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           id="demo-multiple-checkbox"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Tag" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {names.map((name) => (
//             <MenuItem key={name} value={name}>
//               <Checkbox checked={personName.indexOf(name) > -1} />
//               <ListItemText primary={name} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }


function AddMovie() {
    const history = useHistory()
    const dispatch = useDispatch()
    const intialValues = {
        url:'',
        title:'',
        description:'',
        genre:[]
    } 
    const [movie, setMovie] = useState(intialValues)

    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
        setMovie({
          ...movie,
          [name]: value,
        });
      };

    const handleSubmit = () => {
        console.log('In handle submit', movie)
        dispatch({
            type: 'ADD_MOVIE',
            payload: movie
        })
        setMovie(intialValues)

    }
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
        <section className="inputSec">
            <form onSubmit={handleSubmit}>
            <Stack width={200} alignItems='center'>
                    <input type="url" placeholder="Photo URL" value={movie.url} name='url' onChange={handleInputChange} />
                    <input type="text" placeholder="Movie Title" value={movie.title} name='title' onChange={handleInputChange} />
                    <input type="text" placeholder="Description" value={movie.description} name='description' onChange={handleInputChange} />
                    <Select
                        id="demo-multiple-checkbox"
                        multiple
                        value={movie.genre}
                        name="genre"
                        onChange={handleInputChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                    {genres.map((g) => (
                        <MenuItem key={g} value={g} >
                            <Checkbox checked={movie.genre.indexOf(g) > -1} />
                            <ListItemText primary={g} />
                        </MenuItem>
            ))}     </Select>
                    <button onClick={() => history.push('/')}>Back to List</button>
                    <button type="submit">Submit</button>
                </Stack>
            </form>
            

        </section>
    )
}

export default AddMovie
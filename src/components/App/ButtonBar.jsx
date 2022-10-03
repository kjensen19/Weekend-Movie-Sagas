import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';


//Top button bar
function ButtonBar( {colorMode, setColorMode} ) {

    const history = useHistory()
    const dispatch = useDispatch()
    //mode toggle conditional
    function toggleColor() {
        colorMode === 'light' ? setColorMode('dark') : setColorMode('light')
    }
    //dispatch for home button
    function handleHome(){
        dispatch({type: 'CLEAR_DATA'})
        history.push('/')
    }
    //info tab would go here
    function handleInfo(){

    }
    //navigate to add page
    function handleAdd() {
        history.push('/add')
    }

    return(
        <Stack direction="row" id="buttonBar">
                <Button onClick={toggleColor} variant="outlined"  color='inherit'>
                {colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </Button>
                <Button variant='outlined' color="inherit" onClick={handleHome} title="Start Over"><HomeIcon /></Button>
                <Button variant='outlined' color="inherit" onClick={handleInfo}><QuestionMarkIcon /></Button>
                <Button variant='outlined' color="inherit" onClick={handleAdd}><AddIcon /></Button>
        </Stack>
        
    )
}

export default ButtonBar
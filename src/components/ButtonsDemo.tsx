import { useState } from 'react';
import { 
Logout, 
Delete,
Login,
Add,
Edit,
} from '@mui/icons-material';
import {Button, 
ButtonGroup,
TextField,
Autocomplete,
Box,
Checkbox,
FormControlLabel,
Fab,
Stack,
Radio,
RadioGroup,
FormControl,
FormLabel,
Tooltip,
IconButton,
} from '@mui/material';

export default () => {

    const top100Films = ["ho", "hi", "hu"]
    const [state, setState] = useState({ chk1: true, chk2: false });
    const [val, setVal] = useState('female');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVal((event.target as HTMLInputElement).value);
    };
    return (
        <Box>

            {/* create a button with a login icon */}
            <Button startIcon={<Login/>} color="primary" size="small" variant="contained" endIcon={<Login/>}> Click Me </Button>
            <Button startIcon={<Logout/>} color="secondary" variant="contained"> Logout </Button>

            {/* create a button group */}
            <br /><br />
            <ButtonGroup variant="contained">
                <Button endIcon={<Login/>} color="primary"> Login </Button>
                <Button startIcon={<Logout/>} color="secondary"> Logout </Button>
            </ButtonGroup>
            <br /><br /><ButtonGroup variant="contained" orientation="vertical">
                <Button endIcon={<Delete/>} color="primary"> Delete </Button>
                <Button startIcon={<Logout/>} color="secondary"> Logout </Button>
            </ButtonGroup>
            Tooltip:
            <Tooltip title="Delete">
                <IconButton>
                    <Delete/>
                </IconButton>
            </Tooltip>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" variant="outlined" size="small"/>}
            />
            <h2>Box</h2>

            <p>
                The Box component serves as a wrapper component for most of the CSS utility needs.
            </p>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                <FormControlLabel
                    label="Child 1"
                    control={<Checkbox checked={state.chk1} onChange={handleChange} name="chk1" />}
                />
                <FormControlLabel
                    label="Child 2"
                    control={<Checkbox checked={state.chk2} onChange={handleChange} name="chk2" />}
                />
                <Fab size="medium" color="secondary" aria-label="add"> <Edit /> </Fab>
                <Fab size="medium" color="primary" aria-label="add"> <Add/> </Fab>
                <br />
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="error"> Error </Button>

                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={val}
                            onChange={handleChange2}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Box>
        </Box>
    );
}
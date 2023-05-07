import * as React from 'react';
import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Header = () => {
    const navigate = useNavigate();

    const handleLoginButton = () => navigate('/auth/login');
    const handleSignUpButton = () => navigate('/auth/sign-up');

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <FitnessCenterIcon
                        sx={{margin: 2}}
                    />
                    <Typography variant="h6" component="div" sx={{fontSize: 22, flexGrow: 1}}>
                        Fitness-club
                    </Typography>

                    <FormControl sx={{marginRight: 2}}>
                        <Select
                            sx={{
                                color: 'inherit',
                                boxShadow: 'none',
                                '.MuiOutlinedInput-notchedOutline': {border: 0},
                                fontSize: 21,
                                fontStyle: 'normal',
                                textTransform: 'none'
                            }}
                            value="Pages"
                            onChange={() => {
                            }}
                        >
                            <MenuItem onClick={() => navigate('/home')}>Home</MenuItem>
                            <MenuItem onClick={() => {
                            }}>Services</MenuItem>
                            <MenuItem onClick={() => {
                            }}>Trainers</MenuItem>
                            <MenuItem onClick={() => {
                            }}>About Us</MenuItem>
                            <MenuItem value="Pages" sx={{display: 'none'}}>Pages</MenuItem>
                        </Select>
                    </FormControl>

                    <Button sx={{color: 'inherit', fontSize: 21, fontStyle: 'normal', textTransform: 'none'}}
                            onClick={handleLoginButton}>
                        Login
                    </Button>
                    <Button sx={{color: 'inherit', fontSize: 21, fontStyle: 'normal', textTransform: 'none'}}
                            onClick={handleSignUpButton}>
                        Sign Up
                    </Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;

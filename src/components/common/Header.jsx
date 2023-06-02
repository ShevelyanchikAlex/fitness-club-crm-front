import * as React from 'react';
import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {
    FormControl,
    MenuItem,
    Select,
} from "@mui/material";
import AccountMenu from "./AccountMenu";

const Header = () => {
    const navigate = useNavigate();

    const ADMIN_ROLE = 'ADMIN';
    const USER_ROLE = 'USER';
    const TRAINER_ROLE = 'TRAINER';
    const email = localStorage.getItem("user-email");
    const role = localStorage.getItem("user-role");

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
                        Fitness Club
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
                            {/*admin*/}
                            {role && role === ADMIN_ROLE &&
                                <MenuItem onClick={() => navigate('/admin/users')}>Users</MenuItem>}
                            {role && role === ADMIN_ROLE &&
                                <MenuItem onClick={() => navigate('/admin/services')}>Services</MenuItem>}
                            {role && role === ADMIN_ROLE &&
                                <MenuItem onClick={() => navigate('/admin/trainers')}>Trainers</MenuItem>}
                            {role && (role === ADMIN_ROLE) &&
                                <MenuItem onClick={() => navigate('/admin/schedule')}>Schedule</MenuItem>}
                            {role && (role === ADMIN_ROLE) &&
                                <MenuItem onClick={() => navigate('/admin/reservations')}>Reservations</MenuItem>}
                            {role && (role === ADMIN_ROLE) &&
                                <MenuItem onClick={() => navigate('/admin/newsArticles')}>News</MenuItem>}
                            {role && (role === ADMIN_ROLE) &&
                                <MenuItem onClick={() => navigate('/admin/newsApiArticles')}>News from API</MenuItem>}
                            {role && role === ADMIN_ROLE &&
                                <MenuItem onClick={() => navigate('/admin/services/create')}>New Service</MenuItem>}
                            {role && role === ADMIN_ROLE &&
                                <MenuItem onClick={() => navigate('/admin/trainers/create')}>New Trainer</MenuItem>}
                            {role && (role === ADMIN_ROLE) &&
                                <MenuItem onClick={() => navigate('/admin/schedule/create')}>Add Service to
                                    Schedule</MenuItem>}
                            {role && (role === ADMIN_ROLE) &&
                                <MenuItem onClick={() => navigate('/admin/news/create')}>Add News Article</MenuItem>}
                            {/*trainer*/}
                            {role && role === TRAINER_ROLE &&
                                <MenuItem onClick={() => navigate('/trainer/trainers')}>Trainers</MenuItem>}
                            {role && role === TRAINER_ROLE &&
                                <MenuItem onClick={() => navigate('/trainer/reservations')}>Reservations</MenuItem>}
                            {role && role === TRAINER_ROLE &&
                                <MenuItem onClick={() => navigate('/trainer/schedule')}>Schedule</MenuItem>}
                            {role && (role === TRAINER_ROLE) &&
                                <MenuItem onClick={() => navigate('/trainer/schedule/create')}>Add Service to
                                    Schedule</MenuItem>}
                            {/*user and guest*/}
                            {(!role || role === USER_ROLE) &&
                                <MenuItem onClick={() => navigate('/home')}>Home</MenuItem>}
                            {(!role || role === USER_ROLE) &&
                                <MenuItem onClick={() => navigate('/services')}>Services</MenuItem>}
                            {(!role || role === USER_ROLE) &&
                                <MenuItem onClick={() => navigate('/trainers')}>Trainers</MenuItem>}
                            {(!role || role === USER_ROLE) &&
                                <MenuItem onClick={() => navigate('/news')}>News</MenuItem>}
                            {(!role || role === USER_ROLE) &&
                                <MenuItem onClick={() => navigate('/contacts')}>About Us</MenuItem>}
                            {/*user*/}
                            {(role && role === USER_ROLE) &&
                                <MenuItem onClick={() => navigate('/schedule')}>Schedule</MenuItem>}
                            <MenuItem value="Pages" sx={{display: 'none'}}>Pages</MenuItem>
                        </Select>
                    </FormControl>

                    {email
                        ? <AccountMenu email={email} role={role}/>
                        : <Box>
                            <Button sx={{color: 'inherit', fontSize: 21, fontStyle: 'normal', textTransform: 'none'}}
                                    onClick={handleLoginButton}>
                                Login
                            </Button>
                            <Button sx={{color: 'inherit', fontSize: 21, fontStyle: 'normal', textTransform: 'none'}}
                                    onClick={handleSignUpButton}>
                                Sign Up
                            </Button>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;

import * as React from 'react';
import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GroupIcon from '@mui/icons-material/Group';
import {IconButton} from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Header = () => {
    const navigate = useNavigate();

    const handleSignUpButton = () => navigate('/sign-up');
    const handleUsersButton = () => navigate('/users');

    return (
        <Box sx={{flexGrow: 1,}}>
            <AppBar position="fixed">
                <Toolbar>
                    <FitnessCenterIcon
                        sx={{margin: 2}}
                    />
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Fitness-club
                    </Typography>

                    <IconButton
                        size="large"
                        aria-label="Users"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleUsersButton}
                        color="inherit">
                        <GroupIcon/>
                    </IconButton>
                    <Button
                        color="inherit"
                        onClick={handleSignUpButton}
                    >Sign Up</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;

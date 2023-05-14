import React from 'react';
import '../../assets/styles/Footer.css'
import {Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Logout, PersonAdd, Settings} from "@mui/icons-material";
import HistoryIcon from '@mui/icons-material/History';
import AuthService from "../../service/AuthService";
import {useNavigate} from "react-router-dom";

const AccountMenu = ({email, role}) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpenAccountMenu = Boolean(anchorEl);

    const handleAccountMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/user/profile');
    }

    const handleReservedServicesClick = () => {
        navigate('/user/services');
    }

    const handleLogoutButton = () => {
        AuthService.logout()
            .then(() => {
                navigate('/home');
            })
            .catch(e => console.log(e.response.status));
    }


    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton onClick={handleAccountMenuClick}>
                    <Avatar sx={{width: 40, height: 40}}></Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={isOpenAccountMenu}
                onClose={handleAccountMenuClose}
                onClick={handleAccountMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={handleProfileClick}>
                    <Avatar/> Profile {email}
                </MenuItem>
                <Divider/>
                {role && role === 'USER' &&
                    <MenuItem onClick={handleReservedServicesClick}>
                        <ListItemIcon>
                            <HistoryIcon fontSize="small"/>
                        </ListItemIcon>
                        Reserved Services
                    </MenuItem>
                }
                <MenuItem onClick={handleLogoutButton}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AccountMenu;
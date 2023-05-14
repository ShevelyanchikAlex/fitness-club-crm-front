import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../../assets/styles/CircularProgress.css'

const CircularIndeterminate = () => {
    return (
        <Box id={"circular-progress"}>
            <CircularProgress />
        </Box>
    );
}

export default CircularIndeterminate;
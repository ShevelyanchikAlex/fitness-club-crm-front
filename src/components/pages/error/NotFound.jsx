import React from 'react';
import NotFoundImage from '../../../assets/images/404.png';
import '../../../assets/styles/ErrorCard.css';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Container} from "@mui/material";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container className={'error-container'}>
            <h1 className={'error-header'}>Page Not Found</h1>
            <img src={NotFoundImage} className={'error-image'} alt={'Not found'}/>
            <h3>Sorry, we can't find that page :(</h3>
            <Button id={'back-home-button'} onClick={() => navigate('/home')}>
                Back Home
            </Button>
        </Container>
    );
};

export default NotFound;
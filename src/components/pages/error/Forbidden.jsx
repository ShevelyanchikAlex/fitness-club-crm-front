import React from 'react';
import ForbiddenImage from "../../../assets/images/403.png";
import {useNavigate} from "react-router-dom";
import '../../../assets/styles/ErrorCard.css';
import Button from "@mui/material/Button";
import {Container} from "@mui/material";

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <Container className={'error-container'}>
            <h1 className={'error-header'}>Forbidden</h1>
            <img src={ForbiddenImage} className={'error-image'} alt={'Forbidden Image'}/>
            <h3>You don't have permission to access this resource.</h3>
            <Button id={'back-home-button'} onClick={() => navigate('/home')}>
                Back Home
            </Button>
        </Container>
    );
};

export default Forbidden;
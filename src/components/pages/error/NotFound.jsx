import React from 'react';
import NotFoundImage from '../../../assets/images/404.png';
import '../../../assets/styles/NotFound.css';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={'not-found-container'}>
            <h1 className={'not-found-header'}>Page Not Found</h1>
            <img src={NotFoundImage} className={'not-found-image'} alt={'Not found'}/>
            <h3>Sorry, we can't find that page :(</h3>
            <button className={'back-home-button'}>
                <Link to={'/users'} className={'back-home-link'}>Back Home</Link>
            </button>
        </div>
    );
};

export default NotFound;
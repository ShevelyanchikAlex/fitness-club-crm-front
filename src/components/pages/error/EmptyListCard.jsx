import React from 'react';
import EmptyListImage from '../../../assets/images/empty-list.png';
import '../../../assets/styles/ErrorCard.css';

const EmptyListCard = () => {
    return (
        <div className={'error-container'}>
            <h1 className={'error-header'}>Data Not Found</h1>
            <img className="error-image"
                 src={EmptyListImage}
                 alt="Empty List Image"/>
        </div>
    );
};

export default EmptyListCard;
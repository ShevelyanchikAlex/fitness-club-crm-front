import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import ScheduleIcon from '@mui/icons-material/Schedule';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomePageBackground from '../../assets/images/home-page-background.jpg';
import '../../assets/styles/Home.css';

const Home = () => {

    const fitnessClubFeatures =
        [
            {
                icon: <FitnessCenterIcon sx={{fontSize: 50, mr: 2}}/>,
                itemName: 'Fitness Training',
                itemDescription: 'We offer a variety of fitness programs and training classes to help you achieve your fitness goals.'
            },
            {
                icon: <GroupIcon sx={{fontSize: 50, mr: 2}}/>,
                itemName: 'Group Classes',
                itemDescription: 'Our group classes are designed to help you have fun while getting fit and meeting new people.'
            },
            {
                icon: <LocationOnIcon sx={{fontSize: 50, mr: 2}}/>,
                itemName: 'Location',
                itemDescription: 'Fitness club is located in the city center near the metro station and bus stops. Thanks to this, it is very easy to get to our club from anywhere in the city.'
            },
            {
                icon: <ScheduleIcon sx={{fontSize: 50, mr: 2}}/>,
                itemName: 'Flexible Schedule',
                itemDescription: 'We understand that everyone has different schedules, so we offer flexible hours to accommodate your needs.'
            },
            {
                icon: <SportsMartialArtsIcon sx={{fontSize: 50, mr: 2}}/>,
                itemName: 'Trainers staff',
                itemDescription: 'We offer a variety of fitness programs and training classes to help you achieve your fitness goals.'
            },
            {
                icon: <EmojiEventsIcon sx={{fontSize: 50, mr: 2}}/>,
                itemName: 'Events',
                itemDescription: 'Fitness clubs organizes events such as challenges, workshops, and seminars.'
            },
        ];


    function WelcomeBox() {
        return <Box className={'welcome-box'} sx={{backgroundImage: 'url(' + HomePageBackground + ')'}}>
            <Typography variant="h1" id={'welcome-box-header'}>
                Welcome to Fitness Club
            </Typography>
            <Typography variant="h5" sx={{mb: 1}}>
                In our fitness club You can feel the harmony of your body and head.
            </Typography>
            <Typography variant="h5" sx={{mb: 4}}>
                Our Trainers are always ready to help and do everything so that You reach your fitness goal.
            </Typography>
            <Button variant={'outlined'} id={'welcome-box-button'} sx={{px: 6}}>
                Visit Us
            </Button>
        </Box>
    }


    function FeatureItem(props) {
        return <Grid className={'feature-item'} item>
            <Box className={'feature-item-header'}>
                {props.icon}
                <Typography variant="h6">{props.feautureItemName}</Typography>
            </Box>
            <Typography variant="body1" className={'feature-item-body'}>
                {props.feautureItemDescription}
            </Typography>
        </Grid>
    }


    function FeatureBox() {
        return <Box className={'feature-box'}>
            <Typography variant="h3" id={'feature-box-header'}>
                Our Features
            </Typography>
            <Grid container spacing={3} id={'feature-items-container'}>
                {fitnessClubFeatures.map((feature) => (<FeatureItem
                    icon={feature.icon}
                    feautureItemName={feature.itemName}
                    feautureItemDescription={feature.itemDescription}
                />))}
            </Grid>
        </Box>
    }

    return (
        <Box marginTop={'5%'}>
            <WelcomeBox/>
            <FeatureBox/>
        </Box>
    )
};

export default Home;
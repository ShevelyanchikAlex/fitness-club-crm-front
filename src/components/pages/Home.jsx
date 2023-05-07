import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import ScheduleIcon from '@mui/icons-material/Schedule';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomePageBackground from '../../assets/images/home-page-background.jpeg';

const Home = () => {
    return (
        <Box marginTop={'5%'}>
            <Box
                sx={{
                    backgroundImage: 'url(' + HomePageBackground + ')',
                    height: 'calc(100vh - 70px)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    color: 'white',
                    borderRadius: '10px',
                }}
            >
                <Typography variant="h1" sx={{fontWeight: 600, mb: 2}}>
                    Welcome to Fitness Club
                </Typography>
                <Typography variant="h5" sx={{mb: 1}}>
                    In our fitness club You can feel the harmony of your body and head.
                </Typography>
                <Typography variant="h5" sx={{mb: 4}}>
                    Our Trainers are always ready to help and do everything so that You reach your fitness goal.
                </Typography>
                <Button variant={'outlined'} sx={{
                    borderRadius: '15px', px: 6, textTransform: 'none',
                    color: 'white', borderColor: 'white', fontSize: 20
                }}>
                    Visit Us
                </Button>
            </Box>


            <Box sx={{py: 6}}>
                <Typography variant="h3" sx={{textAlign: 'center', mb: 4}}>
                    Our Features
                </Typography>
                <Grid container spacing={4}>
                    <Grid item md={3} sm={6} mb={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 4,
                            }}
                        >
                            <FitnessCenterIcon sx={{fontSize: 50, mr: 2}}/>
                            <Typography variant="h6">Fitness Training</Typography>
                        </Box>
                        <Typography variant="body1">
                            We offer a variety of fitness programs and training classes to help
                            you achieve your fitness goals.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} mb={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 4,
                            }}
                        >
                            <GroupIcon sx={{fontSize: 50, mr: 2}}/>
                            <Typography variant="h6">Group Classes</Typography>
                        </Box>
                        <Typography variant="body1">
                            Our group classes are designed to help you have fun while getting
                            fit and meeting new people.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} mb={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 4,
                            }}
                        >
                            <SportsMartialArtsIcon sx={{fontSize: 50, mr: 2}}/>
                            <Typography variant="h6">Trainers staff</Typography>
                        </Box>
                        <Typography variant="body1">
                            We employ only experienced trainers who are professionals in their field.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} mb={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 4,
                            }}
                        >
                            <LocationOnIcon sx={{fontSize: 50, mr: 2}}/>
                            <Typography variant="h6">Location</Typography>
                        </Box>
                        <Typography variant="body1">
                            Fitness club is located in the city center near the
                            metro station and bus stops. Thanks to this, it is very easy to get to our club from
                            anywhere in the city.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} mb={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 4,
                            }}
                        >
                            <ScheduleIcon sx={{fontSize: 50, mr: 2}}/>
                            <Typography variant="h6">Flexible Schedule</Typography>
                        </Box>
                        <Typography variant="body1">
                            We understand that everyone has different schedules, so we offer
                            flexible hours to accommodate your needs.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} mb={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 4,
                            }}
                        >
                            <ManageAccountsIcon sx={{fontSize: 50, mr: 2}}/>
                            <Typography variant="h6">Good admin system</Typography>
                        </Box>
                        <Typography variant="body1">
                            We have experienced administrators who will find an approach for each client.
                            They can answer all your questions about the fitness club.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} mb={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 4,
                            }}
                        >
                            <SocialDistanceIcon sx={{fontSize: 50, mr: 2}}/>
                            <Typography variant="h6">Personal Training</Typography>
                        </Box>
                        <Typography variant="body1">
                            Fitness club offers personal training with certified personal trainers
                            who can help develop and implement personalized workout plans.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} mb={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 4,
                            }}
                        >
                            <EmojiEventsIcon sx={{fontSize: 50, mr: 2}}/>
                            <Typography variant="h6">Events</Typography>
                        </Box>
                        <Typography variant="body1">
                            Fitness clubs organizes events such as challenges, workshops, and seminars.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
};

export default Home;
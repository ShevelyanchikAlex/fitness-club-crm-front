import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import '../../assets/styles/AboutFitnessClub.css';

const AboutFitnessClub = () => {

    function AboutFitnessClubBox() {
        return <Box className={'about-fitness-club-box'}>
            <Typography variant="h3" id={'about-fitness-club-box-header'}>
                About Us
            </Typography>
            <Box id={'about-fitness-club-box-items-container'}>
                <Typography variant={'h5'} marginTop={2}>
                    At Fitness Club, we are committed to helping you achieve your fitness goals and lead a
                    healthier, more active lifestyle. Our state-of-the-art facility is equipped with the latest exercise
                    equipment and offers a wide range of services to cater to all fitness levels and preferences.
                </Typography>
                <Typography variant={'h5'} marginTop={2}>
                    Our experienced and certified trainers are dedicated to providing personalized attention and
                    guidance, ensuring that you receive the support you need to succeed. Whether you're looking to lose
                    weight, build strength, improve flexibility, or simply boost your overall fitness, our trainers will
                    design customized workout programs tailored to your specific needs and goals.
                </Typography>
                <Typography variant={'h5'} marginTop={2}>
                    At Fitness Club, we pride ourselves on creating a positive and inclusive environment where
                    members can feel comfortable and motivated. Our friendly staff is always available to assist you and
                    answer any questions you may have.
                </Typography>
                <Typography variant={'h5'} marginTop={2}>
                    Join us at FitLife Fitness Club and take the first step towards a healthier, fitter you. We look
                    forward to welcoming you to our fitness community!
                </Typography>
                <Typography variant={'h5'} marginTop={2}>
                    Join us and take the first step towards a healthier, fitter you. We look
                    forward to welcoming you to our fitness community!
                </Typography>
                <Typography variant={'h5'} marginTop={2}>
                    Contact us today to learn more about our membership options and how we can help you on your
                    fitness journey. You can reach us at:</Typography>
                <Box textAlign={'center'}>
                    <Typography variant={'h5'} marginTop={2} fontWeight={'bold'}>
                        Phone <Typography variant={'h6'}>+375(29)8876644 / +375(44)3453321</Typography>
                    </Typography>
                    <Typography variant={'h5'} marginTop={2} fontWeight={'bold'}>
                        Email <Typography variant={'h6'}>fitnessclub.power.maker@gmail.com</Typography>
                    </Typography>
                    <Typography variant={'h5'} marginTop={2} fontWeight={'bold'}>
                        Address <Typography variant={'h6'}> Minsk, Kuibysheva street 21</Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    }

    return (
        <Box marginTop={'5%'}>
            <AboutFitnessClubBox/>
        </Box>
    )
};

export default AboutFitnessClub;
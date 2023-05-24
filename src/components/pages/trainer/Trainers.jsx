import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Grid, Pagination} from "@mui/material";
import '../../../assets/styles/Trainers.css';
import CircularIndeterminate from "../../common/CircularProgress";
import TrainerService from "../../../service/TrainerService";
import Avatar from "@mui/material/Avatar";

const Trainers = () => {

    const PAGE_OFFSET = 1;
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [trainersCount, setTrainersCount] = useState(10);
    const [trainers, setTrainers] = useState([]);


    useEffect(() => {
        setIsLoading(true);
        TrainerService.getAllTrainerProfiles(page, size)
            .then(response => {
                response.data.forEach(trainerProfile => {
                    if (trainerProfile.userProfile.profileImagePayload) {
                        trainerProfile.userProfile.profileImagePayload = `data:${trainerProfile.userProfile.profileImagePayload.fileType};base64,${trainerProfile.userProfile.profileImagePayload.file}`;
                    }
                })
                setTrainers(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);

    useEffect(() => {
        TrainerService.getTrainersCount()
            .then(response => {
                setTrainersCount(Math.ceil(response.data / size))
            })
            .catch(e => console.log(e));
    }, [size]);


    function TrainerItem(props) {
        return <Grid className={'trainer-item'} item>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Avatar
                    sx={{height: 100, width: 100, margin: 1}}
                    src={props.trainer.userProfile.profileImagePayload}
                >
                    {props.trainer.userProfile.name ? props.trainer.userProfile.name[0] : ' '}
                    {props.trainer.userProfile.surname ? props.trainer.userProfile.surname[0] : ' '}
                </Avatar>
            </Box>
            <Box alignContent={'center'} margin={1}>
                <Typography
                    variant="h5">{props.trainer.userProfile.surname + ' ' + props.trainer.userProfile.name}</Typography>
                <Typography variant="h6">{props.trainer.kindOfSport}</Typography>
                <Typography variant="h6">{props.trainer.category}</Typography>
            </Box>
        </Grid>
    }


    function TrainersBox() {
        return <Box className={'trainer-box'}>
            <Typography variant="h3" id={'trainer-box-header'}>
                Our Trainers
            </Typography>
            <Typography variant="h6" id={'trainer-box-subheader'}>
                Our Trainers are dedicated to helping you reach your goals effectively and efficiently.
            </Typography>
            <Grid container id={'trainer-items-container'}>
                {trainers.map((trainer) => (<TrainerItem
                    key={trainer.id}
                    trainer={trainer}
                />))}
            </Grid>
        </Box>
    }

    function PaginationElement(props) {
        return <Pagination
            sx={{marginBottom: 10, justifyContent: 'center', display: 'flex'}}
            count={props.count}
            variant="outlined"
            color="primary"
            page={props.page}
            onChange={(_, page) => {
                if (page !== null) props.setPage(page - PAGE_OFFSET);
            }}
        />;
    }

    return (
        isLoading
            ? <CircularIndeterminate/>
            : <Box marginTop={'5%'}>
                <TrainersBox/>
                <PaginationElement count={trainersCount} page={page + PAGE_OFFSET} setPage={setPage}/>
            </Box>
    )
};

export default Trainers;
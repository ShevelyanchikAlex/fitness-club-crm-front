import React, {useEffect, useState} from 'react';
import '../../../assets/styles/UserEdit.css';
import {
    Card,
    Dialog, DialogContent, List,
} from "@mui/material";
import '../../../assets/styles/Services.css';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TrainerService from "../../../service/TrainerService";
import CircularIndeterminate from "../../common/CircularProgress";
import DateTimeUtilService from "../../../service/DateTimeUtilService";

const ScheduleInfoDialog = ({isOpenMoreInfo, setIsOpenMoreInfo, scheduleDto}) => {

    const [trainerDto, setTrainerDto] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpenMoreInfo && scheduleDto) {
            setIsLoading(true);
            TrainerService.getTrainerById(scheduleDto.trainerId)
                .then(response => {
                    setTrainerDto(response.data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, []);


    function ServiceInfoRow({fieldName, fieldValue}) {
        return <Box className={'service-info-card-row'}>
            <Typography variant="h5"
                        id={'service-info-card-field-name'}>{fieldName}</Typography>
            <Typography
                id={'service-info-card-field-value'}>{fieldValue}</Typography>
        </Box>;
    }


    return (
        isLoading
            ? <CircularIndeterminate/>
            : ((isOpenMoreInfo && scheduleDto && trainerDto.userDto)
                && <Dialog open={isOpenMoreInfo}
                           PaperProps={{
                               style: {
                                   backgroundColor: 'transparent',
                                   boxShadow: 'none'
                               }
                           }}
                           sx={{backgroundColor: 'transparent'}}>
                    <DialogContent>
                        <Card id={'service-info-card'}>
                            <h1 className={"service-info-card-header"}>Service Description</h1>
                            <List style={{height: 300, overflow: 'auto'}}>
                                <ServiceInfoRow fieldName={'Service Name'} fieldValue={scheduleDto.serviceDto.name}/>
                                <ServiceInfoRow fieldName={'Type of Service'} fieldValue={scheduleDto.serviceType}/>
                                <ServiceInfoRow fieldName={'Available Spots'} fieldValue={scheduleDto.availableSpots}/>
                                <ServiceInfoRow fieldName={'Price'} fieldValue={scheduleDto.serviceDto.price + ' $'}/>
                                <ServiceInfoRow fieldName={'Training Date'}
                                                fieldValue={DateTimeUtilService.formatDateTime(scheduleDto.trainingStartDateTime)}
                                />
                                <ServiceInfoRow fieldName={'Trainer'}
                                                fieldValue={trainerDto.userDto.name + ' ' + trainerDto.userDto.surname}/>
                            </List>
                            <Button id={'schedule-back-button'} onClick={() => setIsOpenMoreInfo(false)}>Back</Button>
                        </Card>
                    </DialogContent>
                </Dialog>));
}

export default ScheduleInfoDialog;
import React, {useState} from 'react';
import {
    Alert,
    Box,
    Card,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid, Snackbar
} from "@mui/material";
import Button from "@mui/material/Button";
import '../../../assets/styles/ReservedServices.css';
import Typography from "@mui/material/Typography";
import UserService from "../../../service/UserService";
import {useNavigate} from "react-router-dom";
import OrderService from "../../../service/OrderService";

const ReservationServiceDialog = ({isOpenReserveService, setIsOpenReserveService, scheduleDto}) => {
    const navigate = useNavigate();

    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');

    const handleSubmit = () => {
        const email = localStorage.getItem('user-email');
        UserService.getUserByEmail(email)
            .then(response => {
                const actualUserId = response.data.id;

                const handledOrderDto = {
                    userId: actualUserId,
                    trainerId: scheduleDto.trainerId,
                    trainingStartDateTime: scheduleDto.trainingStartDateTime,
                    serviceDto: scheduleDto.serviceDto,
                };

                console.log(handledOrderDto);

                OrderService.saveOrder(handledOrderDto)
                    .then(() => {
                        setAlertAction('success', 'Service successfully reserved.', 1000)
                        sleep(1000).then(() => {
                            setIsOpenReserveService(false);
                            window.location.reload();
                            navigate('/schedule');
                        })
                            .catch(ex => {
                                setAlertAction('error', ex.response.data, 5000)
                            })
                    });
            })
            .catch(ex => {
                setAlertAction('error', ex.response.data, 5000)
            });
    }

    function setAlertAction(severityType, text, autoHideDuration) {
        setShowAlert(true)
        setSeverityType(severityType)
        setAlertText(text)
        setAlertAutoHideDuration(autoHideDuration)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const MessageInfo = () => {
        return (!scheduleDto)
            ? <CircularProgress/>
            : <Box margin={5}>
                <Typography>
                    Do you really want to reserve a {scheduleDto.serviceDto.name} class?
                </Typography>
            </Box>
    }

    return (
        <Box>
            <Dialog open={isOpenReserveService}
                    PaperProps={{
                        style: {backgroundColor: 'transparent', boxShadow: 'none'}
                    }}
                    sx={{backgroundColor: 'transparent'}}
            >
                <DialogContent>
                    <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                              onClose={() => setShowAlert(false)}>
                        <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                            {alertText}
                        </Alert>
                    </Snackbar>
                    <Card id={'reservation-service-card'}>
                        <h1 className={"reservation-service-header"}>Service Reservation</h1>
                        <MessageInfo/>
                        <Grid container spacing={1} marginBottom={1}>
                            <Grid item xs={6}>
                                <Button id={'reservation-service-back-button'} onClick={() => {
                                    setIsOpenReserveService(false);
                                }}>Back</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button id={'reservation-service-reserve-button'}
                                        onClick={handleSubmit}>Reserve</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ReservationServiceDialog;
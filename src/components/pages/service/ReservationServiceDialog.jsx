import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Card,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid, Snackbar, TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import '../../../assets/styles/UserEdit.css';
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import * as yup from "yup";
import {useFormik} from "formik";
import {DesktopDateTimePicker} from '@mui/x-date-pickers';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import UserService from "../../../service/UserService";
import {useNavigate} from "react-router-dom";
import OrderService from "../../../service/OrderService";

const ReservationServiceDialog = ({isOpenReserveService, setIsOpenReserveService, service}) => {
    const navigate = useNavigate();

    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');
    const [orderDto, setOrderDto] = useState({
        userId: 1,
        trainerId: 1,
        trainingStartDateTime: dayjs(new Date()),
        serviceDto: service
    });

    const validationSchema = yup.object().shape({
        trainingStartDateTime: yup.string().required('Training Date cannot be empty'),
    })

    const formik = useFormik({
        initialValues: orderDto,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleSubmit();
        },
    });


    const handleSubmit = () => {
        const email = localStorage.getItem('user-email');
        UserService.getUserByEmail(email)
            .then(response => {
                const actualUserId = response.data.id;

                const handledOrderDto = {
                    userId: actualUserId,
                    trainerId: formik.values.trainerId,
                    trainingStartDateTime: formik.values.trainingStartDateTime,
                    serviceDto: formik.values.serviceDto,
                };

                console.log(handledOrderDto);

                OrderService.saveOrder(handledOrderDto)
                    .then(() => {
                        setAlertAction('success', 'Service successfully reserved.', 1000)
                        sleep(1000).then(() => {
                            setIsOpenReserveService(false);
                            window.location.reload();
                            navigate('/services');
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
        return !service
            ? <CircularProgress/>
            :
            <Box margin={5}>
                <Typography>
                    Do you really want to reserve a {service.name} class?
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
                        <form onSubmit={formik.handleSubmit}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDateTimePicker
                                    inputFormat="YYYY-MM-DD HH:mm:ss"
                                    label="Training Date"
                                    name={"trainingStartDateTime"}
                                    value={formik.values.trainingStartDateTime}
                                    minDate={dayjs(new Date())}
                                    onChange={newValue => formik.setFieldValue('trainingStartDateTime', newValue)}
                                    error={!!formik.errors.trainingStartDateTime}
                                    helperText={formik.errors.trainingStartDateTime}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   required
                                                   value={formik.values.trainingStartDateTime}
                                                   name={"trainingStartDateTime"}
                                                   margin="normal"
                                                   fullWidth
                                                   error={!!formik.errors.trainingStartDateTime}
                                                   helperText={formik.errors.trainingStartDateTime}
                                        />
                                    }
                                />
                            </LocalizationProvider>
                        </form>
                        <Grid container spacing={1}>
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
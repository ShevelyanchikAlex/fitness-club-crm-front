import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import '../../../../assets/styles/FormCard.css';
import {
    Alert,
    Card,
    Container,
    FormControl,
    Grid,
    InputLabel,
    List,
    MenuItem,
    Select,
    Snackbar,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import TrainerService from "../../../../service/TrainerService";
import Box from "@mui/material/Box";
import Forbidden from "../../error/Forbidden";
import ServiceService from "../../../../service/ServiceService";
import ScheduleService from "../../../../service/ScheduleService";
import {DesktopDateTimePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import CircularProgress from "../../../common/CircularProgress";

const AdminScheduleCreationForm = () => {
    const navigate = useNavigate();

    const ADMIN_ROLE = 'ADMIN';
    const TRAINER_ROLE = 'TRAINER';
    const INDIVIDUAL_AVAILABLE_SPOTS = 1;
    const [role, setRole] = useState('GUEST');
    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(100);
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState();
    const serviceTypes = ['INDIVIDUAL', 'GROUP'];
    const [scheduleDtoInitialValue] = useState({
        trainingStartDateTime: '',
        trainerId: '',
        availableSpots: '',
        serviceDto: '',
        serviceType: serviceTypes.at(0)
    });


    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem('user-role'))

        ServiceService.getAllServices(page, size)
            .then(response => {
                setServices(response.data);
            })
            .then(() => {
                TrainerService.getAllTrainers(page, size)
                    .then(response => {
                        setTrainers(response.data);
                        setIsLoading(false);
                    })
            })
            .catch(() => setIsLoading(false));
    }, [size]);


    const validationSchema = yup.object().shape({
        trainingStartDateTime: yup.string().required('Training Date is a required field'),
        trainerId: yup.number().required('Training is a required field'),
        availableSpots: yup.number().required("Available Spots is a required field").min(1).max(30),
        serviceDto: yup.object().required("ServiceDto is a required field"),
        serviceType: yup.string().required("Service Type is a required field"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: scheduleDtoInitialValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleSubmit();
        },
    });

    const handleSubmit = () => {
        const handledScheduleDto = {
            trainingStartDateTime: formik.values.trainingStartDateTime,
            trainerId: formik.values.trainerId,
            availableSpots: formik.values.serviceType === serviceTypes.at(0)
                ? INDIVIDUAL_AVAILABLE_SPOTS
                : formik.values.availableSpots,
            serviceDto: formik.values.serviceDto,
            serviceType: formik.values.serviceType,
        };

        console.log(handledScheduleDto)

        ScheduleService.saveSchedule(handledScheduleDto)
            .then(() => {
                setAlertAction('success', 'Schedule successfully created.', 1000)
                sleep(1000).then(() => navigate('/admin/schedule'));
            })
            .catch(ex => {
                setAlertAction('error', ex.response.data, 5000)
            })
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

    return ((role && (role === TRAINER_ROLE || role === ADMIN_ROLE))
        ? (isLoading
                ? <CircularProgress/>
                : <Container>
                    <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                              onClose={() => setShowAlert(false)}>
                        <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                            {alertText}
                        </Alert>
                    </Snackbar>
                    <Card id={"card"}>
                        <h1 className={"header"}>Schedule Creation</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <List style={{height: 300, overflow: 'auto'}}>
                                <Box sx={{minWidth: 120, marginBottom: '3%'}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Service</InputLabel>
                                        <Select
                                            label="Service"
                                            name={"serviceDto"}
                                            value={formik.values.serviceDto}
                                            onChange={formik.handleChange}
                                            defaultValue={services.at(0)}
                                        >
                                            {
                                                services.map((service, index) => (
                                                    <MenuItem value={service} key={index}>
                                                        {service.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{minWidth: 120, marginBottom: '3%'}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Trainer</InputLabel>
                                        <Select
                                            label="Trainer"
                                            name={"trainerId"}
                                            value={formik.values.trainerId}
                                            onChange={formik.handleChange}
                                            defaultValue={trainers.at(0).id}
                                        >
                                            {
                                                trainers.map((trainer, index) => (
                                                    <MenuItem value={trainer.id} key={index}>
                                                        {trainer.userDto.name + ' ' + trainer.userDto.surname}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{minWidth: 120, marginBottom: '3%'}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Type of Service</InputLabel>
                                        <Select
                                            label="Type of Service"
                                            name={"serviceType"}
                                            value={formik.values.serviceType}
                                            onChange={formik.handleChange}
                                            defaultValue={serviceTypes.at(0)}
                                        >
                                            {
                                                serviceTypes.map((serviceType, index) => (
                                                    <MenuItem value={serviceType} key={index}>
                                                        {serviceType}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
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
                                <TextField
                                    type={'number'}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Available Spots"
                                    name={"availableSpots"}
                                    value={formik.values.serviceType === serviceTypes.at(0)
                                        ? INDIVIDUAL_AVAILABLE_SPOTS
                                        : formik.values.availableSpots}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.availableSpots}
                                    helperText={formik.errors.availableSpots}
                                />
                            </List>
                            <Grid container className={"button-grid"}>
                                <Grid item xs={6}>
                                    <Button
                                        className={"back-button"}
                                        variant='outlined'
                                        sx={{textTransform: 'none'}}
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        className={"submit-button"}
                                        variant='contained'
                                        type="submit"
                                        sx={{textTransform: 'none'}}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Container>
        )
        : <Forbidden/>);
}

export default AdminScheduleCreationForm;
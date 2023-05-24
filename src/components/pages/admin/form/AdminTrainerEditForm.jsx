import React, {useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import '../../../../assets/styles/FormCard.css';
import {
    Alert,
    Card, Container, FormControl,
    Grid, List, Snackbar,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Forbidden from "../../error/Forbidden";
import TrainerService from "../../../../service/TrainerService";

const AdminTrainerEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const ADMIN_ROLE = 'ADMIN';
    const role = localStorage.getItem('user-role')
    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');
    const [trainerDtoInitialValue] = useState({
        category: location.state.category,
        kindOfSport: location.state.kindOfSport,
    });

    const validationSchema = yup.object().shape({
        category: yup.string().required("Category is a required field").min(5).max(30),
        kindOfSport: yup.string().required("Kind of Sport is a required field").min(2).max(30),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: trainerDtoInitialValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleSubmit();
        },
    });

    const handleSubmit = () => {
        const handledTrainerDto = {
            id: location.state.id,
            category: formik.values.category,
            kindOfSport: formik.values.kindOfSport,
            userDto: location.state.userDto,
        };

        TrainerService.updateTrainer(handledTrainerDto)
            .then(() => {
                setAlertAction('success', 'Trainer successfully updated.', 1000)
                sleep(1000).then(() => navigate('/admin/trainers'));
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

    return ((role && role === ADMIN_ROLE)
        ? <Container>
            <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                      onClose={() => setShowAlert(false)}>
                <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                    {alertText}
                </Alert>
            </Snackbar>
            <Card id={"card"}>
                <h1 className={"header"}>Edit Trainer</h1>
                <form onSubmit={formik.handleSubmit}>
                    <List style={{height: 300, overflow: 'auto'}}>
                        <Box sx={{minWidth: 120, margin: 'auto'}}>
                            <FormControl fullWidth>
                                <TextField
                                    margin="normal"
                                    disabled={true}
                                    required
                                    fullWidth
                                    name={"category"}
                                    value={location.state.userDto.name + ' ' + location.state.userDto.surname}
                                />
                            </FormControl>
                        </Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Category"
                            name={"category"}
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={!!formik.errors.category}
                            helperText={formik.errors.category}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="KindOfSport"
                            name={"kindOfSport"}
                            value={formik.values.kindOfSport}
                            onChange={formik.handleChange}
                            error={!!formik.errors.kindOfSport}
                            helperText={formik.errors.kindOfSport}
                        />
                    </List>
                    <Grid container className={"button-grid"}>
                        <Grid xs={6}>
                            <Button
                                className={"back-button"}
                                variant='outlined'
                                sx={{textTransform: 'none'}}
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid xs={6}>
                            <Button
                                className={"submit-button"}
                                variant='contained'
                                type="submit"
                                sx={{textTransform: 'none'}}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
        : <Forbidden/>);
}

export default AdminTrainerEditForm;
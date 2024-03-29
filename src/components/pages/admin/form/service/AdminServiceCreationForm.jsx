import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import '../../../../../assets/styles/FormCard.css';
import {Alert, Card, Container, Grid, List, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import ServiceService from "../../../../../service/ServiceService";
import Forbidden from "../../../error/Forbidden";

const AdminServiceCreationForm = () => {
    const navigate = useNavigate();

    const ADMIN_ROLE = 'ADMIN';
    const [role, setRole] = useState('GUEST');
    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');

    const [serviceDtoInitialValue] = useState({
        description: '',
        name: '',
        price: 0,
    });

    useEffect(() => {
        setRole(localStorage.getItem('user-role'))
    }, []);

    const validationSchema = yup.object().shape({
        description: yup.string().required("Description is a required field").min(5).max(300),
        name: yup.string().required("Name is a required field").min(2).max(20),
        price: yup.number().required("Price is a required field")
            .positive('Price should be positive number.')
    })

    const formik = useFormik({
        initialValues: serviceDtoInitialValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleSubmit();
        },
    });

    const handleSubmit = () => {
        const handledServiceDto = {
            description: formik.values.description,
            name: formik.values.name,
            price: formik.values.price
        };

        console.log(handledServiceDto)

        ServiceService.saveService(handledServiceDto)
            .then(() => {
                setAlertAction('success', 'Service successfully created.', 1000)
                sleep(1000).then(() => navigate('/admin/services'));
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
                <h1 className={"header"}>Service Creation</h1>
                <form onSubmit={formik.handleSubmit}>
                    <List style={{height: 300, overflow: 'auto'}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            name={"name"}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!formik.errors.name}
                            helperText={formik.errors.name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Description"
                            name={"description"}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={!!formik.errors.description}
                            helperText={formik.errors.description}
                        />
                        <TextField
                            type={'number'}
                            margin="normal"
                            required
                            fullWidth
                            label="Price"
                            name={"price"}
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={!!formik.errors.price}
                            helperText={formik.errors.price}
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
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
        : <Forbidden/>);
}

export default AdminServiceCreationForm;
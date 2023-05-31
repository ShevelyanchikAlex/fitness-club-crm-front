import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import '../../../../../assets/styles/FormCard.css';
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
import TrainerService from "../../../../../service/TrainerService";
import UserService from "../../../../../service/UserService";
import Box from "@mui/material/Box";
import Forbidden from "../../../error/Forbidden";

const AdminTrainerCreationForm = () => {
    const navigate = useNavigate();

    const ADMIN_ROLE = 'ADMIN';
    const USER_ROLE = 'USER';
    const [role, setRole] = useState('GUEST');
    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(100);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [trainerDtoInitialValue] = useState({
        category: '',
        kindOfSport: '',
        userDto: '',
    });


    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem('user-role'))
        UserService.getAllUsers(page, size)
            .then(response => {
                let usersWithUserRole = response.data.filter(user => user.role === USER_ROLE)
                setUsers(usersWithUserRole);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [size]);

    const validationSchema = yup.object().shape({
        category: yup.string().required("Category is a required field").min(5).max(30),
        kindOfSport: yup.string().required("Kind of Sport is a required field").min(2).max(30),
        userDto: yup.object().required("User is a required field")
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
            category: formik.values.category,
            kindOfSport: formik.values.kindOfSport,
            userDto: formik.values.userDto
        };

        TrainerService.saveTrainer(handledTrainerDto)
            .then(() => {
                setAlertAction('success', 'Trainer successfully created.', 1000)
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
                <h1 className={"header"}>Trainer Creation</h1>
                <form onSubmit={formik.handleSubmit}>
                    <List style={{height: 300, overflow: 'auto'}}>
                        <Box sx={{minWidth: 120, margin: 'auto'}}>
                            <FormControl fullWidth>
                                <InputLabel>User</InputLabel>
                                <Select
                                    label="User"
                                    name={"userDto"}
                                    value={formik.values.userDto}
                                    onChange={formik.handleChange}
                                    defaultValue={users.at(0)}
                                >
                                    {
                                        users.map((user, index) => (
                                            <MenuItem value={user} key={index}>
                                                {user.name + ' ' + user.surname}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
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
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
        : <Forbidden/>);
}

export default AdminTrainerCreationForm;
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import AuthService from "../../../service/AuthService";
import '../../../assets/styles/FormCard.css';
import {Alert, Card, Container, Grid, List, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const SignUp = () => {
    const navigate = useNavigate();

    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');

    const [initialValue] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        phoneNumber: '',
        confirmPassword: '',
    });

    const validationSchema = yup.object().shape({
        name: yup.string().required("Email is a required field")
            .matches("^([А-Я][а-яё]{1,30}|[A-Z][a-z]{1,30})$", "Invalid name. Name must start with uppercase letter and it length must be between 2 and 30 letters."),
        surname: yup.string().required("Email is a required field")
            .matches("^([А-Я][а-яё]{1,40}|[A-Z][a-z]{1,40})$", "Invalid surname. Surname must start with uppercase letter and and it length must be between 2 and 40 letters."),
        email: yup.string().required("Email is a required field")
            .email("Invalid email format"),
        phoneNumber: yup.string().required("Phone number is a required field")
            .matches("^\\+375(17|29|33|44)[0-9]{7}$", "Invalid phone number. Phone number must be like +375(17|29|33|44)(7 numbers)."),
        password: yup.string().required("Password is a required field")
            .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d#$@!%&*?]{8,30}$",
                "Invalid password. The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number." +
                " Password length must be between 8 and 30."),
        confirmPassword: yup.string().test('passwords-match', 'Passwords must match',
            function (value) {
                return value === this.parent.password
            }),
    })

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleSubmit();
        },
    });

    const handleSubmit = () => {
        const userDto = {
            name: formik.values.name,
            surname: formik.values.surname,
            email: formik.values.email,
            password: formik.values.password,
            phoneNumber: formik.values.phoneNumber
        };

        AuthService.signup(userDto)
            .then((response) => {
                console.log(response)
                setShowAlert(true)
                setSeverityType('success')
                setAlertText('User successfully created.')
                setAlertAutoHideDuration(1000)
                sleep(1000).then(() => navigate('/auth/login'));
            })
            .catch(ex => {
                setShowAlert(true)
                setSeverityType('error')
                setAlertText(ex.response.data)
                setAlertAutoHideDuration(5000)
            })
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <Container>
            <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                      onClose={() => setShowAlert(false)}>
                <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                    {alertText}
                </Alert>
            </Snackbar>
            <Card id={"card"}>
                <h1 className={"header"}>Sign Up</h1>
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
                            label="Surname"
                            name={"surname"}
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            error={!!formik.errors.surname}
                            helperText={formik.errors.surname}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name={"email"}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!formik.errors.email}
                            helperText={formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Phone number"
                            name={"phoneNumber"}
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={!!formik.errors.phoneNumber}
                            helperText={formik.errors.phoneNumber}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name={"password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={!!formik.errors.password}
                            helperText={formik.errors.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm password"
                            name={"confirmPassword"}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={!!formik.errors.confirmPassword}
                            helperText={formik.errors.confirmPassword}
                        />
                    </List>
                    <Grid container className={"button-grid"}>
                        <Grid xs={6}>
                            <Button
                                className={"submit-button"}
                                variant='outlined'
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
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>);
}

export default SignUp;
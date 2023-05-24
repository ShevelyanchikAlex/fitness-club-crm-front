import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import '../../../../assets/styles/UserEdit.css';
import {
    Alert,
    Card,
    Dialog, DialogContent,
    Grid,
    Snackbar,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import UserService from "../../../../service/UserService";
import AuthService from "../../../../service/AuthService";
import Typography from "@mui/material/Typography";

const UserEmailEditForm = ({isOpenUserEmailEditForm, setIsOpenUserEmailEditForm, userEmail}) => {
    const navigate = useNavigate();

    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');
    const [userEmailInit] = useState({email: userEmail});

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is a required field")
            .email("Invalid email format")
    })

    const formik = useFormik({
        initialValues: userEmailInit,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleSubmit();
        },
    });

    const handleSubmit = () => {
        UserService.updateUserEmailByActualEmail(userEmail, formik.values.email)
            .then(() => {
                setAlertAction('success', 'User email successfully edited.', 1000)
                sleep(1000).then(() => {
                    AuthService.logout()
                        .then(() => {
                            setIsOpenUserEmailEditForm(false);
                            navigate('/auth/login');
                        })
                        .catch(e => console.log(e.response.status));
                });
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


    return (
        <Dialog open={isOpenUserEmailEditForm}
                PaperProps={{
                    style: {backgroundColor: 'transparent', boxShadow: 'none'}
                }}
        >
            <DialogContent>
                <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                          onClose={() => setShowAlert(false)}>
                    <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                        {alertText}
                    </Alert>
                </Snackbar>
                <Card id={'user-edit-card'}>
                    <h1 className={"header"}>Edit Profile</h1>
                    <Typography textAlign={'center'} margin={3}>
                        Upon updating your email, you will be automatically
                        logged out and redirected to the Login Page.
                    </Typography>
                    <form onSubmit={formik.handleSubmit} sx={{height: 50}}>
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
                        <Grid container className={"button-grid"}>
                            <Grid xs={6}>
                                <Button
                                    className={"back-button"}
                                    variant='outlined'
                                    onClick={() => setIsOpenUserEmailEditForm(false)}
                                    sx={{textTransform: 'none'}}
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
            </DialogContent>
        </Dialog>);
}

export default UserEmailEditForm;
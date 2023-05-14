import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import '../../../assets/styles/UserEdit.css';
import {
    Alert,
    Card,
    Dialog, DialogContent,
    Grid,
    List,
    Snackbar,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import UserService from "../../../service/UserService";

const EditUser = ({isOpenEditForm, setIsOpenEditForm, userDto}) => {
    const navigate = useNavigate();

    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');

    let [userDtoInit] = useState({
        name: userDto.name,
        surname: userDto.surname,
        email: userDto.email,
        phoneNumber: userDto.phoneNumber,
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
    })

    const formik = useFormik({
        initialValues: userDtoInit,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleSubmit();
        },
    });

    const handleSubmit = () => {
        const editedUserDto = {
            id: userDto.id,
            name: formik.values.name,
            surname: formik.values.surname,
            email: formik.values.email,
            password: userDto.password,
            phoneNumber: formik.values.phoneNumber,
        };

        UserService.updateUser(editedUserDto)
            .then(() => {
                setAlertAction('success', 'User successfully edited.', 1000)
                sleep(1000).then(() => {
                    setIsOpenEditForm(false)
                    window.location.reload();
                    navigate('/user/profile')
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
        <Dialog open={isOpenEditForm}
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
                        </List>
                        <Grid container className={"button-grid"}>
                            <Grid xs={6}>
                                <Button
                                    className={"back-button"}
                                    variant='outlined'
                                    onClick={() => setIsOpenEditForm(false)}
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

export default EditUser;
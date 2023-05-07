import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import * as yup from 'yup';
import {useFormik} from "formik";
import {Alert, Card, Container, Grid, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Cookies} from "react-cookie"
import '../../../assets/styles/FormCard.css';
import AuthService from "../../../service/AuthService";


const Login = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const ADMIN_ROLE = 'ADMIN';
    const [showAlert, setShowAlert] = useState(false);
    const [initialValue] = useState({
        email: '',
        password: '',
    });

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is a required field")
            .email("Invalid email format"),
        password: yup.string().required("Password is a required field")
            .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d#$@!%&*?]{8,30}$",
                "Invalid password. The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number." +
                " Password length must be between 8 and 30."),
    })

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleSubmit();
        },
    });

    const handleSubmit = () => {
        const authenticationRequest = {
            email: formik.values.email,
            password: formik.values.password,
        };

        AuthService.login(authenticationRequest)
            .then(response => {
                console.log("success")
                // localStorage.setItem('user-email', response.data.email);
                // cookies.set("token", response.data.token,
                //     {
                //         path: "/",
                //         sameSite: "strict",
                //         maxAge: 604800
                //     });
                // UserService.getUserByEmail(response.data.email)
                //     .then(response => {
                //         localStorage.setItem('user-role', response.data.role);
                //         response.data.role === ADMIN_ROLE ? navigate('/admin/certificates') : navigate('/certificates');
                //     });
            })
            .catch(ex => {
                setShowAlert(true)
            })
    }


    return (
        <Container>
            <Snackbar open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}>
                <Alert severity="error" onClose={() => setShowAlert(false)}>
                    User not found. Try using a different Email or Password.
                </Alert>
            </Snackbar>
            <Card id={"card"}>
                <h1 className={"header"}>Login</h1>
                <form onSubmit={formik.handleSubmit}>
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
                        label="Password"
                        name={"password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={!!formik.errors.password}
                        helperText={formik.errors.password}
                    />
                    <Grid container className={"button-grid"}>
                        <Button
                            className={"submit-button"}
                            variant='contained'
                            type="submit"
                        >
                            Login
                        </Button>
                    </Grid>
                    <div className={'signup-link'}>
                        Not a member? <Link to={'/auth/sign-up'}>Sign Up</Link>
                    </div>
                </form>
            </Card>
        </Container>);
}

export default Login;
import {Link, useNavigate} from "react-router-dom";

import {Alert, Card, CircularProgress, Container, Grid, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import '../../../assets/styles/Profile.css';
import Typography from "@mui/material/Typography";
import UserEdit from "./UserEdit";
import {useEffect, useState} from "react";
import CircularIndeterminate from "../../common/CircularProgress";
import Forbidden from "../error/Forbidden";
import UserService from "../../../service/UserService";


const Profile = () => {
    const navigate = useNavigate();

    const [isOpenEditForm, setIsOpenEditForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [role, setRole] = localStorage.getItem("user-role");
    const isAuth = localStorage.getItem("user-email") != null;
    const [userDto, setUserDto] = useState({});

    useEffect(() => {
        setIsLoading(true);
        const email = localStorage.getItem("user-email");
        UserService.getUserByEmail(email)
            .then(response => {
                setUserDto(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    function UserFieldRow(props) {
        return <Grid container spacing={2} id={'profile-card-field-row'}>
            <Grid item id={'profile-card-field-row-item'}>
                <Typography variant="h6" fontWeight={'bold'}>{props.fieldName}</Typography>
            </Grid>
            <Grid item id={'profile-card-field-row-item'}>
                <Typography variant="h6">{props.fieldValue}</Typography>
            </Grid>
        </Grid>
    }

    return (
        isAuth
            ? (isLoading
                ? <CircularIndeterminate/>
                : <Container>
                    <Card id={"user-profile-card"}>
                        <h1 className={"header"}>Profile</h1>
                        <Grid container spacing={2} id={'profile-card-header'}>
                            <Grid item xs={2}>
                                <Avatar
                                    sx={{height: 70, width: 70}}
                                    children={`${userDto.name ? userDto.name[0] : ' '}${userDto.surname ? userDto.surname[0] : ' '}`}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">{userDto.email}</Typography>
                            </Grid>
                        </Grid>

                        <UserFieldRow fieldName={'Name'} fieldValue={userDto.name}/>
                        <UserFieldRow fieldName={'Surname'} fieldValue={userDto.surname}/>
                        <UserFieldRow fieldName={'Phone'} fieldValue={userDto.phoneNumber}/>

                        <Button id={"edit-button"} variant='contained' onClick={() => setIsOpenEditForm(true)}>
                            Edit
                        </Button>
                    </Card>
                    <UserEdit isOpenEditForm={isOpenEditForm} setIsOpenEditForm={setIsOpenEditForm} userDto={userDto}/>
                </Container>)
            : <Forbidden/>
    );
}

export default Profile;
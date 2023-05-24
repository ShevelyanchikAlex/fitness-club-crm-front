import {useNavigate} from "react-router-dom";

import {Card, Container, Grid, IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import '../../../assets/styles/Profile.css';
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import CircularIndeterminate from "../../common/CircularProgress";
import Forbidden from "../error/Forbidden";
import UserService from "../../../service/UserService";
import {Edit, PhotoCamera} from "@mui/icons-material";
import UserEmailEditForm from "./form/UserEmailEditForm";
import UserDataEditForm from "./form/UserDataEditForm";


const Profile = () => {
    const navigate = useNavigate();

    const [isOpenEditUserDataForm, setIsOpenEditUserDataForm] = useState(false);
    const [isOpenEditEmailForm, setIsOpenEditEmailForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isAuth = localStorage.getItem("user-email") != null;
    const [userProfile, setUserProfile] = useState({});
    const [userProfileImage, setUserProfileImage] = useState();

    useEffect(() => {
        setIsLoading(true);
        const email = localStorage.getItem("user-email");
        UserService.getUserProfileByEmail(email)
            .then(response => {
                setUserProfile(response.data);
                const dataUrl = `data:${response.data.profileImagePayload.fileType};base64,${response.data.profileImagePayload.file}`;
                setUserProfileImage(dataUrl);
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

    const handleImageSelect = (event) => {
        // const file = event.target.files[0];
        // console.log(file)
        // const email = localStorage.getItem("user-email");
        // setIsLoading(true);
        // UserService.updateUserProfileImage(email, file)
        //     .then(() => {
        //         setIsLoading(false)
        //         navigate('/user/profile');
        //     })
        //     .catch(() => setIsLoading(false));
    };

    return (
        isAuth
            ? (isLoading
                ? <CircularIndeterminate/>
                : <Container>
                    <Card id={"user-profile-card"}>
                        <h1 className={"header"}>Profile</h1>
                        <Grid container spacing={1} id={'profile-card-header'}>
                            <Grid item xs={2}>
                                <Avatar
                                    sx={{height: 80, width: 80}}
                                    src={userProfileImage}
                                >
                                    {userProfile.name ? userProfile.name[0] : ' '}
                                    {userProfile.surname ? userProfile.surname[0] : ' '}
                                </Avatar>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={handleImageSelect}/>
                                    <PhotoCamera/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography noWrap={true} variant="h6">{userProfile.email}</Typography>
                            </Grid>
                            <Grid item xs={1} marginLeft={1}>
                                <IconButton color="primary" aria-label="upload picture" component="label"
                                            onClick={() => setIsOpenEditEmailForm(true)}>
                                    <Edit/>
                                </IconButton>
                            </Grid>
                        </Grid>

                        <UserFieldRow fieldName={'Name'} fieldValue={userProfile.name}/>
                        <UserFieldRow fieldName={'Surname'} fieldValue={userProfile.surname}/>
                        <UserFieldRow fieldName={'Phone'} fieldValue={userProfile.phoneNumber}/>

                        <Button id={"edit-button"} variant='contained' onClick={() => setIsOpenEditUserDataForm(true)}>
                            Edit
                        </Button>
                    </Card>
                    <UserDataEditForm
                        isOpenEditUserDataForm={isOpenEditUserDataForm}
                        setIsOpenEditUserDataForm={setIsOpenEditUserDataForm}
                        userDto={userProfile}
                    />
                    <UserEmailEditForm
                        isOpenUserEmailEditForm={isOpenEditEmailForm}
                        setIsOpenUserEmailEditForm={setIsOpenEditEmailForm}
                        userEmail={userProfile.email}
                    />
                </Container>)
            : <Forbidden/>
    );
}

export default Profile;
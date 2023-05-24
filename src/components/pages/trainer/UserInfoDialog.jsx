import React, {useEffect, useState} from 'react';
import '../../../assets/styles/UserEdit.css';
import {
    Card,
    Dialog, DialogContent, List,
} from "@mui/material";
import '../../../assets/styles/Trainer.css';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularIndeterminate from "../../common/CircularProgress";
import UserService from "../../../service/UserService";

const UserInfoDialog = ({isOpenUserInfo, setIsOpenUserInfo, setSelectedReservation, reservation}) => {

    const [userDto, setUserDto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpenUserInfo && reservation) {
            setIsLoading(true);
            UserService.getUserById(reservation.userId)
                .then(response => {
                    setUserDto(response.data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, []);

    const handleCloseUserInfoDialog = () => {
        setIsOpenUserInfo(false);
        setSelectedReservation(null);
    }


    function UserInfoRow({fieldName, fieldValue}) {
        return <Box className={'trainer-table-card-row'}>
            <Typography variant="h5"
                        id={'trainer-table-card-field-name'}>{fieldName}</Typography>
            <Typography
                id={'trainer-table-info-card-field-value'}>{fieldValue}</Typography>
        </Box>;
    }

    return (
        isLoading
            ? <CircularIndeterminate/>
            : ((isOpenUserInfo && userDto)
                && <Dialog open={isOpenUserInfo}
                           PaperProps={{
                               style: {
                                   backgroundColor: 'transparent',
                                   boxShadow: 'none'
                               }
                           }}
                           sx={{backgroundColor: 'transparent'}}>
                    <DialogContent>
                        <Card id={'trainer-table-card'}>
                            <h1 className={"trainer-table-card-header"}>User Info</h1>
                            <List style={{height: 300, overflow: 'auto'}}>
                                <UserInfoRow fieldName={'Name'} fieldValue={userDto.name}/>
                                <UserInfoRow fieldName={'Surname'} fieldValue={userDto.surname}/>
                                <UserInfoRow fieldName={'Email'} fieldValue={userDto.email}/>
                                <UserInfoRow fieldName={'Phone Number'} fieldValue={userDto.phoneNumber}/>
                            </List>
                            <Button id={'trainer-table-back-button'} onClick={() => {
                                handleCloseUserInfoDialog()
                            }}>Back</Button>
                        </Card>
                    </DialogContent>
                </Dialog>));
}

export default UserInfoDialog;
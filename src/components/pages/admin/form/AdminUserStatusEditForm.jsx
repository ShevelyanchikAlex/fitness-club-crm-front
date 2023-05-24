import React, {useState} from 'react';
import '../../../../assets/styles/UserEdit.css';
import {
    Alert,
    Card,
    Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar,
} from "@mui/material";
import '../../../../assets/styles/Trainer.css';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import UserService from "../../../../service/UserService";

const AdminUserStatusEditForm = ({
                                    isOpenChangeUserStatusDialog, setIsOpenChangeUserStatusDialog,
                                    setSelectedUserDto, userDto
                                }) => {
    const navigate = useNavigate();

    const userStatuses = ['ACTIVE', 'BANNED'];
    const [selectedUserStatus, setSelectedUserStatus] = useState(userStatuses.at(0));
    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');


    const handleSubmit = () => {
        if (userDto.id && selectedUserStatus) {
            console.log(userDto.id)
            console.log(selectedUserStatus)
            UserService.updateUserStatus(userDto.id, selectedUserStatus)
                .then(() => {
                    setAlertAction('success', 'Reservation status successfully changed.', 1000)
                    sleep(1000).then(() => {
                        window.location.reload();
                        navigate('/trainer/users');
                        setIsOpenChangeUserStatusDialog(false);
                    });
                })
                .catch(ex => {
                    setAlertAction('error', ex.response.data, 5000)
                })
        }
    }


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function setAlertAction(severityType, text, autoHideDuration) {
        setShowAlert(true)
        setSeverityType(severityType)
        setAlertText(text)
        setAlertAutoHideDuration(autoHideDuration)
    }

    const handleCloseChangeUserStatusDialog = () => {
        setIsOpenChangeUserStatusDialog(false);
        setSelectedUserDto(null);
    }

    const handleUserStatusChange = (event) => {
        setSelectedUserStatus(event.target.value);
    };


    return ((isOpenChangeUserStatusDialog && userDto) &&
        <Card>
            <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                      onClose={() => setShowAlert(false)}>
                <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                    {alertText}
                </Alert>
            </Snackbar>
            <Dialog open={isOpenChangeUserStatusDialog}
                    PaperProps={{
                        style: {
                            backgroundColor: 'transparent',
                            boxShadow: 'none'
                        }
                    }}
                    sx={{backgroundColor: 'transparent'}}>
                <DialogContent>
                    <Card id={'trainer-table-card'}>
                        <h1 className={"trainer-table-card-header"}>Change User Status</h1>
                        <Box sx={{margin: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">User Status</InputLabel>
                                <Select
                                    labelId="user-status"
                                    id="user-status-select"
                                    label="User Status"
                                    value={selectedUserStatus}
                                    onChange={handleUserStatusChange}
                                >
                                    {
                                        userStatuses.map((status, index) => (
                                            <MenuItem value={status} key={index}>
                                                {status}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Grid container spacing={1} marginBottom={1}>
                            <Grid item xs={6}>
                                <Button id={'trainer-table-back-button'} onClick={() => {
                                    handleCloseChangeUserStatusDialog()
                                }}>Back</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button id={'trainer-table-change-button'} onClick={() => {
                                    handleSubmit()
                                }}>Change</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </DialogContent>
            </Dialog>
        </Card>);
}

export default AdminUserStatusEditForm;
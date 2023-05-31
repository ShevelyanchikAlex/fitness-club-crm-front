import React, {useState} from 'react';
import '../../../../../assets/styles/UserEdit.css';
import {
    Alert,
    Card,
    Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar,
} from "@mui/material";
import '../../../../../assets/styles/Trainer.css';
import Button from "@mui/material/Button";
import CircularIndeterminate from "../../../../common/CircularProgress";
import Box from "@mui/material/Box";
import OrderService from "../../../../../service/OrderService";
import {useNavigate} from "react-router-dom";

const AdminReservationStatusEditForm = ({
                                              isOpenChangeReservationStatusDialog, setIsOpenChangeReservationStatusDialog,
                                              setSelectedReservation, reservation
                                          }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const reservationStatuses = ['CONFIRMED', 'IN_PROCESSING', 'REJECTED'];
    const [selectedReservationStatus, setSelectedReservationStatus] = useState(reservation.orderStatus);
    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');


    const handleSubmit = () => {
        if (reservation) {
            OrderService.updateOrderStatus(reservation.id, selectedReservationStatus)
                .then(() => {
                    setAlertAction('success', 'Reservation status successfully changed.', 1000)
                    sleep(1000).then(() => {
                        window.location.reload();
                        navigate('/trainer/reservations');
                        setIsOpenChangeReservationStatusDialog(false);
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

    const handleCloseChangeReservationStatusDialog = () => {
        setIsOpenChangeReservationStatusDialog(false);
        setSelectedReservation(null);
    }

    const handleReservationStatusChange = (event) => {
        setSelectedReservationStatus(event.target.value);
    };


    return (
        isLoading
            ? <CircularIndeterminate/>
            : ((isOpenChangeReservationStatusDialog)
                &&
                <Card>
                    <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                              onClose={() => setShowAlert(false)}>
                        <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                            {alertText}
                        </Alert>
                    </Snackbar>
                    <Dialog open={isOpenChangeReservationStatusDialog}
                            PaperProps={{
                                style: {
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none'
                                }
                            }}
                            sx={{backgroundColor: 'transparent'}}>
                        <DialogContent>
                            <Card id={'trainer-table-card'}>
                                <h1 className={"trainer-table-card-header"}>Change Reservation Status</h1>
                                <Box sx={{margin: 4}}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Reservation Status</InputLabel>
                                        <Select
                                            labelId="reservation-status"
                                            id="reservation-status-select"
                                            label="Reservation Status"
                                            value={selectedReservationStatus}
                                            onChange={handleReservationStatusChange}
                                        >
                                            {
                                                reservationStatuses.map((status, index) => (
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
                                            handleCloseChangeReservationStatusDialog()
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
                </Card>));
}

export default AdminReservationStatusEditForm;
import React, {useEffect} from 'react';
import {
    Box,
    Card,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle, Grid
} from "@mui/material";
import Button from "@mui/material/Button";
import '../../../assets/styles/UserEdit.css';
import Typography from "@mui/material/Typography";

const ReservationServiceDialog = ({isOpenReserveService, setIsOpenReserveService, service}) => {

    useEffect(() => {
        // DepositService.getDepositById(props.depositId)
        //     .then(response => setDeposit(response.data))
        //     .catch(e => console.log(e));
    });

    const MessageInfo = () => {
        return !service
            ? <CircularProgress/>
            : <Typography>
                Do you really want to reserve a {service.name} class?
            </Typography>
    }

    return (
        <Box>
            <Dialog open={isOpenReserveService}
                    PaperProps={{
                        style: {backgroundColor: 'transparent', boxShadow: 'none'}
                    }}
                    sx={{backgroundColor: 'transparent'}}
            >
                <DialogTitle>Close Deposit</DialogTitle>
                <DialogContent>
                    <Card id={'reservation-service-card'}>
                        <h1 className={"reservation-service-header"}>Service Reservation</h1>
                        <MessageInfo/>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button id={'reservation-service-back-button'} onClick={() => {
                                    setIsOpenReserveService(false);
                                }}>Back</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button id={'reservation-service-reserve-button'}
                                        onClick={() => setIsOpenReserveService(false)}>Reserve</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ReservationServiceDialog;
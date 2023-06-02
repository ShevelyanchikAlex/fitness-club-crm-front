import React, {useEffect, useState} from 'react';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import EmptyListCard from "../error/EmptyListCard";
import Forbidden from "../error/Forbidden";
import OrderService from "../../../service/OrderService";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AdminUserInfoDialog from "./form/user/AdminUserInfoDialog";
import AdminReservationStatusEditForm from "./form/reservation/AdminReservationStatusEditForm";
import dayjs from "dayjs";
import DateTimeUtilService from "../../../service/DateTimeUtilService";

const AdminReservationsTable = () => {

    const ADMIN_ROLE = 'ADMIN';
    const role = localStorage.getItem("user-role")
    const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
    const [isOpenChangeReservationStatusDialog, setIsOpenChangeReservationStatusDialog] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfReservations, setCountOfReservations] = useState(10);
    const rowsPerPage = [5, 10, 20];

    useEffect(() => {
        setIsLoading(true);
        OrderService.getAllOrders(page, size)
            .then(response => {
                setReservations(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);


    useEffect(() => {
        OrderService.getOrdersCount()
            .then(response => {
                setCountOfReservations(response.data);
            })
            .catch((error) => console.log(error));
    }, []);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }


    const handleOpenUserInfoDialog = (reservation) => {
        setSelectedReservation(reservation);
        setIsOpenUserInfo(true);
    }

    const handleOpenChangeReservationStatusDialog = (reservation) => {
        setSelectedReservation(reservation);
        setIsOpenChangeReservationStatusDialog(true);
    }


    return (isLoading
        ? <CircularProgress/>
        : ((role && role === ADMIN_ROLE)
            ? ((reservations.length === 0) ? <EmptyListCard/> :
                    <Box>
                        <TableContainer sx={{marginY: 10}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="center">Service</TableCell>
                                        <TableCell align="center">Reserving date</TableCell>
                                        <TableCell align="center">Training date</TableCell>
                                        <TableCell align="center">Trainer id</TableCell>
                                        <TableCell align="center">Service status</TableCell>
                                        <TableCell align="center">User info</TableCell>
                                        <TableCell align="center">Change status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservations.map(reservation => (
                                        <TableRow key={reservation.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell component="th" scope="row">
                                                {reservation.id}
                                            </TableCell>
                                            <TableCell align="center">{reservation.serviceDto.name}</TableCell>
                                            <TableCell align="center">
                                                {DateTimeUtilService.formatDateTime(reservation.createdDateTime)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {DateTimeUtilService.formatDateTime(reservation.trainingStartDateTime)}
                                            </TableCell>
                                            <TableCell
                                                align="center">{reservation.trainerId}</TableCell>
                                            <TableCell align="center">{reservation.orderStatus}</TableCell>
                                            <TableCell align="center"><Button
                                                variant='contained'
                                                sx={{
                                                    background: '#2196f3',
                                                    color: 'white',
                                                    textTransform: 'none'
                                                }}
                                                onClick={() => handleOpenUserInfoDialog(reservation)}>User Info</Button></TableCell>
                                            <TableCell align="center">
                                                {dayjs(reservation.trainingStartDateTime) > dayjs(new Date()) &&
                                                    <Button
                                                        variant='contained'
                                                        sx={{
                                                            background: '#f39629',
                                                            color: 'white',
                                                            textTransform: 'none'
                                                        }}
                                                        onClick={() => handleOpenChangeReservationStatusDialog(reservation)}>Change
                                                        Status</Button>
                                                }</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            sx={{display: "flex", justifyContent: "center", marginBottom: 10}}
                            rowsPerPageOptions={rowsPerPage}
                            component="div"
                            count={countOfReservations}
                            rowsPerPage={size}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeSize}
                        />

                        {selectedReservation &&
                            <Box>
                                <AdminUserInfoDialog
                                    isOpenUserInfo={isOpenUserInfo}
                                    setIsOpenUserInfo={setIsOpenUserInfo}
                                    setSelectedReservation={setSelectedReservation}
                                    reservation={selectedReservation}
                                />
                                <AdminReservationStatusEditForm
                                    isOpenChangeReservationStatusDialog={isOpenChangeReservationStatusDialog}
                                    setIsOpenChangeReservationStatusDialog={setIsOpenChangeReservationStatusDialog}
                                    setSelectedReservation={setSelectedReservation}
                                    reservation={selectedReservation}
                                />
                            </Box>
                        }
                    </Box>
            )
            : <Forbidden/>));
}

export default AdminReservationsTable;
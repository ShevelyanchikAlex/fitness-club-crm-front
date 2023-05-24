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
import TrainerService from "../../../service/TrainerService";
import Forbidden from "../error/Forbidden";
import OrderService from "../../../service/OrderService";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UserInfoDialog from "./form/UserInfoDialog";
import TrainerReservationStatusEditForm from "./form/TrainerReservationStatusEditForm";

const TrainerReservationsTable = () => {

    const TRAINER_ROLE = 'TRAINER';
    const [role, setRole] = useState();
    const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
    const [isOpenChangeReservationStatusDialog, setIsOpenChangeReservationStatusDialog] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [trainerId, setTrainerId] = useState();
    const [selectedReservation, setSelectedReservation] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfReservations, setCountOfReservations] = useState(10);
    const rowsPerPage = [5, 10, 20];

    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem("user-role"));
        const email = localStorage.getItem("user-email");
        TrainerService.getTrainerByEmail(email)
            .then(response => {
                setTrainerId(response.data.id)
                OrderService.getAllOrdersByTrainerId(page, size, response.data.id)
                    .then(response => {
                        setReservations(response.data);
                        setIsLoading(false);
                    })
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);


    useEffect(() => {
        if (trainerId) {
            OrderService.getOrdersCountByTrainerId(trainerId)
                .then(response => {
                    setCountOfReservations(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [size]);

    function formatDateTime(dateTime) {
        const datetime = new Date(dateTime);

        const formattedDate = datetime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const formattedTime = datetime.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
        });
        return `${formattedDate}-${formattedTime}`;
    }


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
        : ((role && role === TRAINER_ROLE)
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
                                        <TableCell align="center">Service status</TableCell>
                                        <TableCell align="center">User Info</TableCell>
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
                                            <TableCell
                                                align="center">{formatDateTime(reservation.createdDateTime)}</TableCell>
                                            <TableCell
                                                align="center">{formatDateTime(reservation.trainingStartDateTime)}</TableCell>
                                            <TableCell align="center">{reservation.orderStatus}</TableCell>
                                            <TableCell align="center"><Button
                                                onClick={() => handleOpenUserInfoDialog(reservation)}>User Info</Button></TableCell>
                                            <TableCell align="center"><Button
                                                onClick={() => handleOpenChangeReservationStatusDialog(reservation)}>Change
                                                Status</Button></TableCell>
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
                                <UserInfoDialog
                                    isOpenUserInfo={isOpenUserInfo}
                                    setIsOpenUserInfo={setIsOpenUserInfo}
                                    setSelectedReservation={setSelectedReservation}
                                    reservation={selectedReservation}
                                />
                                <TrainerReservationStatusEditForm
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

export default TrainerReservationsTable;
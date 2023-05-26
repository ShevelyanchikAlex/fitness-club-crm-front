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
import ScheduleService from "../../../service/ScheduleService";

const TrainerScheduleTable = () => {

    const TRAINER_ROLE = 'TRAINER';
    const [role, setRole] = useState();
    const [schedules, setSchedules] = useState([]);
    const [trainerId, setTrainerId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfSchedules, setCountOfSchedules] = useState(10);
    const rowsPerPage = [5, 10, 20];

    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem("user-role"));
        const email = localStorage.getItem("user-email");
        TrainerService.getTrainerByEmail(email)
            .then(response => {
                setTrainerId(response.data.id);
                let trainerId =  response.data.id;
                ScheduleService.getAllSchedulesByTrainerId(page, size, trainerId)
                    .then(response => {
                        setSchedules(response.data);
                        setIsLoading(false);
                    })
                    .catch(() => setIsLoading(false));
            })
            .catch(() => setIsLoading(false));

    }, [page, size]);


    useEffect(() => {
        if(trainerId) {
            ScheduleService.getSchedulesCountByTrainerId(trainerId)
                .then(response => {
                    setCountOfSchedules(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [size]);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    function formatDateTime(dateTime) {
        const datetime = new Date(dateTime);

        const formattedDate = datetime.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const formattedTime = datetime.toLocaleTimeString("de-DE", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
        });
        return `${formattedDate}  ${formattedTime}`;
    }

    return (isLoading
        ? <CircularProgress/>
        : ((role && role === TRAINER_ROLE)
            ? ((schedules.length === 0) ? <EmptyListCard/> :
                    <div>
                        <TableContainer sx={{marginY: 10}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="center">Service Name</TableCell>
                                        <TableCell align="center">Training Date</TableCell>
                                        <TableCell align="center">Service Type</TableCell>
                                        <TableCell align="center">Available Spots</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {schedules.map(schedule => (
                                        <TableRow key={schedule.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell component="th" scope="row">
                                                {schedule.id}
                                            </TableCell>
                                            <TableCell align="center">{schedule.serviceDto.name}</TableCell>
                                            <TableCell align="center">{formatDateTime(schedule.trainingStartDateTime)}</TableCell>
                                            <TableCell align="center">{schedule.serviceType}</TableCell>
                                            <TableCell align="center">{schedule.availableSpots}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            sx={{display: "flex", justifyContent: "center", marginBottom: 10}}
                            rowsPerPageOptions={rowsPerPage}
                            component="div"
                            count={countOfSchedules}
                            rowsPerPage={size}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeSize}
                        />
                    </div>
            )
            : <Forbidden/>));
}

export default TrainerScheduleTable;
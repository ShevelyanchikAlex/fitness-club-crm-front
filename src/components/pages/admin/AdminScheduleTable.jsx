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
import ScheduleService from "../../../service/ScheduleService";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const AdminScheduleTable = () => {
    const navigate = useNavigate();

    const ADMIN_ROLE = 'ADMIN';
    const [role, setRole] = useState();
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfSchedules, setCountOfSchedules] = useState(10);
    const rowsPerPage = [5, 10, 20];

    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem("user-role"));

        ScheduleService.getAllSchedules(page, size)
            .then(response => {
                setSchedules(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));

    }, [page, size]);


    useEffect(() => {
        ScheduleService.getSchedulesCount()
            .then(response => {
                setCountOfSchedules(response.data);
            })
            .catch((error) => console.log(error));
    }, []);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

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

    return (isLoading
        ? <CircularProgress/>
        : ((role && role === ADMIN_ROLE)
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
                                        <TableCell align="center">Trainer id</TableCell>
                                        <TableCell align="center">Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {schedules.map(schedule => (
                                        <TableRow key={schedule.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell component="th" scope="row">
                                                {schedule.id}
                                            </TableCell>
                                            <TableCell align="center">{schedule.serviceDto.name}</TableCell>
                                            <TableCell
                                                align="center">{formatDateTime(schedule.trainingStartDateTime)}</TableCell>
                                            <TableCell align="center">{schedule.serviceType}</TableCell>
                                            <TableCell align="center">{schedule.availableSpots}</TableCell>
                                            <TableCell align="center">{schedule.trainerId}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        navigate('/admin/schedule/update', {
                                                            state: {
                                                                id: schedule.id,
                                                                trainingStartDateTime: schedule.trainingStartDateTime,
                                                                trainerId: schedule.trainerId,
                                                                availableSpots: schedule.availableSpots,
                                                                serviceType: schedule.serviceType,
                                                                serviceDto: schedule.serviceDto,
                                                            },
                                                        });
                                                    }}
                                                    variant='contained'
                                                    sx={{
                                                        background: '#2196f3',
                                                        color: 'white',
                                                        textTransform: 'none'
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
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

export default AdminScheduleTable;
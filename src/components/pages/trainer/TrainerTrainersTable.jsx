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

const TrainerTrainersTable = () => {

    const TRAINER_ROLE = 'TRAINER';
    const [role, setRole] = useState();
    const [trainers, setTrainers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfTrainers, setCountOfTrainers] = useState(10);
    const rowsPerPage = [5, 10, 20];

    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem("user-role"));
        TrainerService.getAllTrainers(page, size)
            .then(response => {
                setTrainers(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);


    useEffect(() => {
        TrainerService.getTrainersCount()
            .then(response => {
                setCountOfTrainers(response.data);
            })
            .catch((error) => console.log(error));
    }, [size]);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    return (isLoading
        ? <CircularProgress/>
        : ((role && role === TRAINER_ROLE)
            ? ((trainers.length === 0) ? <EmptyListCard/> :
                    <div>
                        <TableContainer sx={{marginY: 10}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Surname</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Phone Number</TableCell>
                                        <TableCell align="center">Category</TableCell>
                                        <TableCell align="center">Kind of sport</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {trainers.map(trainer => (
                                        <TableRow key={trainer.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell component="th" scope="row">
                                                {trainer.id}
                                            </TableCell>
                                            <TableCell align="center">{trainer.userDto.name}</TableCell>
                                            <TableCell align="center">{trainer.userDto.surname}</TableCell>
                                            <TableCell align="center">{trainer.userDto.email}</TableCell>
                                            <TableCell align="center">{trainer.userDto.phoneNumber}</TableCell>
                                            <TableCell align="center">{trainer.category}</TableCell>
                                            <TableCell align="center">{trainer.kindOfSport}</TableCell>
                                            <TableCell align="center">{trainer.userDto.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            sx={{display: "flex", justifyContent: "center", marginBottom: 10}}
                            rowsPerPageOptions={rowsPerPage}
                            component="div"
                            count={countOfTrainers}
                            rowsPerPage={size}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeSize}
                        />
                    </div>
            )
            : <Forbidden/>));
}

export default TrainerTrainersTable;
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
import {useNavigate} from "react-router-dom";
import EmptyListCard from "../error/EmptyListCard";
import Button from "@mui/material/Button";
import TrainerService from "../../../service/TrainerService";

const TrainersTable = () => {
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainerId, setSelectedTrainerId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfTrainers, setCountOfTrainers] = useState(10);
    const rowsPerPage = [5, 10, 20];
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        TrainerService.getAllTrainers(page, size)
            .then(response => {
                setTrainers(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
        TrainerService.getTrainersCount()
            .then(response => {
                setCountOfTrainers(response.data)
            })
            .catch((error) => console.log(error));
    }, [page, size]);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    return (isLoading ? <CircularProgress/> :
        ((trainers.length === 0) ? <EmptyListCard/> :
                <div>
                    <TableContainer sx={{marginY: 10}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Surname</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Category</TableCell>
                                    <TableCell align="right">Kind of sport</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trainers.map(trainer => (
                                    <TableRow key={trainer.id} hover role="checkbox" tabIndex={-1}>
                                        <TableCell component="th" scope="row">
                                            {trainer.id}
                                        </TableCell>
                                        <TableCell align="right">{trainer.userDto.name}</TableCell>
                                        <TableCell align="right">{trainer.userDto.surname}</TableCell>
                                        <TableCell align="right">{trainer.userDto.email}</TableCell>
                                        <TableCell align="right">{trainer.category}</TableCell>
                                        <TableCell align="right">{trainer.kindOfSport}</TableCell>
                                        <TableCell align="right">{trainer.userDto.status}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                onClick={() => {
                                                }}
                                                variant='contained'
                                                sx={{background: '#2196f3', color: 'white', textTransform: 'none'}}
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
                        count={countOfTrainers}
                        rowsPerPage={size}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeSize}
                    />
                </div>
        ));
}

export default TrainersTable;
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
import Forbidden from "../error/Forbidden";
import Box from "@mui/material/Box";

const AdminTrainersTable = () => {

    const ADMIN_ROLE = 'ADMIN';
    const [role, setRole] = useState();
    const [trainers, setTrainers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfTrainers, setCountOfTrainers] = useState(10);
    const rowsPerPage = [5, 10, 20];
    const navigate = useNavigate();

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
    }, []);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    return (isLoading
        ? <CircularProgress/>
        : ((role && role === ADMIN_ROLE)
            ? ((trainers.length === 0) ? <EmptyListCard/> :
                    <Box>
                        <TableContainer sx={{marginY: 10}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Surname</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Category</TableCell>
                                        <TableCell align="center">Kind of sport</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Edit</TableCell>
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
                                            <TableCell align="center">{trainer.category}</TableCell>
                                            <TableCell align="center">{trainer.kindOfSport}</TableCell>
                                            <TableCell align="center">{trainer.userDto.status}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        navigate('/admin/trainers/update', {
                                                            state: {
                                                                id: trainer.id,
                                                                category: trainer.category,
                                                                kindOfSport: trainer.kindOfSport,
                                                                userDto: trainer.userDto,
                                                            },
                                                        });
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
                    </Box>
            )
            : <Forbidden/>));
}

export default AdminTrainersTable;